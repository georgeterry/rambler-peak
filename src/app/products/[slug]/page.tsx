import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { Reveal } from '@/components/primitives/Reveal';
import { Icon, type IconName } from '@/components/primitives/Icon';
import { ProductGallery } from '@/components/commerce/ProductGallery';
import { BuyBox } from '@/components/commerce/BuyBox';
import { StickyMobileBuyBar } from '@/components/commerce/StickyMobileBuyBar';
import { SplitFeature } from '@/components/content/SplitFeature';
import { SectionHeading } from '@/components/content/SectionHeading';
import { SpecTable } from '@/components/content/SpecTable';
import { FAQAccordion } from '@/components/content/FAQAccordion';
import { RatingDistribution } from '@/components/content/RatingDistribution';
import { ReviewCard } from '@/components/content/ReviewCard';
import { SpecStrip } from '@/components/brand/SpecStrip';
import { PlaceholderImage } from '@/components/brand/PlaceholderImage';
import { BenefitRow } from '@/components/content/BenefitRow';
import { VideoBlock } from '@/components/content/VideoBlock';
import { products, getProduct, formatPrice } from '@/data/products';
import { productReviews, ratingDistribution } from '@/data/reviews';
import { productJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const product = getProduct(params.slug);
  if (!product) return {};
  return {
    title: product.meta.title,
    description: product.meta.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} | Rambler Peak`,
      description: product.meta.description,
      images: [{ url: product.images[0].src }],
    },
  };
}

export default function ProductPage({ params }: { params: Params }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const reviews = productReviews(product.slug);
  const distribution = ratingDistribution(product.slug);
  const isMat = product.slug === 'dreamlite-camping-mat';

  return (
    <>
      {/* GALLERY + BUY BOX */}
      <Section tone="white" padding="sm">
        <Container>
          <div className="grid gap-10 lg:gap-16 lg:grid-cols-12 items-start pt-4 md:pt-8">
            <div className="lg:col-span-7">
              <ProductGallery images={product.images} />
            </div>
            <div className="lg:col-span-5">
              <BuyBox product={product} />
              {/* Benefit icon row under the buy box */}
              <ul className="mt-10 grid gap-5 border-t border-rp-hairline pt-8">
                {product.benefits.map((b) => (
                  <li key={b.title}>
                    <BenefitRow
                      icon={b.icon as IconName}
                      title={b.title}
                      body={b.body}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* AT-A-GLANCE SPEC STRIP */}
      <Section tone="mist" padding="sm">
        <Container>
          <Reveal>
            <SpecStrip items={product.specs.map((s) => ({ value: s.value, label: s.label }))} />
          </Reveal>
        </Container>
      </Section>

      {/* LONG-FORM STORY — alternating tones, per product */}
      {isMat ? <MatStory /> : <PillowStory />}

      {/* WHAT'S INCLUDED */}
      <Section tone="mist" padding="md">
        <Container>
          <div className="grid gap-10 md:grid-cols-12 items-center">
            <Reveal className="md:col-span-5">
              <SectionHeading
                eyebrow="In the box"
                title="What’s included"
                sub="Everything you need for a restful night outdoors. Nothing you don’t."
              />
              <ul className="mt-8 space-y-4">
                {product.inTheBox.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-body-lg">
                    <Icon name="check" className="h-5 w-5 text-rp-blue" strokeWidth={2} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="md:col-span-7">
              <PlaceholderImage
                src="/images/photos/tent-porch-kit.jpg"
                alt="The complete Rambler Peak sleep system set up in a tent porch with mat, pillow and stove"
                ratio="16:9"
                rounded
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* FULL SPECIFICATION */}
      <Section tone="white" padding="md" id="specification">
        <Container size="narrow">
          <Reveal>
            <SectionHeading eyebrow="Specification" title="The full numbers" />
          </Reveal>
          <SpecTable rows={product.longSpecs} className="mt-10" />
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="mist" padding="md">
        <Container size="narrow">
          <Reveal>
            <SectionHeading eyebrow="Questions" title="Before you ask" />
          </Reveal>
          <FAQAccordion items={product.faqs} className="mt-8" name={`faq-${product.slug}`} />
        </Container>
      </Section>

      {/* REVIEWS — hidden entirely rather than showing a zero-review block or an
          invented rating. Reinstated automatically the moment real reviews exist. */}
      {product.ratingSummary && reviews.length > 0 && (
        <Section tone="white" padding="md" id="reviews">
          <Container>
            <Reveal>
              <SectionHeading eyebrow="Reviews" title="From verified buyers" />
            </Reveal>
            <RatingDistribution
              average={product.ratingSummary.average}
              count={product.ratingSummary.count}
              distribution={distribution}
              className="mt-10"
            />
            {product.amazonUrl && (
              <p className="mt-6 text-body text-rp-slate">
                Collected from our Amazon listing.{' '}
                <a
                  href={product.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  Read all {product.ratingSummary.count} reviews on Amazon
                </a>
              </p>
            )}
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r) => (
                <Reveal key={r.id}>
                  <ReviewCard review={r} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <StickyMobileBuyBar product={product} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            productJsonLd({
              slug: product.slug,
              name: product.name,
              description: product.meta.description,
              image: product.images[0].src,
              priceGBP: product.price.amount / 100,
              rating: product.ratingSummary ?? undefined,
              sameAs: product.amazonUrl ? [product.amazonUrl] : undefined,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Shop', path: '/shop' },
              { name: product.name, path: `/products/${product.slug}` },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(product.faqs)) }}
      />
    </>
  );
}

/* ---------------------------------------------------------------------------
   Long-form stories. Presentation-only — copy tied to specs per brand rules.
--------------------------------------------------------------------------- */

const MatStory = () => (
  <>
    <SplitFeature
      eyebrow="Sleep system"
      title="Integrated ergonomic system"
      sub="Designed for comfort in the wild. The contoured pillow straps to the mat and stays exactly where you left it. No more chasing a rolled-up fleece around the tent at 3 am."
      benefits={[
        {
          icon: 'strap',
          title: 'Reinforced adjustable strap',
          body: 'Elastic loop holds the pillow to the mat through a full night of turning.',
        },
        {
          icon: 'disc-stack',
          title: 'Elevated cushioning',
          body: 'A raised head zone keeps you aligned on your side or back.',
        },
      ]}
      image={{
        src: '/images/photos/asleep-in-tent.jpg',
        alt: 'Camper asleep on the DreamLite system inside a tent pitched on heather moorland',
        ratio: '1:1',
      }}
      imageSide="right"
      tone="white"
    />

    <SplitFeature
      eyebrow="Packability"
      title="Ultralight & compact"
      sub="590 g, lighter than a full water bottle. Packs to 21 × 11 cm, about the size of a 1-litre flask, and disappears into a 35 L pack lid pocket."
      benefits={[
        {
          icon: 'feather',
          title: '40D Nylon TPU fabric',
          body: 'The weight of ultralight kit with the abrasion resistance gritstone demands.',
        },
        {
          icon: 'bag',
          title: 'Stuff sack included',
          body: 'Printed pack-down guide on the sack: roll, fold, cinch, go.',
        },
      ]}
      image={{
        src: '/images/photos/stuffsack-in-hands.jpg',
        alt: 'The DreamLite packed into its stuff sack, held in two hands above the valley',
        ratio: '1:1',
      }}
      imageSide="left"
      tone="mist"
    />

    <SplitFeature
      eyebrow="3-season warmth"
      title="Stay warm and dry"
      sub="An R-value of 2.5 keeps ground chill out from early spring to late autumn. Insulated chevron baffles trap warm air where your body needs it."
      benefits={[
        {
          icon: 'thermometer',
          title: 'R-Value 2.5',
          body: 'Comfortable on ground temperatures down to around 0 °C.',
        },
        {
          icon: 'season-cycle',
          title: '3-season rating',
          body: 'Spring ridge lines, summer wild camps, autumn valley floors.',
        },
        {
          icon: 'disc-stack',
          title: 'Insulated baffles',
          body: 'Contoured chambers reduce convective heat loss beneath you.',
        },
      ]}
      image={{
        src: '/images/photos/moorland-tent.jpg',
        alt: 'A tent pitched on heather moorland with the DreamLite visible in the porch',
        ratio: '1:1',
      }}
      imageSide="right"
      tone="charcoal"
    />

    <SplitFeature
      eyebrow="Break camp"
      title="Deflate. Pack. Go."
      sub="Twist the outer ring and the two-way valve dumps air in around ten seconds. Fold, roll, and be walking before your coffee cools."
      benefits={[
        {
          icon: 'valve',
          title: 'Two-way rapid valve',
          body: 'One-way for inflation, so no air is lost between breaths. Fully open for a ten-second deflate.',
        },
        {
          icon: 'pump',
          title: '12 breaths to inflate',
          body: 'Or use any standard camping pump with a nozzle up to 25 mm.',
        },
      ]}
      image={{
        src: '/images/photos/roll-on-gritstone.jpg',
        alt: 'The DreamLite being rolled tight on a gritstone slab ready for packing',
        ratio: '1:1',
      }}
      imageSide="left"
      tone="white"
    />

    {/* THE FILM — full-width band */}
    <Section tone="mist" padding="md">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="One minute in the wild"
            title="Set up in seconds"
            sub="Unpack, inflate, sleep. Deflate, fold, pack. Watch the whole routine in sixty seconds."
          />
        </Reveal>
        <Reveal className="mt-10">
          <VideoBlock
            src="/videos/dreamlite-film.mp4"
            poster="/images/photos/film-poster.jpg"
            title="The DreamLite film"
            location="pdp-dreamlite"
          />
        </Reveal>
      </Container>
    </Section>
  </>
);

const PillowStory = () => (
  <>
    <SplitFeature
      eyebrow="Sleep better"
      title="A better night’s sleep outdoors"
      sub="One deep breath inflates it. Curved baffles cradle your head and neck without the balloon-bounce of cheaper inflatable pillows."
      benefits={[
        {
          icon: 'moon',
          title: 'Contoured ergonomic shape',
          body: 'The dished centre keeps your head planted, side or back.',
        },
        {
          icon: 'valve',
          title: 'Adjust firmness mid-night',
          body: 'Crack the valve to soften without starting again.',
        },
      ]}
      image={{
        src: '/images/photos/pillow-inflate-moor.jpg',
        alt: 'The ergonomic camping pillow inflated in a single breath on a misty hillside',
        ratio: '1:1',
      }}
      imageSide="right"
      tone="white"
    />

    <SplitFeature
      eyebrow="Stays put"
      title="Straps to any mat"
      sub="The reinforced elastic strap loops around the DreamLite, or any mat up to 65 cm wide, and keeps the pillow securely in place."
      benefits={[
        {
          icon: 'strap',
          title: 'Reinforced adjustable strap',
          body: 'Fits the DreamLite (58 cm) and most three-season mats.',
        },
        {
          icon: 'feather',
          title: '85 g packed',
          body: 'Packs to the size of a plum. Lighter than your phone.',
        },
      ]}
      image={{
        src: '/images/photos/pillow-strap-tent.jpg',
        alt: 'The pillow strapped to a sleeping mat inside a tent, strap shown in close-up',
        ratio: '1:1',
      }}
      imageSide="left"
      tone="mist"
    />
  </>
);
