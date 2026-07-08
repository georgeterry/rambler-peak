import { cn } from '@/lib/utils';

type Item = { value: string; label?: string };

type Props = {
  items: Item[];
  tone?: 'light' | 'dark';
  className?: string;
};

// Horizontal stat row with vertical hairline separators — used across the
// homepage and PDP for at-a-glance product stats.
export const SpecStrip = ({ items, tone = 'dark', className }: Props) => (
  <div
    className={cn(
      'flex flex-wrap items-stretch justify-center',
      tone === 'light' ? 'text-rp-white' : 'text-rp-charcoal',
      className,
    )}
    role="list"
  >
    {items.map((item, i) => (
      <div
        key={`${item.label}-${i}`}
        role="listitem"
        className={cn(
          'flex flex-col items-center text-center px-5 md:px-8 py-4 min-w-[7rem]',
          i > 0 && (tone === 'light' ? 'border-l border-white/20' : 'border-l border-rp-hairline'),
        )}
      >
        <span className="text-h2-brand leading-none whitespace-nowrap">{item.value}</span>
        {item.label && (
          <span
            className={cn(
              'text-eyebrow uppercase mt-2',
              tone === 'light' ? 'text-rp-white/70' : 'text-rp-slate',
            )}
          >
            {item.label}
          </span>
        )}
      </div>
    ))}
  </div>
);
