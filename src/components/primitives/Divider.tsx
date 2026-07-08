import { cn } from '@/lib/utils';

type Props = { tone?: 'default' | 'light'; className?: string };

export const Divider = ({ tone = 'default', className }: Props) => (
  <hr
    className={cn(
      'border-0 border-t',
      tone === 'light' ? 'border-white/15' : 'border-rp-hairline',
      className,
    )}
  />
);
