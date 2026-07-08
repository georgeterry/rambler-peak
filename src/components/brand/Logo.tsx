import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'white' | 'black' | 'blue';
type Size = 'sm' | 'md' | 'lg';

type Props = {
  variant?: Variant;
  size?: Size;
  className?: string;
  asLink?: boolean;
  priority?: boolean;
};

// Actual wordmark file is 2999 × 272 → intrinsic aspect ratio ~11:1.
const sources: Record<Variant, string> = {
  white: '/logos/wordmark-white.png',
  black: '/logos/wordmark-black.png',
  blue: '/logos/wordmark-blue.png',
};

const sizes: Record<Size, { width: number; height: number }> = {
  sm: { width: 132, height: 12 },
  md: { width: 176, height: 16 },
  lg: { width: 220, height: 20 },
};

export const Logo = ({
  variant = 'black',
  size = 'md',
  className,
  asLink = true,
  priority = false,
}: Props) => {
  const { width, height } = sizes[size];
  const img = (
    <Image
      src={sources[variant]}
      alt="Rambler Peak"
      width={width}
      height={height}
      priority={priority}
      className={cn('block h-auto w-auto', className)}
      style={{ width, height }}
    />
  );
  if (!asLink) return img;
  return (
    <Link href="/" aria-label="Rambler Peak home" className="inline-block">
      {img}
    </Link>
  );
};
