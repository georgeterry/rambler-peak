import Stripe from 'stripe';

// Server-side only. This module MUST NOT be imported from client components.
export const stripe = (() => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key, { apiVersion: '2025-02-24.acacia', typescript: true });
})();

export const isStripeConfigured = () => Boolean(process.env.STRIPE_SECRET_KEY);
