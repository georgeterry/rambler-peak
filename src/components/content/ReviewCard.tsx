import { Rating } from '@/components/primitives/Rating';
import type { Review } from '@/data/reviews';
import { cn } from '@/lib/utils';

type Props = {
  review: Review;
  tone?: 'light' | 'dark';
  className?: string;
};

export const ReviewCard = ({ review, tone = 'dark', className }: Props) => (
  <article
    className={cn(
      'rounded-lg p-6 md:p-8 border h-full flex flex-col',
      tone === 'light'
        ? 'bg-white/5 border-white/10 text-rp-white'
        : 'bg-rp-white border-rp-hairline text-rp-charcoal',
      className,
    )}
  >
    <Rating value={review.rating} showCount={false} tone={tone} />
    <h3 className="mt-4 text-subhead">{review.title}</h3>
    <p
      className={cn(
        'mt-3 text-body flex-1',
        tone === 'light' ? 'text-rp-white/85' : 'text-rp-slate',
      )}
    >
      “{review.body}”
    </p>
    <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1">
      <span
        className={cn(
          'text-eyebrow uppercase',
          tone === 'light' ? 'text-rp-white/85' : 'text-rp-charcoal',
        )}
      >
        {review.authorName}
      </span>
      <span
        className={cn(
          'text-caption',
          tone === 'light' ? 'text-rp-white/50' : 'text-rp-slate',
        )}
      >
        · {review.authorLocation}
      </span>
      {review.verified && (
        <span
          className={cn(
            'text-[10px] uppercase tracking-eyebrow',
            tone === 'light' ? 'text-rp-white/70' : 'text-rp-blue',
          )}
        >
          · Verified buyer
        </span>
      )}
    </div>
  </article>
);
