// Site-wide constants + JSON-LD helpers.
// The site config is the single source of truth for metadata defaults.

export const site = {
  name: 'Rambler Peak',
  legalName: 'Rambler Peak',
  tagline: 'Ultralight sleep systems from the Peak District',
  description:
    'Ultralight sleep systems engineered in the Peak District. Free UK delivery on orders over £30.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.ramblerpeak.com',
  locale: 'en-GB',
  currency: 'GBP',
  freeShippingThresholdPence: 3000,
  supportEmail: 'hello@ramblerpeak.com',
  // Welcome discount promised in the newsletter capture. The matching Stripe
  // promotion code is created by scripts/create-welcome-code.mjs and entered
  // by customers at checkout (allow_promotion_codes is on).
  welcomeDiscountCode: 'RAMBLE10',
  welcomeDiscountPercent: 10,
  // ---- Business / legal identity --------------------------------------------
  // Rambler Peak is a trading name of The Paisley Group Limited.
  // Before launch, paste the three public-record fields below (all on the
  // Companies House entry). Any left blank is simply omitted from the legal
  // pages — no broken placeholders — but UK consumer law needs the company
  // number and registered office shown, so fill them in.
  businessType: 'ltd' as 'ltd' | 'sole-trader',
  legalEntityName: 'The Paisley Group Limited',
  registeredIn: 'England & Wales',
  companyNumber: '13985948',
  registeredAddress: '4 Ganton Way, Grantham, England, NG31 9FD',
  vatNumber: '',            // leave blank if not VAT registered
  social: {
    instagram: '',
    tiktok: '',
  },
} as const;

// Composes the trading-identity sentence for the legal pages from whatever is
// set, so the copy always reads naturally and never shows a raw placeholder.
// Leads with the legal entity (so it slots after "operated by ..." on Terms)
// and appends "trading as <brand>" when the brand differs from the entity.
export const legalIdentity = (): string => {
  const isLtd = site.businessType === 'ltd';
  const sameName = (site.legalEntityName as string) === (site.name as string);

  let entity = site.legalEntityName;
  if (isLtd && site.companyNumber) entity += ` (company number ${site.companyNumber})`;

  const tail: string[] = [];
  if (isLtd) tail.push(`registered in ${site.registeredIn}`);
  if (site.registeredAddress) tail.push(`at ${site.registeredAddress}`);
  if (!sameName) tail.push(`trading as ${site.name}`);

  let sentence = tail.length ? `${entity}, ${tail.join(', ')}` : entity;
  sentence = sentence.replace(', at', ' at');

  let out = `${sentence}.`;
  if (site.vatNumber) out += ` VAT number ${site.vatNumber}.`;
  return out;
};

export type ProductJsonLdInput = {
  slug: string;
  name: string;
  description: string;
  image: string;
  priceGBP: number;
  rating?: { average: number; count: number };
};

export const productJsonLd = (p: ProductJsonLdInput) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: p.name,
  description: p.description,
  image: [`${site.url}${p.image}`],
  brand: { '@type': 'Brand', name: site.name },
  offers: {
    '@type': 'Offer',
    url: `${site.url}/products/${p.slug}`,
    priceCurrency: 'GBP',
    price: p.priceGBP.toFixed(2),
    availability: 'https://schema.org/InStock',
    itemCondition: 'https://schema.org/NewCondition',
  },
  ...(p.rating
    ? {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: p.rating.average.toFixed(1),
          reviewCount: p.rating.count,
        },
      }
    : {}),
});

export const organizationJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.url,
  logo: `${site.url}/logos/wordmark-black.png`,
  areaServed: 'GB',
  sameAs: Object.values(site.social).filter(Boolean),
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: site.supportEmail,
      areaServed: 'GB',
    },
  ],
});
