'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { PlaceholderImage } from '@/components/brand/PlaceholderImage';
import type { ProductImage } from '@/data/products';
import { cn } from '@/lib/utils';

type Props = { images: ProductImage[]; className?: string };

export const ProductGallery = ({ images, className }: Props) => {
  const [index, setIndex] = useState(0);
  const mainRef = useRef<HTMLDivElement | null>(null);
  const active = images[index] ?? images[0];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Only respond to arrow keys when a thumbnail button in this gallery
      // (or the main image container) has focus.
      const target = document.activeElement;
      if (!(target instanceof HTMLElement)) return;
      if (!mainRef.current?.contains(target) && !target.closest('[data-gallery-thumbs]')) return;
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % images.length);
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + images.length) % images.length);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [images.length]);

  return (
    <div className={cn('grid gap-4 md:grid-cols-[88px_1fr]', className)}>
      <div
        data-gallery-thumbs
        className="order-2 md:order-1 flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible scrollbar-hide"
      >
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`View image ${i + 1} of ${images.length}`}
            aria-current={i === index}
            className={cn(
              'relative shrink-0 h-16 w-16 md:h-20 md:w-full rounded overflow-hidden border-2 transition-colors bg-rp-mist',
              i === index ? 'border-rp-blue' : 'border-rp-hairline hover:border-rp-charcoal/40',
            )}
          >
            {img.src.startsWith('placeholder:') ? (
              <div className="w-full h-full flex items-center justify-center text-caption text-rp-slate/60">
                {i + 1}
              </div>
            ) : (
              <Image
                src={img.src}
                alt=""
                fill
                sizes="88px"
                className="object-cover"
              />
            )}
          </button>
        ))}
      </div>
      <div ref={mainRef} className="order-1 md:order-2 relative" tabIndex={-1} aria-live="polite">
        <PlaceholderImage
          src={active.src}
          alt={active.alt}
          ratio="1:1"
          label={active.label}
          rounded
          priority
          sizes="(min-width: 768px) 55vw, 100vw"
        />
      </div>
    </div>
  );
};
