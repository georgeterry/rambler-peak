import type { ReactNode, ElementType } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  size?: 'default' | 'narrow' | 'wide';
};

export const Container = ({
  children,
  as: Tag = 'div',
  className,
  size = 'default',
}: Props) => {
  const max =
    size === 'narrow' ? 'max-w-4xl' : size === 'wide' ? 'max-w-[90rem]' : 'max-w-container';
  return (
    <Tag className={cn('mx-auto w-full px-5 sm:px-8 lg:px-12', max, className)}>{children}</Tag>
  );
};
