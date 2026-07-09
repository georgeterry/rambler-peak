import type { Metadata } from 'next';
import { HeroFullBleed } from '@/components/content/HeroFullBleed';
import { VideoBlock } from '@/components/content/VideoBlock';
import { TrustBadgeStrip } from '@/components/brand/TrustBadgeStrip';
import { SplitFeature } from '@/components/content/SplitFeature';
import { InsetBand } from '@/components/content/InsetBand';
import { SpecStrip } from '@/components/brand/SpecStrip';
import { StatBadge } from '@/components/brand/StatBadge';
import { StoryTeaser } from '@/components/content/StoryTeaser';
import { ReviewCarousel } from '@/components/content/ReviewCarousel';
import { NewsletterCapture } from '@/components/content/NewsletterCapture';
import { SectionHeading } from '@/components/content/SectionHeading';
import { Section } from '@/components/primitives/Section';
import { Container } from '@/components/primitives/Container';
import { Reveal } from '@/components/primitives/Reveal';
import { featuredReviews } from '@/data/reviews';
import { getProduct, formatPrice } from '@/data/products';
import { site } from '@/lib/seo';

export const metadata: Metadata = {
  title: `${site.name} | ${site.tagline}`,
  description:
    'Rambler Peak makes ultralight camping mats and pillows, engineered in the Peak District. The DreamLite camping mat with integrated pillow: 590 g, three-season warmth, free UK delivery over £30.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Rambler Peak | Ultralight sleep systems from the Peak District',
    description:
      'The DreamLite ultralight sleeping mat with integrated ergonomic pillow. Engineered in the Peak District.',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  const dreamlite = getProduct('dreamlite-camping-mat')!;
  const pillow = getProduct('camping-pillow')!;

  return (
    <>
      {/* 1 · HERO — art-directed crop keeps the creative's burned-in copy out of frame */}
      <HeroFullBleed
        headline="Rekindle your connection with the natural world"
        sub="Ultralight sleep systems engineered in the Peak District."
        primary={{ href: '/products/dreamlite-camping-mat', label: 'Shop DreamLite' }}
        secondary={{ href: '/about', label: 'Our Story' }}
        image={{
          src: '/images/photos/hero-gritstone-edge.jpg',
          alt: 'Two ramblers sat on a Rambler Peak sleeping mat on a gritstone edge above a misty Peak District valley',
          imageClassName: 'object-[center_35%]',
        }}
      />

      {/* 2 · TRUST STRIP */}
      <Section tone="mist" padding="none">
        <Container>
          <TrustBadgeStrip />
        </Container>
      </Section>

      {/* 3 · FEATURED — DreamLite */}
      <SplitFeature
        eyebrow="DreamLite · Sleep System"
        title="Engineered for comfort"
        sub="A curved, insulated mat with an integrated ergonomic pillow. Every gram considered, every baffle placed with purpose."
        benefits={[
          {
            icon: 'disc-stack',
            title: '6 cm of insulated, curved support',
            body: 'Contoured chevron baffles cushion hips and shoulders where thin foam fails.',
          },
          {
            icon: 'pump',
            title: 'Fast inflation with reliable valve, just 12 breaths',
            body: 'A wide-mouth, one-way valve fills fast and holds pressure through the night.',
          },
          {
            icon: 'feather',
            title: 'Ultralight & durable 40D Nylon TPU',
            body: '590 g, lighter than a full water bottle and tough enough for gritstone.',
          },
        ]}
        primaryCta={{
          href: '/products/dreamlite-camping-mat',
          label: `Shop DreamLite · ${formatPrice(dreamlite.price)}`,
        }}
        image={{
          src: '/images/photos/studio-mat-pillow.jpg',
          alt: dreamlite.images[0].alt,
          ratio: '1:1',
          imgClassName: 'object-contain bg-white p-4',
        }}
        imageSide="right"
        overlay={
          <div className="absolute bottom-5 left-5 md:bottom-8 md:left-8">
            <StatBadge value="2.5" label="R-Value" tone="dark" />
          </div>
        }
      />

      {/* 4 · SIGNATURE DETAIL BAND */}
      <InsetBand
        eyebrow="DreamLite · Detail"
        headline="Integrated ergonomic system"
        sub="Designed for comfort in the wild. The contoured pillow straps to the mat and stays put all night, every night."
        image={{
          src: '/images/photos/band-forest-unroll.jpg',
          alt: 'A camper unrolling the DreamLite mat beside a tent in a forest clearing',
        }}
        inset={{
          src: '/images/photos/detail-strap.jpg',
          alt: 'Close-up of the pillow strap looped around the folded DreamLite mat',
        }}
      />

      {/* 5 · SPEC STRIP */}
      <Section tone="mist" padding="sm">
        <Container>
          <Reveal>
            <SpecStrip
              items={[
                { value: '190 × 58 cm', label: 'Inflated' },
                { value: '6 cm', label: 'Thick' },
                { value: '590 g', label: 'Weight' },
                { value: '21 × 11 cm', label: 'Packed' },
                { value: '2.5', label: 'R-Value' },
                { value: '12', label: 'Breaths' },
              ]}
            />
          </Reveal>
        </Container>
      </Section>

      {/* 6 · PILLOW CROSS-SELL */}
      <SplitFeature
        eyebrow="Camping Pillow"
        title="Ergonomic pillow included"
        sub="Every DreamLite ships with our inflatable ergonomic pillow, with a secure strap for a better night’s sleep outdoors. Also available on its own."
        benefits={[
          {
            icon: 'strap',
            title: 'Secure strap keeps it in place',
            body: 'Loops around the mat so the pillow stays where you left it.',
          },
          {
            icon: 'moon',
            title: 'Contoured for real sleep',
            body: 'Curved baffles cradle head and neck without collapsing.',
          },
        ]}
        primaryCta={{
          href: '/products/camping-pillow',
          label: `Shop Pillow · ${formatPrice(pillow.price)}`,
        }}
        image={{
          src: '/images/photos/pillow-inflate-moor.jpg',
          alt: 'A camper inflating the ergonomic pillow in a single breath on a Peak District edge',
          ratio: '4:5',
          imgClassName: 'object-[55%_center]',
        }}
        imageSide="left"
        tone="mist"
      />

      {/* 6b · THE FILM */}
      <Section tone="charcoal" padding="md">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="One minute in the wild"
              title="See it in the field"
              sub="Sixty seconds of the DreamLite doing its job: unpacked, inflated and slept on, somewhere above the valley."
              tone="light"
            />
          </Reveal>
          <Reveal className="mt-10">
            <VideoBlock
              src="/videos/dreamlite-film.mp4"
              poster="/images/photos/film-poster.jpg"
              title="The DreamLite film"
              location="homepage"
            />
          </Reveal>
        </Container>
      </Section>

      {/* 7 · BRAND STORY TEASER */}
      <StoryTeaser />

      {/* 8 · REVIEWS */}
      <Section tone="white" padding="md">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Reviews"
              title="From the hills"
              sub="What ramblers tell us after a few nights out."
            />
          </Reveal>
          <ReviewCarousel reviews={featuredReviews} className="mt-10" />
        </Container>
      </Section>

      {/* 9 · EMAIL CAPTURE */}
      <Section tone="mist" padding="md">
        <Container>
          <Reveal>
            <NewsletterCapture source="homepage" />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
