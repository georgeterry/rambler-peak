import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

// Central icon library. Line icons at 24px, 1.75 stroke, rounded caps —
// matching the Amazon-listing icon set. Filled variants are noted per icon.
export type IconName =
  | 'feather'
  | 'uk-flag'
  | 'season-cycle'
  | 'pump'
  | 'disc-stack'
  | 'strap'
  | 'valve'
  | 'thermometer'
  | 'moon'
  | 'chevron-down'
  | 'chevron-right'
  | 'chevron-left'
  | 'close'
  | 'menu'
  | 'bag'
  | 'star'
  | 'star-half'
  | 'star-outline'
  | 'plus'
  | 'minus'
  | 'arrow-right'
  | 'arrow-up-right'
  | 'check'
  | 'search'
  | 'peak'
  | 'instagram'
  | 'tiktok';

const paths: Record<IconName, React.ReactNode> = {
  feather: (
    <>
      <path d="M20 4c-6 0-12 4-14 12v4h4c8-2 12-8 12-14 0-1 0-2-2-2z" />
      <path d="M6 20l6-6" />
      <path d="M8 18h6" />
    </>
  ),
  'uk-flag': (
    <>
      <rect x="3" y="6" width="18" height="12" rx="1" />
      <path d="M3 6l18 12M21 6L3 18" />
      <path d="M12 6v12M3 12h18" />
    </>
  ),
  'season-cycle': (
    <>
      <path d="M4 12a8 8 0 0114-5" />
      <path d="M20 12a8 8 0 01-14 5" />
      <path d="M18 3v4h-4M6 21v-4h4" />
    </>
  ),
  pump: (
    <>
      <rect x="5" y="10" width="6" height="10" rx="1" />
      <path d="M8 10V5" />
      <path d="M6 5h4" />
      <path d="M11 13h9" />
      <path d="M17 10v6" />
    </>
  ),
  'disc-stack': (
    <>
      <ellipse cx="12" cy="7" rx="8" ry="2.5" />
      <path d="M4 12c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5" />
      <path d="M4 17c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5" />
      <path d="M4 7v10M20 7v10" />
    </>
  ),
  strap: (
    <>
      <rect x="4" y="9" width="16" height="6" rx="3" />
      <path d="M9 9v6M15 9v6" />
      <circle cx="12" cy="12" r="1.2" />
    </>
  ),
  valve: (
    <>
      <circle cx="12" cy="12" r="5" />
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
    </>
  ),
  thermometer: (
    <>
      <path d="M14 4a2 2 0 00-4 0v10a4 4 0 104 0V4z" />
      <circle cx="12" cy="17" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),
  moon: <path d="M20 15A8 8 0 019 4a8 8 0 1011 11z" />,
  'chevron-down': <path d="M6 9l6 6 6-6" />,
  'chevron-right': <path d="M9 6l6 6-6 6" />,
  'chevron-left': <path d="M15 6l-6 6 6 6" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  bag: (
    <>
      <path d="M5 8h14l-1 12H6L5 8z" />
      <path d="M9 8V6a3 3 0 016 0v2" />
    </>
  ),
  star: (
    <path
      d="M12 3l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8l-5.8 3.1 1.1-6.5L2.6 9.8l6.5-.9L12 3z"
      fill="currentColor"
      stroke="none"
    />
  ),
  'star-outline': (
    <path d="M12 3l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8l-5.8 3.1 1.1-6.5L2.6 9.8l6.5-.9L12 3z" />
  ),
  'star-half': (
    <>
      <path d="M12 3l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8l-5.8 3.1 1.1-6.5L2.6 9.8l6.5-.9L12 3z" />
      <path
        d="M12 3v14.8L6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9L12 3z"
        fill="currentColor"
        stroke="none"
      />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  'arrow-right': <path d="M5 12h14M13 6l6 6-6 6" />,
  'arrow-up-right': <path d="M7 17L17 7M9 7h8v8" />,
  check: <path d="M5 12l4 4L19 6" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4-4" />
    </>
  ),
  peak: (
    <path
      d="M2 20 L8 8 L12 14 L16 6 L20 12 L22 20 Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  tiktok: (
    <path d="M14 4v9.2a3 3 0 11-3-3V8a5 5 0 105 5V9a5 5 0 003 1V6a3 3 0 01-3-2z" />
  ),
};

type Props = SVGProps<SVGSVGElement> & {
  name: IconName;
  className?: string;
  strokeWidth?: number;
  title?: string;
};

export const Icon = ({ name, className, strokeWidth = 1.75, title, ...rest }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    role={title ? 'img' : 'presentation'}
    aria-hidden={title ? undefined : true}
    className={cn('inline-block h-6 w-6 shrink-0', className)}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    {paths[name]}
  </svg>
);
