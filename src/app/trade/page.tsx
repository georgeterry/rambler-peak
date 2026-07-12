import type { Metadata } from 'next';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { Reveal } from '@/components/primitives/Reveal';
import { SectionHeading } from '@/components/content/SectionHeading';
import { PlaceholderImage } from '@/components/brand/PlaceholderImage';
import { Icon } from '@/components/primitives/Icon';
import { TradeForm } from './TradeForm';

export const metadata: Metadata = {
  title: 'Trade & Group Orders',
  description:
    'Bulk camping mats for DofE providers, schools, scout groups, outdoor education centres and clubs. Trade pricing from £16 a unit, delivered, with free samples for buyers.',
  alternates: { canonical: '/trade' },
};

const TIERS = [
  { qty: '20+ units', price: '£18 per unit' },
  { qty: '40+ units', price: '£17 per unit' },
  { qty: '100+ units', price: '£16 per unit' },
] as const;

export default function TradePage() {
  return (
    <>
      <Section tone="charcoal" padding="md">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Trade & group orders"
              title="Kit your whole group"
              sub="Bulk pricing on the DreamLite camping mat for DofE providers, schools, scout groups, outdoor education centres and clubs. Direct from us, delivered, invoiced."
              tone="light"
              size="lg"
              as="h1"
            />
          </Reveal>
        </Container>
      </Section>

      <Section tone="white" padding="md">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <h2 className="text-h1-brand display-brand">Trade pricing</h2>
              <ul className="mt-6 divide-y divide-rp-hairline border-y border-rp-hairline">
                {TIERS.map((t) => (
                  <li key={t.qty} className="flex items-baseline justify-between py-4">
                    <span className="text-subhead">{t.qty}</span>
                    <span className="text-h2-brand font-semibold text-rp-blue">{t.price}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-caption text-rp-slate">
                RRP £29.99. Prices include UK delivery. Payment by invoice and bank transfer.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  'Free sample unit posted before you commit',
                  'Delivery within a week of order',
                  '590 g, packs to 21 × 11 cm, R-value 2.5, pillow and repair kit included',
                  'Rated 4.2 out of 5 from 78 Amazon reviews',
                  '1-year warranty on every unit',
                ].map((point) => (
                  <li key={point} className="flex gap-3 text-body text-rp-slate">
                    <Icon name="check" className="h-5 w-5 shrink-0 text-rp-blue" strokeWidth={2} aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <PlaceholderImage
                  src="/images/photos/studio-mat-pillow.jpg"
                  alt="DreamLite camping mat and pillow set supplied in every trade order"
                  ratio="4:5"
                  rounded
                  sizes="(min-width: 768px) 40vw, 100vw"
                />
              </div>
            </Reveal>
            <Reveal className="md:col-span-7">
              <h2 className="text-h1-brand display-brand">Start an enquiry</h2>
              <p className="mt-3 text-body-lg text-rp-slate max-w-prose">
                Tell us who you are and roughly how many you need. George replies personally
                within one working day, usually with a sample offer.
              </p>
              <div className="mt-8">
                <TradeForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
