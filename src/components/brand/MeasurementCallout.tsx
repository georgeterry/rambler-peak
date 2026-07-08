import { cn } from '@/lib/utils';

// A thin dimension line + label, mimicking the "190 cm / 58 cm / 21 cm / 11 cm"
// annotations on the source imagery. Use inline over lifestyle photography.
type Props = {
  value: string;
  label?: string;
  orientation?: 'horizontal' | 'vertical';
  tone?: 'light' | 'dark';
  className?: string;
};

export const MeasurementCallout = ({
  value,
  label,
  orientation = 'horizontal',
  tone = 'light',
  className,
}: Props) => {
  const text = tone === 'light' ? 'text-rp-white' : 'text-rp-charcoal';
  const muted = tone === 'light' ? 'text-rp-white/70' : 'text-rp-slate';
  const line = tone === 'light' ? 'bg-white/70' : 'bg-rp-hairline';

  if (orientation === 'vertical') {
    return (
      <div className={cn('inline-flex flex-col items-center gap-2', text, className)}>
        <div className={cn('h-14 w-px', line)} />
        <div className="flex flex-col items-center">
          <span className="text-eyebrow uppercase">{value}</span>
          {label && (
            <span className={cn('mt-1 text-[10px] uppercase tracking-eyebrow', muted)}>{label}</span>
          )}
        </div>
        <div className={cn('h-14 w-px', line)} />
      </div>
    );
  }

  return (
    <div className={cn('inline-flex flex-col items-center gap-2', text, className)}>
      <div className="flex items-center gap-2">
        <div className={cn('h-px w-10 md:w-16', line)} />
        <span className="text-eyebrow uppercase whitespace-nowrap">{value}</span>
        <div className={cn('h-px w-10 md:w-16', line)} />
      </div>
      {label && (
        <span className={cn('text-[10px] uppercase tracking-eyebrow', muted)}>{label}</span>
      )}
    </div>
  );
};
