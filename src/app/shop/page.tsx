import type { Metadata } from 'next';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { Reveal } from '@/components/primitives/Reveal';
import { SectionHeading } from '@/components/content/SectionHeading';
import { ProductCard } from '@/components/commerce/ProductCard';
import { TrustBadgeStrip } from '@/components/brand/TrustBadgeStrip';
import { products } from '@/data/products';

export const metadata: Metadata = {
  title: 'Shop Camping Mats & Pillows',
  description:
    'Shop Rambler Peak ultralight camping mats and pillows from the Peak District: the DreamLite camping mat with integrated pillow, and the standalone camping pillow. Free UK delivery.',
  alternates: { canonical: '/shop' },
};

export default function ShopPage() {
  return (
    <>
      <Section tone="white" padding="md">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Shop"
              title="The sleep system"
              sub="Two products, engineered to work together and built to earn their place in your pack."
              size="lg"
              as="h1"
            />
          </Reveal>
          {/* Grid scales to 3-up when the range grows */}
          <div className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-2 max-w-5xl">
            {products.map((p) => (
              <Reveal key={p.slug}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="mist" padding="none">
        <Container>
          <TrustBadgeStrip />
        </Container>
      </Section>
    </>
  );
}
