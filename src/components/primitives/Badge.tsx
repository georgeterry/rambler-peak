import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Tone = 'default' | 'blue' | 'mist' | 'dark' | 'outline-light';

type Props = {
  children: ReactNode;
  tone?: Tone;
  className?: string;
};

const tones: Record<Tone, string> = {
  default: 'bg-rp-charcoal/[.06] text-rp-charcoal',
  blue: 'bg-rp-blue text-rp-white',
  mist: 'bg-rp-mist text-rp-charcoal',
  dark: 'bg-rp-charcoal text-rp-white',
  'outline-light': 'bg-transparent text-rp-white border border-rp-white/60',
};

export const Badge = ({ children, tone = 'default', className }: Props) => (
  <span
    className={cn(
      'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-eyebrow uppercase',
      tones[tone],
      className,
    )}
  >
    {children}
  </span>
);
