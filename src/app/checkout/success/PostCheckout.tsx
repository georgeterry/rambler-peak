'use client';

import { useEffect, useRef } from 'react';
import { useCart } from '@/lib/cart';
import { trackEvent } from '@/lib/analytics';

// Client-side follow-up to a successful checkout: clear the basket and emit
// the purchase event. Renders nothing.
// NB: must wait for cart hydration — this component's effect fires before the
// provider's hydration effect, and clearing pre-hydration gets overwritten.
export const PostCheckout = ({ sessionId }: { sessionId?: string }) => {
  const { clear, subtotalPence, hasHydrated } = useCart();
  const done = useRef(false);

  useEffect(() => {
    if (!sessionId || !hasHydrated || done.current) return;
    done.current = true;
    trackEvent({
      name: 'purchase_success',
      order_id: sessionId,
      value_gbp: subtotalPence / 100,
    });
    clear();
  }, [sessionId, hasHydrated, subtotalPence, clear]);

  return null;
};
