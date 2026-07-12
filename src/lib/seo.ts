// Site-wide constants + JSON-LD helpers.
// The site config is the single source of truth for metadata defaults.

export const site = {
  name: 'Rambler Peak',
  legalName: 'Rambler Peak',
  tagline: 'Ultralight sleep systems from the Peak District',
  description:
    'Ultralight sleep systems engineered in the Peak District. Free UK delivery on every order.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.ramblerpeak.com',
  locale: 'en-GB',
  currency: 'GBP',
  // 0 = free UK delivery on everything (summer sale). Restore to 3000 to
  // bring back the "free over £30" threshold and all its nudge copy.
  freeShippingThresholdPence: 0,
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
    instagram: 'ramblerpeak',
    tiktok: 'ramblerpeak',
  },
  amazonStoreUrl:
    'https://www.amazon.co.uk/stores/RAMBLERPEAK/page/C7E041B4-59E9-4253-87E0-A03ED1FDAEF9',
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
  // Same product listed elsewhere (e.g. the Amazon listing) — honest entity link.
  sameAs?: string[];
};

export const productJsonLd = (p: ProductJsonLdInput) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: p.name,
  description: p.description,
  image: [`${site.url}${p.image}`],
  brand: { '@type': 'Brand', name: site.name },
  ...(p.sameAs && p.sameAs.length ? { sameAs: p.sameAs } : {}),
  offers: {
    '@type': 'Offer',
    url: `${site.url}/products/${p.slug}`,
    priceCurrency: 'GBP',
    price: p.priceGBP.toFixed(2),
    availability: 'https://schema.org/InStock',
    itemCondition: 'https://schema.org/NewCondition',
    // Real policies, as published on /shipping-returns. Google surfaces these
    // in shopping/merchant results for UK queries.
    shippingDetails: {
      '@type': 'OfferShippingDetails',
      shippingRate: {
        '@type': 'MonetaryAmount',
        // Free UK delivery on every order (summer sale). If the £30 threshold
        // returns, reinstate the conditional worst-case rate here.
        value: '0.00',
        currency: 'GBP',
      },
      shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'GB' },
      deliveryTime: {
        '@type': 'ShippingDeliveryTime',
        handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 1, unitCode: 'DAY' },
        transitTime: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 3, unitCode: 'DAY' },
      },
    },
    hasMerchantReturnPolicy: {
      '@type': 'MerchantReturnPolicy',
      applicableCountry: 'GB',
      returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
      merchantReturnDays: 30,
      returnMethod: 'https://schema.org/ReturnByMail',
      returnFees: 'https://schema.org/ReturnFeesCustomerResponsibility',
    },
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

// Influences the site name Google shows beside the favicon in results.
export const websiteJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.name,
  alternateName: 'Rambler Peak®',
  url: site.url,
});

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: `${site.url}${item.path}`,
  })),
});

export const faqJsonLd = (faqs: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export const organizationJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.url,
  logo: `${site.url}/logos/wordmark-black.png`,
  areaServed: 'GB',
  // Profiles representing the brand elsewhere — strengthens the entity graph
  // behind brand-name searches.
  sameAs: [
    site.social.instagram && `https://www.instagram.com/${site.social.instagram}`,
    site.social.tiktok && `https://www.tiktok.com/@${site.social.tiktok}`,
    site.amazonStoreUrl,
  ].filter(Boolean),
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: site.supportEmail,
      areaServed: 'GB',
    },
  ],
});
