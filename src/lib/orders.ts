import type Stripe from 'stripe';
import { sendEmail } from '@/lib/email';
import { orderConfirmationEmail, orderOwnerNotificationEmail } from '@/lib/email-templates';
import { site } from '@/lib/seo';

// Order-handling layer. Everything a fulfilled Stripe checkout should trigger
// lives here behind two functions, so the webhook route stays thin and you can
// wire real infrastructure (database, email, warehouse) in one place later.

export type Order = {
  id: string;                    // Stripe checkout session id
  paymentIntentId: string | null;
  email: string | null;
  name: string | null;
  amountTotalPence: number;
  currency: string;
  lines: { description: string; quantity: number; amountPence: number }[];
  shipping: {
    name: string | null;
    line1: string | null;
    line2: string | null;
    city: string | null;
    postcode: string | null;
    country: string | null;
  } | null;
  createdAt: string;             // ISO
};

// Build a plain Order from an expanded Stripe checkout session.
export const orderFromSession = (
  session: Stripe.Checkout.Session,
  lineItems: Stripe.LineItem[],
): Order => {
  const address = session.customer_details?.address ?? null;
  return {
    id: session.id,
    paymentIntentId:
      typeof session.payment_intent === 'string'
        ? session.payment_intent
        : (session.payment_intent?.id ?? null),
    email: session.customer_details?.email ?? null,
    name: session.customer_details?.name ?? null,
    amountTotalPence: session.amount_total ?? 0,
    currency: (session.currency ?? 'gbp').toUpperCase(),
    lines: lineItems.map((li) => ({
      description: li.description ?? 'Item',
      quantity: li.quantity ?? 1,
      amountPence: li.amount_total ?? 0,
    })),
    shipping: address
      ? {
          name: session.customer_details?.name ?? null,
          line1: address.line1 ?? null,
          line2: address.line2 ?? null,
          city: address.city ?? null,
          postcode: address.postal_code ?? null,
          country: address.country ?? null,
        }
      : null,
    createdAt: new Date((session.created ?? Date.now() / 1000) * 1000).toISOString(),
  };
};

const formatMoney = (pence: number, currency: string) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency }).format(pence / 100);

// Record the order. Emails an order notification to the support inbox, which
// gives a durable order log immediately (works on serverless with no database).
// For a queryable store, add a DB/Sheet/Airtable upsert here keyed on order.id
// (idempotent — Stripe can deliver the same event more than once).
export async function recordOrder(order: Order): Promise<void> {
  // eslint-disable-next-line no-console
  console.info(
    `[order] ${order.id} — ${formatMoney(order.amountTotalPence, order.currency)} — ${
      order.email ?? 'no email'
    } — ${order.lines.map((l) => `${l.quantity}× ${l.description}`).join(', ')}`,
  );

  const to = process.env.CONTACT_TO_EMAIL ?? site.supportEmail;
  const { subject, html, text } = orderOwnerNotificationEmail(order);
  const result = await sendEmail({ to, subject, html, text });
  if (!result.ok) {
    // eslint-disable-next-line no-console
    console.error(`[order] owner notification failed for ${order.id}: ${result.error}`);
  }
}

// Send the customer their branded confirmation via Resend. Stripe also emails
// its own receipt when receipt emails are enabled in the dashboard; this is the
// on-brand one. No-ops gracefully (logs) when RESEND_API_KEY is unset.
export async function sendOrderConfirmationEmail(order: Order): Promise<void> {
  if (!order.email) return;
  const { subject, html, text } = orderConfirmationEmail(order);
  const result = await sendEmail({ to: order.email, subject, html, text });
  if (!result.ok) {
    // eslint-disable-next-line no-console
    console.error(`[order] confirmation email failed for ${order.id}: ${result.error}`);
  } else {
    // eslint-disable-next-line no-console
    console.info(`[order] confirmation email sent for ${order.id} to ${order.email}`);
  }
}
