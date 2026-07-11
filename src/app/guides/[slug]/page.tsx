import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { PlaceholderImage } from '@/components/brand/PlaceholderImage';
import { GuideProse } from '@/components/content/GuideProse';
import { ButtonLink } from '@/components/primitives/Button';
import { Icon } from '@/components/primitives/Icon';
import { guides, getGuide, readingTime } from '@/data/guides';
import { site, breadcrumbJsonLd } from '@/lib/seo';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return guides.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const guide = getGuide(params.slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      title: `${guide.title} | Rambler Peak`,
      description: guide.description,
      type: 'article',
      publishedTime: guide.publishedAt,
      images: [{ url: guide.hero.src }],
    },
  };
}

const articleJsonLd = (guide: NonNullable<ReturnType<typeof getGuide>>) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: guide.h1,
  description: guide.description,
  image: [`${site.url}${guide.hero.src}`],
  datePublished: guide.publishedAt,
  author: {
    '@type': 'Person',
    name: 'George Terry',
    url: `${site.url}/about`,
  },
  publisher: {
    '@type': 'Organization',
    name: site.name,
    logo: { '@type': 'ImageObject', url: `${site.url}/logos/wordmark-black.png` },
  },
  mainEntityOfPage: `${site.url}/guides/${guide.slug}`,
});

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(iso),
  );

export default function GuidePage({ params }: { params: Params }) {
  const guide = getGuide(params.slug);
  if (!guide) notFound();

  const related = guide.related
    .map((slug) => getGuide(slug))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  return (
    <>
      <Section tone="white" padding="sm">
        <Container size="narrow">
          <nav aria-label="Breadcrumb" className="pt-4 md:pt-8">
            <ol className="flex flex-wrap items-center gap-2 text-eyebrow uppercase text-rp-slate">
              <li>
                <Link href="/" className="hover:text-rp-blue">Home</Link>
              </li>
              <li aria-hidden>·</li>
              <li>
                <Link href="/guides" className="hover:text-rp-blue">Guides</Link>
              </li>
            </ol>
          </nav>
          <h1 className="mt-6 text-display-2 display-brand">{guide.h1}</h1>
          <p className="mt-4 text-eyebrow uppercase text-rp-slate">
            By George Terry · {formatDate(guide.publishedAt)} · {readingTime(guide)} min read
          </p>
          <div className="mt-8">
            <PlaceholderImage
              src={guide.hero.src}
              alt={guide.hero.alt}
              ratio="3:2"
              rounded
              priority
              sizes="(min-width: 1024px) 56rem, 100vw"
            />
          </div>
          <div className="mt-10">
            <GuideProse blocks={guide.blocks} />
          </div>

          {/* Author + product close */}
          <div className="mt-14 border-t border-rp-hairline pt-8">
            <p className="text-body text-rp-slate max-w-prose">
              Written by George Terry, founder of Rambler Peak. Every product we sell is
              tested on the hills these guides are written about.{' '}
              <Link href="/about" className="link-underline">
                Read the story
              </Link>
              .
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/products/dreamlite-camping-mat" size="md">
                Shop the DreamLite mat
              </ButtonLink>
              <ButtonLink href="/guides" size="md" variant="ghost">
                More guides
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section tone="mist" padding="md">
          <Container size="narrow">
            <h2 className="text-h1-brand display-brand">Keep reading</h2>
            <ul className="mt-6 space-y-4">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/guides/${r.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-lg bg-rp-white border border-rp-hairline px-6 py-5 hover:border-rp-blue transition-colors"
                  >
                    <span className="text-subhead">{r.h1}</span>
                    <Icon
                      name="arrow-right"
                      className="h-5 w-5 shrink-0 text-rp-slate group-hover:text-rp-blue transition-colors"
                      strokeWidth={1.6}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(guide)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Guides', path: '/guides' },
              { name: guide.h1, path: `/guides/${guide.slug}` },
            ]),
          ),
        }}
      />
    </>
  );
}
