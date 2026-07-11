// Rambler Peak product catalogue.
// Single source of truth for prices, specs, imagery, copy and metadata.
// Structure intentionally boring so it can migrate to a headless CMS or the
// Stripe Products API later without touching page components.

export type Money = { amount: number; currency: 'GBP' };

export type ProductImage = {
  src: string;              // "placeholder:<key>" until real photography is dropped in /public/images
  alt: string;
  ratio: '1:1' | '4:5' | '16:9' | '21:9' | '3:4' | '3:2';
  label: string;            // shown inside the placeholder block, e.g. "PDP · GALLERY 1"
};

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  price: Money;
  compareAtPrice?: Money;
  stripePriceId?: string;
  hero: { eyebrow: string; headline: string; sub: string };
  benefits: { icon: string; title: string; body: string }[];
  specs: { label: string; value: string }[];
  longSpecs: { label: string; value: string }[];
  images: ProductImage[];
  inTheBox: string[];
  faqs: { q: string; a: string }[];
  // null = no reviews sourced yet. Never invent a rating: hide it in the UI instead.
  ratingSummary: { average: number; count: number } | null;
  // The same product on marketplaces (shown as a trust link and in schema).
  amazonUrl?: string;
  meta: { title: string; description: string };
};

const gbp = (pounds: number): Money => ({ amount: Math.round(pounds * 100), currency: 'GBP' });

const dreamlite: Product = {
  slug: 'dreamlite-camping-mat',
  name: 'DreamLite Ultralight Camping Mat',
  shortName: 'DreamLite Mat',
  tagline: 'Ergonomic ultralight sleep system with integrated pillow.',
  price: gbp(27.99),
  stripePriceId: process.env.STRIPE_PRICE_DREAMLITE,
  hero: {
    eyebrow: 'DreamLite · Sleep System',
    headline: 'ENGINEERED FOR COMFORT',
    sub: 'A curved, insulated mat with an integrated ergonomic pillow. 590 g on your back, three-season warmth beneath you.',
  },
  benefits: [
    { icon: 'disc-stack', title: '6 cm of curved, insulated support', body: 'Contoured chevron baffles cushion hips and shoulders where thin foam fails.' },
    { icon: 'pump', title: 'Inflates in 12 breaths', body: 'A wide-mouth valve fills the mat fast and holds pressure through the night.' },
    { icon: 'feather', title: 'Ultralight & durable 40D Nylon TPU', body: '590 g packed, lighter than a full water bottle and tough enough for gritstone.' },
  ],
  specs: [
    { label: 'Inflated', value: '190 × 58 cm' },
    { label: 'Thickness', value: '6 cm' },
    { label: 'Weight', value: '590 g' },
    { label: 'Packed', value: '21 × 11 cm' },
    { label: 'R-Value', value: '2.5' },
    { label: 'Inflation', value: '12 breaths' },
  ],
  longSpecs: [
    { label: 'Inflated dimensions', value: '190 × 58 × 6 cm' },
    { label: 'Packed dimensions', value: '21 × 11 cm' },
    { label: 'Weight', value: '590 g' },
    { label: 'R-Value', value: '2.5' },
    { label: 'Season rating', value: '3-season (spring / summer / autumn)' },
    { label: 'Material', value: '40D Nylon with TPU coating' },
    { label: 'Baffle construction', value: 'Contoured chevron with elevated head cushion' },
    { label: 'Valve', value: 'Wide-mouth, two-way with rapid deflate' },
    { label: 'Inflation', value: 'Approximately 12 breaths' },
    { label: 'Weight limit', value: '150 kg' },
    { label: 'Included', value: 'Mat, ergonomic pillow strap, repair kit, stuff sack' },
    { label: 'Warranty', value: '1-year manufacturing warranty' },
  ],
  images: [
    { src: '/images/photos/studio-mat-pillow.jpg', alt: 'DreamLite ultralight sleeping mat with ergonomic pillow in Rambler Peak royal blue', ratio: '1:1', label: 'PDP · GALLERY 1 · HERO 1:1' },
    { src: '/images/photos/asleep-on-mat.jpg', alt: 'Camper asleep on the DreamLite mat and integrated pillow inside a tent', ratio: '1:1', label: 'PDP · GALLERY 2 · COMFORT 1:1' },
    { src: '/images/photos/pack-into-rucksack.jpg', alt: 'The packed DreamLite sliding into a rucksack side pocket on the moor', ratio: '1:1', label: 'PDP · GALLERY 3 · PACKED 1:1' },
    { src: '/images/photos/detail-valve.jpg', alt: 'Close-up of the DreamLite two-way valve held between finger and thumb', ratio: '1:1', label: 'PDP · GALLERY 4 · VALVE 1:1' },
    { src: '/images/photos/baffle-macro.jpg', alt: 'Close-up of the DreamLite chevron baffle construction', ratio: '1:1', label: 'PDP · GALLERY 5 · BAFFLES 1:1' },
    { src: '/images/photos/hero-gritstone-edge.jpg', alt: 'Two ramblers sat on the DreamLite mat on a gritstone edge above a misty Peak District valley', ratio: '1:1', label: 'PDP · GALLERY 6 · WILD 1:1' },
  ],
  inTheBox: [
    'DreamLite ultralight camping mat',
    'Integrated ergonomic pillow strap',
    'Repair patch kit',
    'Ultralight stuff sack',
  ],
  faqs: [
    { q: 'How do I inflate the DreamLite?', a: 'Open the wide-mouth valve and inflate in approximately 12 slow breaths. The valve is one-way, so no air escapes between breaths. A standard camping pump also fits if you prefer.' },
    { q: 'Will it keep me warm in spring and autumn?', a: 'Yes. The 2.5 R-value is comfortable in temperatures down to around 0 °C, which covers spring, summer and autumn conditions in the UK.' },
    { q: 'What happens if it punctures?', a: 'Every DreamLite ships with a self-adhesive repair patch kit sized for field repairs. For major damage, our 1-year warranty covers manufacturing defects and we will advise on the next step.' },
    { q: 'How do I clean it?', a: 'Wipe with a damp cloth and mild soap, then air-dry fully before packing. Do not machine wash, tumble dry or dry-clean.' },
    { q: 'What is the weight limit?', a: 'The DreamLite is rated to 150 kg. It is designed for solo sleepers up to 6 ft 3 in.' },
    { q: 'Is the fabric noisy?', a: 'The 40D Nylon TPU we use is chosen partly for its low crinkle. It is quieter than most ultralight mats, though not silent.' },
  ],
  ratingSummary: { average: 4.2, count: 78 }, // real, from amazon.co.uk/dp/B0BLS968D6
  amazonUrl: 'https://www.amazon.co.uk/dp/B0BLS968D6',
  meta: {
    title: 'DreamLite Ultralight Camping Mat & Pillow',
    description: 'The Rambler Peak DreamLite ultralight camping mat with integrated pillow. A 6 cm insulated sleeping mat, 590 g, R-value 2.5, packs to 21 × 11 cm. Free UK delivery over £30.',
  },
};

