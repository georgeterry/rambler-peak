import Image from 'next/image';
import { cn } from '@/lib/utils';

// The brand's most recognisable graphic device: a circular zoom crop with a
// thick white ring and a soft drop shadow, used to spotlight product details
// over full-bleed lifestyle imagery.
type Props = {
  src: string;              // "placeholder:<key>" or a real /public path
  alt: string;
  label?: string;           // shown inside the placeholder block
  size?: 'sm' | 'md' | 'lg' | 'xl';
  position?: 'inline' | 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
  className?: string;
  ringTone?: 'light' | 'dark';
  imgClassName?: string;    // art-direction: object-position / scale on the inner image
};

const sizes: Record<NonNullable<Props['size']>, string> = {
  sm: 'h-24 w-24 md:h-28 md:w-28',
  md: 'h-36 w-36 md:h-44 md:w-44',
  lg: 'h-48 w-48 md:h-60 md:w-60',
  xl: 'h-64 w-64 md:h-80 md:w-80',
};

const positions: Record<NonNullable<Props['position']>, string> = {
  inline: '',
  'top-right': 'absolute top-6 right-6 md:top-10 md:right-10',
  'bottom-right': 'absolute bottom-6 right-6 md:bottom-10 md:right-10',
  'top-left': 'absolute top-6 left-6 md:top-10 md:left-10',
  'bottom-left': 'absolute bottom-6 left-6 md:bottom-10 md:left-10',
};

const isPlaceholder = (s: string) => s.startsWith('placeholder:');

export const CircularInset = ({
  src,
  alt,
  label,
  size = 'md',
  position = 'inline',
  className,
  ringTone = 'light',
  imgClassName,
}: Props) => {
  const ring = ringTone === 'light' ? 'ring-white' : 'ring-rp-charcoal';
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-full ring-[5px] md:ring-[6px] shadow-[0_10px_30px_rgba(0,0,0,0.35)]',
        ring,
        sizes[size],
        positions[position],
        className,
      )}
    >
      {isPlaceholder(src) ? (
        <div
          className="absolute inset-0 flex items-center justify-center bg-rp-charcoal p-4 text-center"
          role="img"
          aria-label={alt}
        >
          <span className="text-[10px] uppercase tracking-eyebrow text-rp-white/80">
            {label ?? src.replace('placeholder:', '').toUpperCase().replace(/-/g, ' ')}
          </span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 320px, 200px"
          className={cn('object-cover', imgClassName)}
        />
      )}
    </div>
  );
};
