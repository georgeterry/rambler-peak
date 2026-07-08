import { Icon, type IconName } from './Icon';
import { cn } from '@/lib/utils';

type Props = {
  value: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  tone?: 'light' | 'dark';
  className?: string;
};

const sizes = { sm: 'h-3.5 w-3.5', md: 'h-4 w-4', lg: 'h-5 w-5' };

const iconFor = (star: number, rounded: number): IconName => {
  if (star <= rounded) return 'star';
  if (star - 0.5 === rounded) return 'star-half';
  return 'star-outline';
};

export const Rating = ({
  value,
  count,
  size = 'md',
  showCount = true,
  tone = 'dark',
  className,
}: Props) => {
  const rounded = Math.round(value * 2) / 2;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2',
        tone === 'light' ? 'text-rp-white' : 'text-rp-charcoal',
        className,
      )}
      aria-label={`${value.toFixed(1)} out of 5${count ? ` from ${count} reviews` : ''}`}
    >
      <span className="inline-flex items-center gap-0.5 text-rp-blue">
        {[1, 2, 3, 4, 5].map((s) => (
          <Icon
            key={s}
            name={iconFor(s, rounded)}
            className={sizes[size]}
            strokeWidth={1.5}
            aria-hidden
          />
        ))}
      </span>
      {showCount && (
        <span
          className={cn(
            'text-caption tabular-nums',
            tone === 'light' ? 'text-rp-white/80' : 'text-rp-slate',
          )}
        >
          {value.toFixed(1)}
          {count ? ` · ${count} reviews` : ''}
        </span>
      )}
    </span>
  );
};