const pillow: Product = {
  slug: 'camping-pillow',
  name: 'Camping Pillow',
  shortName: 'Pillow',
  tagline: 'Inflatable ergonomic pillow with a secure strap.',
  price: gbp(9.99),
  stripePriceId: process.env.STRIPE_PRICE_PILLOW,
  hero: {
    eyebrow: 'Camping Pillow',
    headline: 'A BETTER NIGHT’S SLEEP OUTDOORS',
    sub: 'A curved, breathable pillow that straps to the DreamLite, or any standard sleeping mat.',
  },
  benefits: [
    { icon: 'disc-stack', title: 'Contoured ergonomic support', body: 'Curved baffles cradle head and neck without collapsing under weight.' },
    { icon: 'strap', title: 'Secure strap keeps it in place', body: 'The elastic strap loops around any standard mat so the pillow stays where you leave it.' },
    { icon: 'feather', title: '85 g packed', body: 'Lighter than a mobile phone. Packs to the size of a plum.' },
  ],
  specs: [
    { label: 'Inflated', value: '42 × 28 cm' },
    { label: 'Height', value: '10 cm' },
    { label: 'Weight', value: '85 g' },
    { label: 'Packed', value: '11 × 6 cm' },
    { label: 'Fabric', value: '40D Nylon TPU' },
    { label: 'Strap', value: 'Elastic loop' },
  ],
  longSpecs: [
    { label: 'Inflated dimensions', value: '42 × 28 × 10 cm' },
    { label: 'Packed dimensions', value: '11 × 6 cm' },
    { label: 'Weight', value: '85 g' },
    { label: 'Material', value: '40D Nylon with TPU coating' },
    { label: 'Baffle construction', value: 'Contoured ergonomic' },
    { label: 'Valve', value: 'Single-breath inflation valve' },
    { label: 'Strap', value: 'Elastic loop, fits mats up to 65 cm wide' },
    { label: 'Colour', value: 'Rambler Peak royal blue' },
    { label: 'Warranty', value: '1-year manufacturing warranty' },
  ],
  images: [
    { src: '/images/photos/pillow-inflate-moor.jpg', alt: 'The Camping Pillow inflated in a single breath on a Peak District edge', ratio: '1:1', label: 'PDP · GALLERY 1 · HERO 1:1' },
    { src: '/images/photos/pillow-strap-tent.jpg', alt: 'Close-up of the Camping Pillow strap and button fixing it to the mat', ratio: '1:1', label: 'PDP · GALLERY 2 · STRAP 1:1' },
    { src: '/images/photos/pillow-in-tent.jpg', alt: 'Camper resting on the Camping Pillow inside a tent on the moor', ratio: '1:1', label: 'PDP · GALLERY 3 · IN TENT 1:1' },
    { src: '/images/photos/studio-mat-pillow.jpg', alt: 'Camping Pillow beside the DreamLite sleeping mat on a white background', ratio: '1:1', label: 'PDP · GALLERY 4 · PAIR 1:1' },
  ],
  inTheBox: ['Camping Pillow', 'Repair patch', 'Ultralight stuff sack'],
  faqs: [
    { q: 'Does it fit my sleeping mat?', a: 'The elastic strap fits any mat up to 65 cm wide, including the DreamLite (58 cm) and most standard three-season mats.' },
    { q: 'How much air does it need?', a: 'A single deep breath fully inflates the pillow. Adjust firmness through the valve mid-night without deflating.' },
    { q: 'Is the fabric noisy?', a: 'The 40D Nylon TPU we use is chosen for a soft, quiet feel against skin.' },
    { q: 'How do I clean it?', a: 'Wipe with a damp cloth and mild soap. Do not machine wash or tumble dry.' },
    { q: 'What is covered by warranty?', a: 'Manufacturing defects for 12 months from purchase. Field damage is not covered but a repair patch is included.' },
  ],
  ratingSummary: null, // no standalone pillow reviews sourced yet — rating UI hides itself
  meta: {
    title: 'Inflatable Camping Pillow',
    description: 'Ultralight inflatable camping pillow with a secure strap that fits any mat. 85 g, one breath to inflate, packs to the size of a plum. Free UK delivery over £30.',
  },
};

export const products: Product[] = [dreamlite, pillow];

export const getProduct = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const formatPrice = (m: Money): string =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: m.currency }).format(m.amount / 100);
