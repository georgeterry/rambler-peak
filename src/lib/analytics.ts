// Thin analytics event helper. Currently logs to the console in dev; swap the
// body of `send` when wiring GA4 / Plausible / Segment. All events are typed
// so the rest of the app calls trackEvent with confidence.

export type AnalyticsEvent =
  | { name: 'view_item'; product_slug: string; price_gbp: number }
  | { name: 'add_to_cart'; product_slug: string; quantity: number; price_gbp: number }
  | { name: 'remove_from_cart'; product_slug: string; quantity: number }
  | { name: 'begin_checkout'; item_count: number; value_gbp: number }
  | { name: 'purchase_success'; order_id: string; value_gbp: number }
  | { name: 'newsletter_signup'; source: string }
  | { name: 'contact_submit'; has_order_number: boolean }
  | { name: 'video_play'; video: string; location: string };

declare global {
  // These are optional runtime globals; they may be undefined in dev.
  interface Window {
    gtag?: (...args: unknown[]) => void;
    plausible?: (event: string, opts?: { props?: Record<string, unknown> }) => void;
  }
}

const send = (event: AnalyticsEvent) => {
  if (typeof window === 'undefined') return;
  const { name, ...props } = event;

  window.gtag?.('event', name, props);
  window.plausible?.(name, { props });

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.info('[analytics]', name, props);
  }
};

export const trackEvent = (event: AnalyticsEvent) => send(event);
