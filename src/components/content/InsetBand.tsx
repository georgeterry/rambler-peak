import { Container } from '@/components/primitives/Container';
import { CircularInset } from '@/components/brand/CircularInset';
import { PlaceholderImage } from '@/components/brand/PlaceholderImage';
import { Reveal } from '@/components/primitives/Reveal';
import { cn } from '@/lib/utils';

type Props = {
  image: { src: string; alt: string; placeholderLabel?: string; imgClassName?: string };
  inset: { src: string; alt: string; placeholderLabel?: string; imgClassName?: string };
  eyebrow?: string;
  headline: string;
  sub?: string;
  className?: string;
};

export const InsetBand = ({ image, inset, eyebrow, headline, sub, className }: Props) => (
  <section className={cn('relative isolate overflow-hidden', className)}>
    <div className="relative w-full min-h-[70vh] md:min-h-[80vh]">
      <div className="absolute inset-0">
        <PlaceholderImage
          src={image.src}
          alt={image.alt}
          ratio="21:9"
          label={image.placeholderLabel}
          tone="charcoal"
          className="!aspect-auto h-full absolute inset-0"
          imgClassName={image.imgClassName}
        />
      </div>
      <div className="absolute inset-0 overlay-left" />
      <div className="absolute inset-0 flex items-center py-16">
        <Container>
          <div className="grid md:grid-cols-12 items-center gap-8 md:gap-12">
            <Reveal className="md:col-span-6 text-rp-white">
              {eyebrow && <p className="eyebrow text-rp-white/80">{eyebrow}</p>}
              <h2 className="mt-3 text-display-2 display-brand">{headline}</h2>
              {sub && (
                <p className="mt-4 text-body-lg text-rp-white/85 max-w-lg">{sub}</p>
              )}
            </Reveal>
            <Reveal className="md:col-span-6 flex justify-center md:justify-end">
              <CircularInset
                src={inset.src}
                alt={inset.alt}
                label={inset.placeholderLabel}
                size="xl"
                imgClassName={inset.imgClassName}
              />
            </Reveal>
          </div>
        </Container>
      </div>
    </div>
  </section>
);
