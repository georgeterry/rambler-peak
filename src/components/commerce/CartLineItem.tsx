'use client';

import { PlaceholderImage } from '@/components/brand/PlaceholderImage';
import { Icon } from '@/components/primitives/Icon';
import { useCart } from '@/lib/cart';
import { formatPrice, type Product } from '@/data/products';

type Props = {
  line: { slug: string; quantity: number; product: Product };
};

export const CartLineItem = ({ line }: Props) => {
  const { setQty, remove } = useCart();
  const { product, quantity } = line;
  const hero = product.images[0];

  return (
    <div className="flex gap-4">
      <div className="w-20 h-20 shrink-0">
        <PlaceholderImage
          src={hero.src}
          alt={hero.alt}
          ratio="1:1"
          label=""
          tone="mist"
          className="rounded"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-eyebrow uppercase text-rp-slate">{product.shortName}</p>
        <p className="text-subhead">{product.name}</p>
        <div className="mt-3 flex items-center justify-between gap-3 flex-wrap">
          <div className="inline-flex items-center border border-rp-hairline rounded text-sm">
            <button
              type="button"
              onClick={() => setQty(line.slug, Math.max(1, quantity - 1))}
              aria-label={`Decrease quantity of ${product.shortName}`}
              className="px-2 py-1 hover:bg-rp-mist transition-colors"
            >
              <Icon name="minus" className="h-3.5 w-3.5" strokeWidth={1.6} />
            </button>
            <span
              className="px-3 tabular-nums min-w-[1.5rem] text-center"
              aria-live="polite"
            >
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQty(line.slug, quantity + 1)}
              aria-label={`Increase quantity of ${product.shortName}`}
              className="px-2 py-1 hover:bg-rp-mist transition-colors"
            >
              <Icon name="plus" className="h-3.5 w-3.5" strokeWidth={1.6} />
            </button>
          </div>
          <span className="text-body font-semibold">
            {formatPrice({ amount: product.price.amount * quantity, currency: 'GBP' })}
          </span>
        </div>
        <button
          type="button"
          onClick={() => remove(line.slug)}
          className="mt-2 text-caption text-rp-slate hover:text-rp-rust underline underline-offset-4"
        >
          Remove
        </button>
      </div>
    </div>
  );
};
