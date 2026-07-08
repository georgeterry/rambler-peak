'use client';

import { useState } from 'react';
import { Button } from '@/components/primitives/Button';
import { Rating } from '@/components/primitives/Rating';
import { Icon } from '@/components/primitives/Icon';
import { useCart } from '@/lib/cart';
import { formatPrice, type Product } from '@/data/products';
import { cn } from '@/lib/utils';

type Props = { product: Product; className?: string };

export const BuyBox = ({ product, className }: Props) => {
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <div className={className} data-buybox-anchor>
      <p className="eyebrow">{product.shortName}</p>
      <h1 className="mt-2 text-display-2 display-brand">{product.name}</h1>
      {product.ratingSummary && (
        <div className="mt-4">
          <a href="#reviews" className="inline-block">
            <Rating
              value={product.ratingSummary.average}
              count={product.ratingSummary.count}
            />
          </a>
        </div>
      )}
      <p className="mt-6 text-body-lg text-rp-slate">{product.tagline}</p>

      <div className="mt-6 flex items-baseline gap-3">
        <span className="text-h1-brand font-semibold">{formatPrice(product.price)}</span>
        {product.compareAtPrice && (
          <span className="text-body text-rp-slate line-through">
            {formatPrice(product.compareAtPrice)}
          </span>
        )}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center border border-rp-hairline rounded">
          <button
            type="button"
            onClick={() => setQty(Math.max(1, qty - 1))}
            aria-label="Decrease quantity"
            className="px-3 py-3 hover:bg-rp-mist transition-colors"
          >
            <Icon name="minus" className="h-4 w-4" strokeWidth={1.6} />
          </button>
          <span
            className="px-4 text-body tabular-nums min-w-[2rem] text-center"
            aria-live="polite"
          >
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty(qty + 1)}
            aria-label="Increase quantity"
            className="px-3 py-3 hover:bg-rp-mist transition-colors"
          >
            <Icon name="plus" className="h-4 w-4" strokeWidth={1.6} />
          </button>
        </div>
        <Button size="lg" className="flex-1 min-w-[220px]" onClick={() => add(product.slug, qty)}>
          Add to Basket
        </Button>
      </div>

      <ul className="mt-6 space-y-2 text-caption text-rp-slate">
        <li className="flex items-center gap-2">
          <Icon name="check" className="h-4 w-4 text-rp-blue" strokeWidth={2} aria-hidden />
          Free UK delivery on orders over £30
        </li>
        <li className="flex items-center gap-2">
          <Icon name="check" className="h-4 w-4 text-rp-blue" strokeWidth={2} aria-hidden />
          30-day returns
        </li>
        <li className="flex items-center gap-2">
          <Icon name="check" className="h-4 w-4 text-rp-blue" strokeWidth={2} aria-hidden />
          1-year manufacturing warranty
        </li>
      </ul>
    </div>
  );
};
