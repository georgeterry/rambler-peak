import { Icon, type IconName } from '@/components/primitives/Icon';
import { cn } from '@/lib/utils';

type Props = {
  icon: IconName;
  title: string;
  body: string;
  tone?: 'light' | 'dark';
  variant?: 'horizontal' | 'stacked';
  className?: string;
};

export const BenefitRow = ({
  icon,
  title,
  body,
  tone = 'dark',
  variant = 'horizontal',
  className,
}: Props) => {
  if (variant === 'stacked') {
    return (
      <div
        className={cn(
          'text-center',
          tone === 'light' ? 'text-rp-white' : 'text-rp-charcoal',
          className,
        )}
      >
        <span
          className={cn(
            'inline-flex mx-auto h-14 w-14 rounded-full items-center justify-center',
            tone === 'light' ? 'bg-white/10' : 'bg-rp-mist',
          )}
        >
          <Icon name={icon} className="h-7 w-7" strokeWidth={1.5} aria-hidden />
        </span>
        <p className="mt-4 text-subhead">{title}</p>
        <p
          className={cn(
            'mt-2 text-body',
            tone === 'light' ? 'text-rp-white/80' : 'text-rp-slate',
          )}
        >
          {body}
        </p>
      </div>
    );
  }
  return (
    <div
      className={cn(
        'flex items-start gap-4',
        tone === 'light' ? 'text-rp-white' : 'text-rp-charcoal',
        className,
      )}
    >
      <span
        className={cn(
          'mt-0.5 shrink-0 h-10 w-10 rounded-full flex items-center justify-center',
          tone === 'light' ? 'bg-white/10' : 'bg-rp-mist',
        )}
      >
        <Icon name={icon} className="h-5 w-5" strokeWidth={1.6} aria-hidden />
      </span>
      <div>
        <p className="text-subhead">{title}</p>
        <p
          className={cn(
            'mt-1 text-body',
            tone === 'light' ? 'text-rp-white/80' : 'text-rp-slate',
          )}
        >
          {body}
        </p>
      </div>
    </div>
  );
};
