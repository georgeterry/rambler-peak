'use client';

import { useEffect } from 'react';
import { Icon } from '@/components/primitives/Icon';
import { Button, ButtonLink } from '@/components/primitives/Button';
import { CartLineItem } from './CartLineItem';
import { useCart } from '@/lib/cart';
import { site } from '@/lib/seo';
import { formatPence, cn } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';

export const CartDrawer = () => {
  const { lines, isOpen, close, subtotalPence, subtotal, itemCount } = useCart();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    if (isOpen) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, close]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const remaining = site.freeShippingThresholdPence - subtotalPence;
  const eligibleForFree = remaining <= 0;

  const beginCheckout = async () => {
    trackEvent({
      name: 'begin_checkout',
      item_count: itemCount,
      value_gbp: subtotalPence / 100,
    });
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ lines: lines.map((l) => ({ slug: l.slug, quantity: l.quantity })) }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      // A toast surface will show here in a future pass; for now, silent fail.
    }
  };

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 bg-rp-charcoal/45 z-40 transition-opacity',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
        onClick={close}
        aria-hidden
      />
      <aside
        className={cn(
          'fixed top-0 right-0 h-full w-full sm:w-[440px] bg-rp-white z-50 flex flex-col shadow-2xl',
          'transition-transform duration-300 ease-standard',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        aria-hidden={!isOpen}
        aria-label="Basket"
      >
        <div className="flex items-center justify-between px-5 sm:px-8 py-5 border-b border-rp-hairline">
          <h2 className="text-h2-brand display-brand">Your basket</h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close basket"
            className="p-2 -m-2"
          >
            <Icon name="close" className="h-6 w-6" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
            <Icon name="bag" className="h-10 w-10 text-rp-slate" strokeWidth={1.2} />
            <p className="mt-6 text-subhead">Your basket is empty</p>
            <p className="mt-2 text-body text-rp-slate">
              A good night’s sleep starts one product away.
            </p>
            <ButtonLink href="/shop" className="mt-8" onClick={close}>
              Shop the range
            </ButtonLink>
          </div>
        ) : (
          <>
            <div
              className="flex-1 overflow-y-auto px-5 sm:px-8 py-6"
              role="region"
              aria-live="polite"
            >
              <ul className="divide-y divide-rp-hairline">
                {lines.map((line) => (
                  <li key={line.slug} className="py-6 first:pt-0 last:pb-0">
                    <CartLineItem line={line} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-5 sm:px-8 py-5 border-t border-rp-hairline space-y-4">
              {site.freeShippingThresholdPence === 0 ? (
                <p className="text-caption text-rp-blue">Free UK delivery on every order.</p>
              ) : !eligibleForFree ? (
                <p className="text-caption text-rp-slate">
                  Add{' '}
                  <span className="text-rp-charcoal font-medium">{formatPence(remaining)}</span>{' '}
                  more to unlock free UK delivery.
                </p>
              ) : (
                <p className="text-caption text-rp-blue">You’ve unlocked free UK delivery.</p>
              )}
              <div className="flex items-baseline justify-between">
                <span className="text-eyebrow uppercase text-rp-slate">Subtotal</span>
                <span className="text-h2-brand font-semibold">{subtotal}</span>
              </div>
              <Button onClick={beginCheckout} size="lg" className="w-full">
                Checkout
              </Button>
              <p className="text-caption text-rp-slate text-center">
                Taxes and shipping calculated at checkout.
              </p>
            </div>
          </>
        )}
      </aside>
    </>
  );
};
