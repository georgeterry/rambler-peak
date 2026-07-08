import Link from 'next/link';
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'ghost-light';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 font-medium tracking-headline uppercase whitespace-nowrap rounded transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

const variants: Record<Variant, string> = {
  primary: 'bg-rp-blue text-rp-white hover:bg-rp-blue-dark',
  secondary: 'bg-rp-charcoal text-rp-white hover:bg-black',
  ghost:
    'bg-transparent text-rp-charcoal border border-rp-charcoal hover:bg-rp-charcoal hover:text-rp-white',
  'ghost-light':
    'bg-transparent text-rp-white border border-rp-white/70 hover:bg-rp-white hover:text-rp-charcoal',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-[11px]',
  md: 'px-6 py-3 text-xs',
  lg: 'px-8 py-4 text-xs',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;
type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export const Button = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonProps) => (
  <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
    {children}
  </button>
);

export const ButtonLink = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  href,
  ...rest
}: LinkProps) => (
  <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
    {children}
  </Link>
);
