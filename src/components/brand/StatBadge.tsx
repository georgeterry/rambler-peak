import { cn } from '@/lib/utils';

// Round stat chip used to call out a headline number (e.g. R-Value 2.5).
// Two-tone: "light" for use over dark imagery, "dark" for light backgrounds.
type Props = {
  value: string | number;
  label: string;
  tone?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizes = {
  sm: 'h-20 w-20 text-2xl',
  md: 'h-28 w-28 text-3xl',
  lg: 'h-36 w-36 text-4xl',
};

export const StatBadge = ({ value, label, tone = 'light', size = 'md', className }: Props) => {
  const outer =
    tone === 'light'
      ? 'text-rp-white border-rp-white/85 bg-rp-charcoal/25 backdrop-blur-sm'
      : 'text-rp-charcoal border-rp-charcoal bg-rp-white';
  const rule = tone === 'light' ? 'border-rp-white/60' : 'border-rp-charcoal/40';
  return (
    <div
      className={cn(
        'rounded-full border-[1.5px] flex flex-col items-center justify-center px-3 py-1 shadow-[0_6px_20px_rgba(0,0,0,0.18)]',
        outer,
        sizes[size],
        className,
      )}
    >
      <span className="font-semibold leading-none tracking-headline">{value}</span>
      <span className={cn('mt-1 border-t pt-1 text-[10px] uppercase tracking-eyebrow', rule)}>
        {label}
      </span>
    </div>
  );
};
