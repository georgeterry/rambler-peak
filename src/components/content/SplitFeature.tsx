import type { ReactNode } from 'react';
import { Container } from '@/components/primitives/Container';
import { ButtonLink } from '@/components/primitives/Button';
import { PlaceholderImage } from '@/components/brand/PlaceholderImage';
import { Reveal } from '@/components/primitives/Reveal';
import { SectionHeading } from './SectionHeading';
import { BenefitRow } from './BenefitRow';
import type { IconName } from '@/components/primitives/Icon';
import { cn } from '@/lib/utils';

type Benefit = { icon: IconName; title: string; body: string };
type CTA = { href: string; label: string };

type Props = {
  eyebrow?: string;
  title: string;
  sub?: string;
  benefits?: Benefit[];
  primaryCta?: CTA;
  secondaryCta?: CTA;
  image: {
    src: string;
    alt: string;
    placeholderLabel?: string;
    ratio?: '1:1' | '4:5' | '3:4';
    imgClassName?: string;
  };
  imageSide?: 'left' | 'right';
  tone?: 'white' | 'mist' | 'charcoal';
  overlay?: ReactNode;
  className?: string;
};

const backgrounds: Record<NonNullable<Props['tone']>, string> = {
  white: 'bg-rp-white text-rp-charcoal',
  mist: 'bg-rp-mist text-rp-charcoal',
  charcoal: 'bg-rp-charcoal text-rp-white',
};

export const SplitFeature = ({
  eyebrow,
  title,
  sub,
  benefits,
  primaryCta,
  secondaryCta,
  image,
  imageSide = 'right',
  tone = 'white',
  overlay,
  className,
}: Props) => {
  const isDark = tone === 'charcoal';
  return (
    <section className={cn('py-16 md:py-24', backgrounds[tone], className)}>
      <Container>
        <div className="grid gap-10 md:gap-16 md:grid-cols-12 items-center">
          <Reveal
            className={cn(
              'md:col-span-6 relative',
              imageSide === 'left' ? 'md:order-1' : 'md:order-2',
            )}
          >
            <PlaceholderImage
              src={image.src}
              alt={image.alt}
              ratio={image.ratio ?? '4:5'}
              label={image.placeholderLabel}
              rounded
              tone={isDark ? 'charcoal' : 'mist'}
              imgClassName={image.imgClassName}
            />
            {overlay && <div className="absolute inset-0 pointer-events-none">{overlay}</div>}
          </Reveal>
          <Reveal
            className={cn('md:col-span-6', imageSide === 'left' ? 'md:order-2' : 'md:order-1')}
          >
            <SectionHeading
              eyebrow={eyebrow}
              title={title}
              sub={sub}
              tone={isDark ? 'light' : 'dark'}
            />
            {benefits && benefits.length > 0 && (
              <ul className="mt-10 space-y-6">
                {benefits.map((b, i) => (
                  <li key={`${b.title}-${i}`}>
                    <BenefitRow
                      icon={b.icon}
                      title={b.title}
                      body={b.body}
                      tone={isDark ? 'light' : 'dark'}
                    />
                  </li>
                ))}
              </ul>
            )}
            {(primaryCta || secondaryCta) && (
              <div className="mt-10 flex flex-wrap gap-3">
                {primaryCta && (
                  <ButtonLink href={primaryCta.href} size="lg">
                    {primaryCta.label}
                  </ButtonLink>
                )}
                {secondaryCta && (
                  <ButtonLink
                    href={secondaryCta.href}
                    size="lg"
                    variant={isDark ? 'ghost-light' : 'ghost'}
                  >
                    {secondaryCta.label}
                  </ButtonLink>
                )}
              </div>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
};
