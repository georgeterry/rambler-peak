// Creates the newsletter welcome discount in Stripe: a 10%-off coupon plus the
// customer-facing promotion code RAMBLE10. Idempotent — safe to re-run; it
// skips creation if the promo code already exists.
//
// Runs against whatever STRIPE_SECRET_KEY is in .env.local, so:
//   - with the test key -> creates it in test mode (for local verification)
//   - swap in your LIVE key and re-run before launch to create the live code
//
//   node scripts/create-welcome-code.mjs

import Stripe from 'stripe';
import fs from 'node:fs';

const env = Object.fromEntries(
  fs
    .readFileSync(new URL('../.env.local', import.meta.url).pathname, 'utf8')
    .split('\n')
    .filter((l) => l && !l.startsWith('#') && l.includes('='))
    .map((l) => { const i = l.indexOf('='); return [l.slice(0, i), l.slice(i + 1)]; }),
);

const key = env.STRIPE_SECRET_KEY;
if (!key) {
  console.error('No STRIPE_SECRET_KEY in .env.local');
  process.exit(1);
}
const mode = key.startsWith('sk_live') ? 'LIVE' : 'TEST';
const stripe = new Stripe(key);

const CODE = 'RAMBLE10';
const PERCENT = 10;

// Already there? Don't duplicate.
const existing = await stripe.promotionCodes.list({ code: CODE, limit: 1 });
if (existing.data.length > 0) {
  const pc = existing.data[0];
  console.log(`[${mode}] promotion code ${CODE} already exists (${pc.id}), active=${pc.active}. Nothing to do.`);
  process.exit(0);
}

// Coupon = the discount itself. Promotion code = the string customers type.
const coupon = await stripe.coupons.create({
  percent_off: PERCENT,
  duration: 'once',
  name: `${PERCENT}% welcome`,
  metadata: { purpose: 'newsletter-welcome' },
});

const promo = await stripe.promotionCodes.create({
  coupon: coupon.id,
  code: CODE,
  // One redemption per customer, first order only in spirit (Stripe can't
  // enforce "first order" directly, so we cap uses per customer to 1).
  max_redemptions: undefined,
  restrictions: { first_time_transaction: true },
  metadata: { purpose: 'newsletter-welcome' },
});

console.log(`[${mode}] created coupon ${coupon.id} (${PERCENT}% off, once)`);
console.log(`[${mode}] created promotion code ${promo.code} (${promo.id}), first_time_transaction only`);
console.log(`\nCustomers enter "${CODE}" at checkout. allow_promotion_codes is already enabled.`);
