import type { ReactNode, ElementType } from 'react';
import { cn } from '@/lib/utils';

type Tone = 'white' | 'mist' | 'charcoal';
type Padding = 'sm' | 'md' | 'lg' | 'none';

type Props = {
  children: ReactNode;
  as?: ElementType;
  tone?: Tone;
  padding?: Padding;
  className?: string;
  id?: string;
};

const tones: Record<Tone, string> = {
  white: 'bg-rp-white text-rp-charcoal',
  mist: 'bg-rp-mist text-rp-charcoal',
  charcoal: 'bg-rp-charcoal text-rp-white',
};

const paddings: Record<Padding, string> = {
  none: '',
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-24',
  lg: 'py-24 md:py-32',
};

export const Section = ({
  children,
  as: Tag = 'section',
  tone = 'white',
  padding = 'md',
  className,
  id,
}: Props) => (
  <Tag id={id} className={cn(tones[tone], paddings[padding], className)}>
    {children}
  </Tag>
);
