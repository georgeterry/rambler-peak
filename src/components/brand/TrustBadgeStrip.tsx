import { Icon, type IconName } from '@/components/primitives/Icon';
import { cn } from '@/lib/utils';

type Item = { icon: IconName; label: string };

const defaults: Item[] = [
  { icon: 'feather', label: 'Ultralight & compact' },
  { icon: 'uk-flag', label: 'UK company' },
  { icon: 'season-cycle', label: '3 season comfort' },
];

type Props = {
  items?: Item[];
  tone?: 'light' | 'dark';
  className?: string;
};

export const TrustBadgeStrip = ({ items = defaults, tone = 'dark', className }: Props) => (
  <div
    className={cn(
      'grid grid-cols-3',
      tone === 'light' ? 'text-rp-white' : 'text-rp-charcoal',
      className,
    )}
    role="list"
  >
    {items.map((item, i) => (
      <div
        key={item.label}
        role="listitem"
        className={cn(
          'flex flex-col items-center text-center gap-3 px-3 sm:px-6 py-6',
          i > 0 && (tone === 'light' ? 'border-l border-white/20' : 'border-l border-rp-hairline'),
        )}
      >
        <Icon name={item.icon} className="h-8 w-8 sm:h-9 sm:w-9" strokeWidth={1.5} aria-hidden />
        <span className="text-eyebrow uppercase max-w-[160px]">{item.label}</span>
      </div>
    ))}
  </div>
);
