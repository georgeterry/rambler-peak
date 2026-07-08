import Image from 'next/image';
import { cn, aspectRatioClass } from '@/lib/utils';

type Ratio = '1:1' | '4:5' | '16:9' | '21:9' | '3:4' | '3:2';

type Props = {
  src: string;             // "placeholder:<key>" or a real /public path
  alt: string;
  ratio?: Ratio;
  label?: string;          // shown inside the placeholder block
  className?: string;
  priority?: boolean;
  sizes?: string;
  rounded?: boolean;
  tone?: 'mist' | 'charcoal';
  imgClassName?: string;   // art-direction: object-position / transform on the inner image
};

const isPlaceholder = (s: string) => s.startsWith('placeholder:');

export const PlaceholderImage = ({
  src,
  alt,
  ratio = '4:5',
  label,
  className,
  priority,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  rounded = false,
  tone = 'mist',
  imgClassName,
}: Props) => {
  const wrapper = cn(
    'relative w-full overflow-hidden',
    aspectRatioClass(ratio),
    rounded && 'rounded-lg',
    tone === 'mist' ? 'bg-rp-mist' : 'bg-rp-charcoal',
    className,
  );

  if (isPlaceholder(src)) {
    const key = src.replace('placeholder:', '');
    const text = label !== undefined ? label : key.toUpperCase().replace(/-/g, ' ');
    const swatch = tone === 'mist' ? 'text-rp-slate' : 'text-rp-white/70';
    return (
      <div
        className={wrapper}
        role="img"
        aria-label={alt}
        data-placeholder={key}
      >
        {text !== '' && (
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className={cn('text-center', swatch)}>
              <span className="block text-eyebrow uppercase opacity-60">Placeholder</span>
              <span className="mt-2 block text-eyebrow uppercase">{text}</span>
              <span className="mt-2 block text-[10px] uppercase tracking-eyebrow opacity-60">
                {ratio}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={wrapper}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn('object-cover', imgClassName)}
      />
    </div>
  );
};
