import type { ReactNode, ElementType } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  as?: ElementType;
  size?: 'md' | 'lg';
  className?: string;
};

export const SectionHeading = ({
  eyebrow,
  title,
  sub,
  align = 'left',
  tone = 'dark',
  as: Tag = 'h2',
  size = 'md',
  className,
}: Props) => {
  const tSize = size === 'lg' ? 'text-display-2' : 'text-h1-brand';
  return (
    <div
      className={cn(
        align === 'center' && 'text-center',
        tone === 'light' ? 'text-rp-white' : 'text-rp-charcoal',
        className,
      )}
    >
      {eyebrow && (
        <p className={cn('eyebrow', tone === 'light' && 'text-rp-white/70')}>{eyebrow}</p>
      )}
      <Tag className={cn(tSize, 'display-brand mt-3')}>{title}</Tag>
      {sub && (
        <p
          className={cn(
            'mt-4 max-w-prose text-body-lg',
            tone === 'light' ? 'text-rp-white/85' : 'text-rp-slate',
          )}
        >
          {sub}
        </p>
      )}
    </div>
  );
};
