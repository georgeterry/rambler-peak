import { Icon } from '@/components/primitives/Icon';
import { cn } from '@/lib/utils';

type Bucket = { star: number; count: number; percent: number };

type Props = {
  average: number;
  count: number;
  distribution: Bucket[];
  className?: string;
};

export const RatingDistribution = ({ average, count, distribution, className }: Props) => (
  <div className={cn('grid gap-8 md:grid-cols-2 items-center', className)}>
    <div className="text-center md:text-left">
      <p className="text-display-1 display-brand leading-none">{average.toFixed(1)}</p>
      <div className="mt-3 flex justify-center md:justify-start text-rp-blue">
        {[1, 2, 3, 4, 5].map((s) => (
          <Icon
            key={s}
            name={s <= Math.round(average) ? 'star' : 'star-outline'}
            className="h-6 w-6"
            strokeWidth={1.5}
            aria-hidden
          />
        ))}
      </div>
      <p className="mt-3 text-caption text-rp-slate">Based on {count} verified reviews</p>
    </div>
    <ul className="space-y-2">
      {distribution.map((b) => (
        <li key={b.star} className="flex items-center gap-3">
          <span className="text-eyebrow uppercase text-rp-slate w-8">{b.star}★</span>
          <span
            className="flex-1 h-2 bg-rp-mist rounded-full overflow-hidden"
            aria-hidden
          >
            <span
              className="block h-full bg-rp-blue"
              style={{ width: `${b.percent}%` }}
            />
          </span>
          <span className="text-caption text-rp-slate w-12 text-right tabular-nums">
            {b.count}
          </span>
        </li>
      ))}
    </ul>
  </div>
);
