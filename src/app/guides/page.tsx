import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { Reveal } from '@/components/primitives/Reveal';
import { SectionHeading } from '@/components/content/SectionHeading';
import { PlaceholderImage } from '@/components/brand/PlaceholderImage';
import { guides, readingTime } from '@/data/guides';

export const metadata: Metadata = {
  title: 'Guides',
  description:
    'Field-tested guides to camping mats, R-values, sleeping well outdoors and wild camping in the Peak District, from a small UK brand that tests on the hills.',
  alternates: { canonical: '/guides' },
};

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(iso),
  );

export default function GuidesPage() {
  return (
    <Section tone="white" padding="md">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Guides"
            title="From the hills, in writing"
            sub="Practical guides to sleeping well outdoors, written and tested by us in the Peak District. No filler, no pretending we are neutral about mats."
            size="lg"
            as="h1"
          />
        </Reveal>
        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <Reveal key={guide.slug}>
              <article className="group flex flex-col h-full">
                <Link href={`/guides/${guide.slug}`} className="block overflow-hidden rounded-lg">
                  <PlaceholderImage
                    src={guide.hero.src}
                    alt={guide.hero.alt}
                    ratio="3:2"
                    rounded
                    className="transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </Link>
                <p className="mt-5 text-eyebrow uppercase text-rp-slate">
                  {formatDate(guide.publishedAt)} · {readingTime(guide)} min read
                </p>
                <h2 className="mt-2 text-h2-brand display-brand">
                  <Link href={`/guides/${guide.slug}`} className="hover:text-rp-blue transition-colors">
                    {guide.h1}
                  </Link>
                </h2>
                <p className="mt-2 text-body text-rp-slate">{guide.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
