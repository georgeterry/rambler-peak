import type { Metadata } from 'next';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { Reveal } from '@/components/primitives/Reveal';
import { SectionHeading } from '@/components/content/SectionHeading';
import { FAQAccordion } from '@/components/content/FAQAccordion';
import { PlaceholderImage } from '@/components/brand/PlaceholderImage';
import { ButtonLink } from '@/components/primitives/Button';
import { supportFaqs } from '@/data/faqs';
import { site, faqJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'FAQ & Support',
  description:
    'Care instructions, inflation guide, warranty and returns for Rambler Peak sleep systems. We aim to reply within one working day.',
  alternates: { canonical: '/support' },
};

export default function SupportPage() {
  const allFaqs = supportFaqs.flatMap((g) => g.faqs);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(allFaqs)) }}
      />
      <Section tone="mist" padding="md">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Support"
              title="How can we help?"
              sub={`Answers to the common questions below. Anything else, email ${site.supportEmail} and a person from the Peak District replies within one working day.`}
              size="lg"
              as="h1"
            />
          </Reveal>
        </Container>
      </Section>

      <Section tone="white" padding="md">
        <Container size="narrow">
          {supportFaqs.map((group) => (
            <Reveal key={group.title} className="mb-14 last:mb-0">
              <h2 className="text-h1-brand display-brand">{group.title}</h2>
              <FAQAccordion
                items={group.faqs}
                className="mt-4"
                name={`support-${group.title.toLowerCase().replace(/[^a-z]+/g, '-')}`}
              />
            </Reveal>
          ))}
        </Container>
      </Section>

      <Section tone="mist" padding="md">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Inflation guide"
              title="Set up in seconds"
              sub="Unpack, inflate, sleep. Deflate, fold, pack. Six steps, no faff."
            />
          </Reveal>
          <Reveal className="mt-10">
            <PlaceholderImage
              src="/images/aplus-setup-steps.jpg"
              alt="Six-step guide showing how to unpack, inflate, use, deflate, fold and pack the DreamLite mat"
              ratio="3:2"
              rounded
            />
          </Reveal>
        </Container>
      </Section>

      <Section tone="charcoal" padding="md">
        <Container>
          <div className="md:flex items-center justify-between gap-8">
            <Reveal>
              <h2 className="text-display-2 display-brand text-rp-white">Still stuck?</h2>
              <p className="mt-3 text-body-lg text-rp-white/80 max-w-lg">
                Send us a message with your order number and we’ll sort it: repairs,
                replacements or plain advice.
              </p>
            </Reveal>
            <Reveal className="mt-8 md:mt-0 shrink-0">
              <ButtonLink href="/contact" size="lg">
                Contact us
              </ButtonLink>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
