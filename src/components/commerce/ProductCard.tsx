'use client';

import Link from 'next/link';
import { PlaceholderImage } from '@/components/brand/PlaceholderImage';
import { Rating } from '@/components/primitives/Rating';
import { Button } from '@/components/primitives/Button';
import { useCart } from '@/lib/cart';
import { formatPrice, type Product } from '@/data/products';
import { cn } from '@/lib/utils';

type Props = { product: Product; className?: string };

export const ProductCard = ({ product, className }: Props) => {
  const { add } = useCart();
  const hero = product.images[0];

  return (
    <article className={cn('group flex flex-col', className)}>
      <Link href={`/products/${product.slug}`} className="block relative overflow-hidden rounded-lg">
        <PlaceholderImage
          src={hero.src}
          alt={hero.alt}
          ratio="1:1"
          label={hero.label}
          className="transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </Link>
      <div className="mt-6 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="eyebrow">{product.shortName}</p>
          <h3 className="mt-1 text-h2-brand display-brand">
            <Link href={`/products/${product.slug}`} className="hover:text-rp-blue transition-colors">
              {product.name}
            </Link>
          </h3>
          <p className="mt-2 text-body text-rp-slate max-w-md">{product.tagline}</p>
          {product.ratingSummary && (
            <div className="mt-3">
              <Rating
                value={product.ratingSummary.average}
                count={product.ratingSummary.count}
                size="sm"
              />
            </div>
          )}
        </div>
        <p className="text-subhead font-semibold shrink-0 text-right">
          {formatPrice(product.price)}
        </p>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button onClick={() => add(product.slug, 1)} size="md">
          Add to Basket
        </Button>
        <Link
          href={`/products/${product.slug}`}
          className="text-eyebrow uppercase tracking-headline underline underline-offset-4 self-center text-rp-charcoal hover:text-rp-blue"
        >
          View details
        </Link>
      </div>
    </article>
  );
};
