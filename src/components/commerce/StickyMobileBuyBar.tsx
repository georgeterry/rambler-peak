'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/primitives/Button';
import { useCart } from '@/lib/cart';
import { formatPrice, type Product } from '@/data/products';
import { cn } from '@/lib/utils';

type Props = {
  product: Product;
  anchorSelector?: string;
};

// Appears after the primary BuyBox scrolls out of view. Only shown on mobile
// (md:hidden) — desktop has the buy box in view for most of the page anyway.
export const StickyMobileBuyBar = ({
  product,
  anchorSelector = '[data-buybox-anchor]',
}: Props) => {
  const { add } = useCart();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const anchor = document.querySelector(anchorSelector);
    if (!anchor) return;
    const io = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { rootMargin: '-80px 0px 0px 0px' },
    );
    io.observe(anchor);
    return () => io.disconnect();
  }, [anchorSelector]);

  return (
    <div
      className={cn(
        'fixed bottom-0 inset-x-0 z-30 md:hidden bg-rp-white border-t border-rp-hairline shadow-[0_-8px_24px_rgba(0,0,0,0.06)] transition-transform duration-300',
        show ? 'translate-y-0' : 'translate-y-full',
      )}
      aria-hidden={!show}
    >
      <div className="container-x py-3 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-eyebrow uppercase text-rp-slate truncate">{product.shortName}</p>
          <p className="text-subhead">{formatPrice(product.price)}</p>
        </div>
        <Button onClick={() => add(product.slug, 1)} size="md">
          Add to Basket
        </Button>
      </div>
    </div>
  );
};
