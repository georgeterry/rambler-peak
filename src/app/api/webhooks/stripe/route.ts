import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { orderFromSession, recordOrder, sendOrderConfirmationEmail } from '@/lib/orders';

// Stripe webhook receiver. Stripe POSTs events here after a payment completes.
// Signature verification needs the raw, unparsed body, so we read request.text()
// and never call request.json(). This route must stay on the Node.js runtime
// (Stripe's SDK crypto is not Edge-compatible).
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 });
  }

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get('stripe-signature');
  const rawBody = await request.text();

  let event: Stripe.Event;

  if (secret) {
    // Secret configured (production + any dev with it set): a signed request is
    // required, and we cryptographically verify it came from Stripe.
    if (!signature) {
      return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
    }
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, secret);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'unknown error';
      // eslint-disable-next-line no-console
      console.error('[webhook] signature verification failed:', message);
      return NextResponse.json({ error: `Webhook signature error: ${message}` }, { status: 400 });
    }
  } else if (process.env.NODE_ENV !== 'production') {
    // Dev convenience: without a signing secret we trust the payload so the
    // flow can be exercised locally. Never reached in production (see below).
    // eslint-disable-next-line no-console
    console.warn('[webhook] STRIPE_WEBHOOK_SECRET not set — skipping verification (dev only)');
    try {
      event = JSON.parse(rawBody) as Stripe.Event;
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }
  } else {
    // Production with no secret configured: refuse rather than trust blindly.
    // eslint-disable-next-line no-console
    console.error('[webhook] STRIPE_WEBHOOK_SECRET missing in production — rejecting');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        // Only act on paid sessions (a session can complete unpaid for some
        // async payment methods; those fire async_payment_succeeded instead).
        if (session.payment_status !== 'paid') break;

        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 50 });
        const order = orderFromSession(session, lineItems.data);

        // Both handlers are idempotent-safe; Stripe may deliver an event twice.
        await recordOrder(order);
        await sendOrderConfirmationEmail(order);
        break;
      }

      case 'checkout.session.async_payment_succeeded': {
        const session = event.data.object as Stripe.Checkout.Session;
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 50 });
        const order = orderFromSession(session, lineItems.data);
        await recordOrder(order);
        await sendOrderConfirmationEmail(order);
        break;
      }

      case 'checkout.session.async_payment_failed': {
        const session = event.data.object as Stripe.Checkout.Session;
        // eslint-disable-next-line no-console
        console.warn(`[webhook] async payment failed for session ${session.id}`);
        break;
      }

      default:
        // Unhandled event types are fine to acknowledge; Stripe sends many.
        break;
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown error';
    // eslint-disable-next-line no-console
    console.error(`[webhook] handler error for ${event.type}:`, message);
    // 500 tells Stripe to retry with backoff.
    return NextResponse.json({ error: 'Handler failed' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
