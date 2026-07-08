import Image from 'next/image';
import { Container } from '@/components/primitives/Container';
import { ButtonLink } from '@/components/primitives/Button';
import { cn } from '@/lib/utils';

type CTA = { href: string; label: string; variant?: 'primary' | 'ghost-light' | 'secondary' };

type Props = {
  eyebrow?: string;
  headline: string;
  sub?: string;
  primary?: CTA;
  secondary?: CTA;
  image: {
    src: string;
    alt: string;
    placeholderLabel?: string;
    // Art-direction hook: object-position / transform classes applied to the
    // <Image> itself, e.g. to keep burned-in creative text out of frame.
    imageClassName?: string;
  };
  className?: string;
};

const isPlaceholder = (s: string) => s.startsWith('placeholder:');

export const HeroFullBleed = ({
  eyebrow,
  headline,
  sub,
  primary,
  secondary,
  image,
  className,
}: Props) => (
  <section
    className={cn(
      'relative isolate w-full min-h-[92vh] md:min-h-screen flex flex-col justify-end overflow-hidden',
      className,
    )}
  >
    <div className="absolute inset-0 -z-10 bg-rp-charcoal">
      {isPlaceholder(image.src) ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-eyebrow uppercase text-rp-white/40">
            {image.placeholderLabel ?? 'HERO · MISTY MOUNTAINS 16:9 / 4:5 MOBILE'}
          </span>
        </div>
      ) : (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className={cn('object-cover', image.imageClassName)}
        />
      )}
    </div>
    <div className="absolute inset-0 -z-10 overlay-bottom" />
    <div className="absolute inset-0 -z-10 overlay-left" />

    <div className="relative pt-40 pb-16 md:pb-24">
      <Container>
        <div className="max-w-3xl text-rp-white">
          {eyebrow && <p className="eyebrow text-rp-white/80">{eyebrow}</p>}
          <h1 className="mt-4 text-display-1 display-brand">{headline}</h1>
          {sub && (
            <p className="mt-6 text-body-lg text-rp-white/85 max-w-xl">{sub}</p>
          )}
          {(primary || secondary) && (
            <div className="mt-10 flex flex-wrap gap-3">
              {primary && (
                <ButtonLink
                  href={primary.href}
                  variant={primary.variant ?? 'primary'}
                  size="lg"
                >
                  {primary.label}
                </ButtonLink>
              )}
              {secondary && (
                <ButtonLink
                  href={secondary.href}
                  variant={secondary.variant ?? 'ghost-light'}
                  size="lg"
                >
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  </section>
);
