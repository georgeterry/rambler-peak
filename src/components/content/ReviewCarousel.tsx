'use client';

import { useEffect, useRef, useState } from 'react';
import { ReviewCard } from './ReviewCard';
import { Icon } from '@/components/primitives/Icon';
import type { Review } from '@/data/reviews';
import { cn } from '@/lib/utils';

type Props = { reviews: Review[]; tone?: 'light' | 'dark'; className?: string };

const AUTOPLAY_MS = 5500;

export const ReviewCarousel = ({ reviews, tone = 'dark', className }: Props) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;
      const card = el.querySelector<HTMLElement>('[data-review-card]');
      if (!card) return;
      const step = card.offsetWidth + 24; // gap-6
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + step, behavior: 'smooth' });
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  const step = (dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-review-card]');
    if (!card) return;
    el.scrollBy({ left: dir * (card.offsetWidth + 24), behavior: 'smooth' });
  };

  return (
    <div
      className={className}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-5 px-5 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12"
        aria-live="polite"
      >
        {reviews.map((r) => (
          <div
            key={r.id}
            data-review-card
            className="basis-[86%] sm:basis-[60%] md:basis-1/3 shrink-0 snap-start"
          >
            <ReviewCard review={r} tone={tone} />
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous reviews"
          className={cn(
            'p-2 rounded-full transition-colors',
            tone === 'light'
              ? 'text-rp-white hover:bg-white/10'
              : 'text-rp-charcoal hover:bg-rp-mist',
          )}
        >
          <Icon name="chevron-left" className="h-5 w-5" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next reviews"
          className={cn(
            'p-2 rounded-full transition-colors',
            tone === 'light'
              ? 'text-rp-white hover:bg-white/10'
              : 'text-rp-charcoal hover:bg-rp-mist',
          )}
        >
          <Icon name="chevron-right" className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
};
