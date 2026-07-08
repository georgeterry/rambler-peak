import { NextResponse } from 'next/server';
import { stripe, isStripeConfigured } from '@/lib/stripe';
import { getProduct } from '@/data/products';
import { site } from '@/lib/seo';

type CheckoutLine = { slug: string; quantity: number };

export async function POST(request: Request) {
  let lines: CheckoutLine[];
  try {
    const body = await request.json();
    lines = Array.isArray(body?.lines) ? body.lines : [];
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const validated = lines
    .map((l) => ({ product: getProduct(l.slug), quantity: Math.min(Math.max(1, l.quantity | 0), 20) }))
    .filter((l): l is { product: NonNullable<ReturnType<typeof getProduct>>; quantity: number } =>
      Boolean(l.product),
    );

  if (validated.length === 0) {
    return NextResponse.json({ error: 'Basket is empty' }, { status: 400 });
  }

  // Local/dev fallback: without a Stripe key we simulate the redirect so the
  // full flow can be exercised end to end.
  if (!isStripeConfigured() || !stripe) {
    return NextResponse.json({
      url: '/checkout/success?session_id=dev_simulated',
      simulated: true,
    });
  }

  const origin = request.headers.get('origin') ?? site.url;

  // Free UK delivery over the threshold (£30), otherwise a flat tracked rate —
  // matches the promise made across the site.
  const subtotalPence = validated.reduce(
    (sum, { product, quantity }) => sum + product.price.amount * quantity,
    0,
  );
  const freeShipping = subtotalPence >= site.freeShippingThresholdPence;

  const deliveryEstimate = {
    minimum: { unit: 'business_day' as const, value: 2 },
    maximum: { unit: 'business_day' as const, value: 3 },
  };

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    currency: 'gbp',
    line_items: validated.map(({ product, quantity }) => ({
      quantity,
      ...(product.stripePriceId
        ? { price: product.stripePriceId }
        : {
            price_data: {
              currency: 'gbp',
              unit_amount: product.price.amount,
              product_data: {
                name: product.name,
                description: product.tagline,
                images: [`${site.url}${product.images[0].src}`],
                metadata: { slug: product.slug },
              },
            },
          }),
    })),
    shipping_address_collection: { allowed_countries: ['GB'] },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: freeShipping ? 'Free UK delivery' : 'Tracked UK delivery',
          type: 'fixed_amount',
          fixed_amount: { amount: freeShipping ? 0 : 395, currency: 'gbp' },
          delivery_estimate: deliveryEstimate,
        },
      },
    ],
    allow_promotion_codes: true,
    // Order summary for the webhook / dashboard, without relying on line items.
    metadata: {
      basket: validated.map(({ product, quantity }) => `${quantity}x ${product.slug}`).join(', '),
    },
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout/cancelled`,
  });

  return NextResponse.json({ url: session.url });
}
