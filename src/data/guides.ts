// Long-form guides targeting UK outdoor search intent. Content lives here as
// typed blocks so the article template stays dumb and the copy stays greppable.
// Paragraphs support [text](href) links only — no raw HTML ever renders.

export type GuideBlock =
  | { t: 'p'; md: string }
  | { t: 'h2'; text: string }
  | { t: 'h3'; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'callout'; md: string }
  | { t: 'table'; head: string[]; rows: string[][] };

export type Guide = {
  slug: string;
  title: string;              // meta title (template appends " | Rambler Peak")
  h1: string;
  description: string;        // meta description
  publishedAt: string;        // ISO date
  hero: { src: string; alt: string };
  blocks: GuideBlock[];
  related: string[];          // other guide slugs
};

export const guides: Guide[] = [
  // -------------------------------------------------------------------------
  {
    slug: 'best-camping-mat-wild-camping-uk',
    title: 'The Best Camping Mat for Wild Camping in the UK',
    h1: 'The best camping mat for wild camping in the UK',
    description:
      'What actually matters in a wild camping mat: weight, packed size, R-value and durability, compared honestly across budget, mid-range and premium options for UK conditions.',
    publishedAt: '2026-07-11',
    hero: {
      src: '/images/photos/hero-gritstone-edge.jpg',
      alt: 'Two wild campers sat on a camping mat on a gritstone edge above a misty UK valley',
    },
    blocks: [
      {
        t: 'callout',
        md: 'Full disclosure before you read on: we make a camping mat, so we are biased. This guide sets out what genuinely matters so you can judge any mat, including ours, on the same terms.',
      },
      {
        t: 'p',
        md: 'Wild camping in the UK asks more of a mat than a campsite ever will. You carry everything on your back, the ground is rarely flat, spring and autumn nights sit close to freezing, and there is no car boot to retreat to. The right mat is the difference between a night you remember fondly and a 3 am vow never to do this again.',
      },
      { t: 'h2', text: 'The four numbers that matter' },
      {
        t: 'p',
        md: 'Ignore the marketing photos and read four figures on any spec sheet: weight, packed size, R-value and thickness.',
      },
      {
        t: 'ul',
        items: [
          '**Weight.** Under 600 g is genuinely ultralight for an insulated air mat. Over 900 g you will feel it on a long walk in.',
          '**Packed size.** Anything that packs smaller than a 1-litre bottle disappears into a 35 L pack. Bulky mats end up strapped outside, catching wind and rain.',
          '**R-value.** The insulation rating. Around 2 to 3 covers UK spring to autumn; 4 or more is winter territory. See our [R-values guide](/guides/sleeping-mat-r-value-explained) for the full picture.',
          '**Thickness.** 5 cm or more keeps hips and shoulders off the ground for side sleepers. Thin foam mats transmit every stone.',
        ],
      },
      { t: 'h2', text: 'The market, honestly summarised' },
      {
        t: 'p',
        md: 'Camping mats cluster into four camps, and each one is the right answer for somebody.',
      },
      {
        t: 'table',
        head: ['Type', 'Typical weight', 'Typical price', 'Best for'],
        rows: [
          ['Premium ultralight air', 'around 350 to 500 g', 'often £150 to £220', 'Gram counters and winter campers'],
          ['Mid-range insulated air', 'around 500 to 700 g', 'roughly £25 to £80', 'Most UK three-season wild campers'],
          ['Self-inflating', 'around 700 g to 1.5 kg', 'roughly £30 to £120', 'Car campers who value simplicity'],
          ['Closed-cell foam', 'around 300 to 500 g', 'roughly £15 to £40', 'Bombproof backup or summer minimalists'],
        ],
      },
      {
        t: 'p',
        md: 'The premium American brands earn their reputation: mats like the Therm-a-Rest NeoAir range weigh around 350 g with winter-grade R-values. If you camp year-round including snow, that is where your money should go. The honest question for everyone else is whether you need winter insulation for three-season use, because that is mostly what the extra £150 buys.',
      },
      { t: 'h2', text: 'Where ours fits' },
      {
        t: 'p',
        md: 'The [DreamLite camping mat](/products/dreamlite-camping-mat) sits deliberately in the mid-range camp: 590 g, packs to 21 × 11 cm, 6 cm thick, R-value 2.5, with an [inflatable pillow](/products/camping-pillow) included rather than sold separately. It is designed for exactly the trips most UK wild campers actually do: spring to autumn nights on hills, moors and coast paths.',
      },
      {
        t: 'p',
        md: 'We will not pretend it is the mat for a January summit camp; at R 2.5 it is not. What we will say is that buyers on Amazon rate it 4.2 out of 5 across 78 ratings, several of them side sleepers and larger campers, and you can [read every review](https://www.amazon.co.uk/dp/B0BLS968D6) including the critical ones before deciding.',
      },
      { t: 'h2', text: 'The checklist before you buy' },
      {
        t: 'ul',
        items: [
          'Match the R-value to your coldest planned night, not your average one.',
          'Check the packed size against your actual rucksack, not the marketing photo.',
          'If you sleep on your side, treat 5 cm thickness as the floor.',
          'A repair kit in the box matters more than it seems. Gritstone and hawthorn do not care what you paid.',
          'Read the negative reviews of anything you shortlist. Patterns matter; one-offs do not.',
        ],
      },
      {
        t: 'p',
        md: 'Whatever you choose, buy once, look after it and get outside. The mat is only ever the means; the night on the hill is the point.',
      },
    ],
    related: ['sleeping-mat-r-value-explained', 'air-mat-vs-self-inflating-mat'],
  },

  // -------------------------------------------------------------------------
  {
    slug: 'sleeping-mat-r-value-explained',
    title: 'Sleeping Mat R-Values Explained',
    h1: 'R-values explained: how warm does your sleeping mat need to be',
    description:
      'What a sleeping mat R-value actually measures, which rating you need for UK spring, summer, autumn and winter, and why the ground steals more heat than the air.',
    publishedAt: '2026-07-11',
    hero: {
      src: '/images/photos/moorland-tent.jpg',
      alt: 'A tent pitched on cold heather moorland with a camping mat visible in the porch',
    },
    blocks: [
      {
        t: 'p',
        md: 'Most people buy a sleeping bag for the cold and a mat for the comfort. That is backwards. On a cold night the ground takes heat from you faster than the air does, and no sleeping bag can stop it, because your body weight crushes the insulation beneath you flat. The mat is your insulation from below, and R-value is how it is measured.',
      },
      { t: 'h2', text: 'What R-value actually measures' },
      {
        t: 'p',
        md: 'R-value is thermal resistance: how well the mat slows heat moving from your warm body to the cold ground. Higher is warmer. Since 2020 most reputable brands test to a common standard (ASTM F3340), which means numbers are broadly comparable between brands, something that was not true a decade ago.',
      },
      {
        t: 'p',
        md: 'The scale is roughly linear, and mats stack: a foam mat of R 1 under an air mat of R 2.5 gives you about R 3.5. That trick is the cheapest winter upgrade in camping.',
      },
      { t: 'h2', text: 'What you need for UK conditions' },
      {
        t: 'table',
        head: ['R-value', 'Ground conditions', 'UK use'],
        rows: [
          ['1 to 2', 'Mild ground, roughly 10 °C and above', 'Summer valley and campsite nights'],
          ['2 to 4', 'Cold ground, around 0 to 10 °C', 'Spring to autumn hills and moors'],
          ['4 to 6', 'Near or below freezing', 'UK winter, frosty summits'],
          ['6+', 'Frozen ground and snow', 'Winter mountaineering, alpine use'],
        ],
      },
      {
        t: 'p',
        md: 'For the trips most UK campers do, spring to autumn, an R-value between 2 and 3 is the sweet spot: warm enough for near-freezing ground without paying and carrying for winter insulation you rarely use. That is why the [DreamLite](/products/dreamlite-camping-mat) is rated R 2.5.',
      },
      { t: 'h2', text: 'Three things the number does not tell you' },
      {
        t: 'ul',
        items: [
          '**You might sleep colder than the chart.** Cold sleepers, smaller builds and anyone sleeping tired and underfed should add a margin of about 1.',
          '**Wind and wet change everything.** R-value assumes a mat working as designed. A soaked bag or a draughty pitch will overwhelm any rating; pitch well first.',
          '**Comfort is separate.** R-value says nothing about thickness or stability. A warm mat you roll off is still a bad night.',
        ],
      },
      { t: 'h2', text: 'The short version' },
      {
        t: 'p',
        md: 'Buy for your coldest realistic night. In the UK, three-season campers are well served around R 2.5; winter campers should look at R 4 and up or stack a foam mat underneath. And if you are choosing between a warmer mat and a warmer bag, remember which direction the cold comes from: below.',
      },
    ],
    related: ['best-camping-mat-wild-camping-uk', 'how-to-sleep-comfortably-in-a-tent'],
  },

  // -------------------------------------------------------------------------
  {
    slug: 'wild-camping-peak-district',
    title: 'Wild Camping in the Peak District: A Local Guide',
    h1: 'Wild camping in the Peak District: a local guide',
    description:
      'The law, the etiquette and the practicalities of wild camping in the Peak District, written by a brand that tests its kit on these hills.',
    publishedAt: '2026-07-11',
    hero: {
      src: '/images/photos/band-forest-unroll.jpg',
      alt: 'A camper unrolling a camping mat beside a tent below a Peak District plantation',
    },
    blocks: [
      {
        t: 'p',
        md: 'Rambler Peak is based on the edge of the Peak District. It is where our kit gets tested and where most of our photography is shot, so this guide is written from the ground, not from a search results page. It starts with the part most guides bury: the law.',
      },
      { t: 'h2', text: 'The legal position, plainly' },
      {
        t: 'p',
        md: 'In England there is no general right to wild camp. That includes the whole of the Peak District. Legally, camping on land without the landowner’s permission is trespass. The well-known exception is parts of Dartmoor, where a backpack camping right exists; Scotland is different again, with a broad right of responsible access. Neither applies here.',
      },
      {
        t: 'p',
        md: 'In practice, a quiet tradition of responsible wild camping exists on the high moors, tolerated rather than permitted, and it survives only because most people who do it are close to invisible. If you want to be fully within the law, ask the landowner, or use one of the area’s many small campsites and plan big hill days from there.',
      },
      { t: 'h2', text: 'The conventions that keep the tradition alive' },
      {
        t: 'ul',
        items: [
          'Arrive late, leave early. Pitch at dusk, be packed by mid-morning, and you were never there.',
          'Stay high and away from roads, farms, reservoirs and popular paths. Wild camping is a hill activity, not a layby one.',
          'One or two small tents, one night, then move on. Groups and repeat pitches are how spots get ruined.',
          'No fires, ever. Peat moorland burns underground for weeks, and the Peak has lost too much to careless flames. A stove is fine; a fire is not.',
          'Leave nothing. Carry out every scrap including food waste, and bury nothing.',
          'If asked to move on, move on politely. The tradition survives on goodwill.',
        ],
      },
      { t: 'h2', text: 'Where the tradition lives' },
      {
        t: 'p',
        md: 'We deliberately do not publish pitch locations; naming spots is how they die. What we will say is that the high gritstone moors of the Dark Peak, the plateau country around Kinder and Bleaklow and the quieter eastern moors, are where the tradition has always lived. Study the map, pick somewhere flat, drained and legal to reach on foot, and keep it to yourself.',
      },
      { t: 'h2', text: 'Kit for a Peak District night' },
      {
        t: 'p',
        md: 'Peak District ground is cold and damp for most of the year, and the weather turns fast. The kit list is short but non-negotiable.',
      },
      {
        t: 'ul',
        items: [
          'A tent or bivvy that handles wind. The moors are exposed and gusts arrive without notice.',
          'An insulated mat, R-value 2 or above. Cold ground is the number one cause of miserable nights up here; our [R-value guide](/guides/sleeping-mat-r-value-explained) explains why.',
          'A three-season bag, plus a dry base layer kept sacred for sleeping.',
          'Water for the night carried in. High pitches rarely have a clean source.',
          'A head torch, a paper map and the sense to check the forecast twice.',
        ],
      },
      {
        t: 'p',
        md: 'Our own [DreamLite mat](/products/dreamlite-camping-mat) and [camping pillow](/products/camping-pillow) were shaped by exactly these nights: light enough to carry up, warm enough for gritstone, small enough to vanish into a pack.',
      },
      { t: 'h2', text: 'The point of it' },
      {
        t: 'p',
        md: 'Done properly, a night on the high moors is the best thing the Peak District offers: the crowds gone, the light long, the morning yours alone. Do it quietly, do it responsibly, and leave the hill exactly as you found it so the tradition outlives all of us.',
      },
    ],
    related: ['how-to-sleep-comfortably-in-a-tent', 'best-camping-mat-wild-camping-uk'],
  },

  // -------------------------------------------------------------------------
  {
    slug: 'how-to-sleep-comfortably-in-a-tent',
    title: 'How to Sleep Comfortably in a Tent: 9 Fixes',
    h1: 'How to sleep comfortably in a tent: nine fixes that work',
    description:
      'Nine practical fixes for bad nights under canvas, from pitch choice and ground insulation to pillows, condensation and the 3 am wake-up.',
    publishedAt: '2026-07-11',
    hero: {
      src: '/images/photos/asleep-in-tent.jpg',
      alt: 'A camper asleep in a tent on a camping mat with a sleeping bag',
    },
    blocks: [
      {
        t: 'p',
        md: 'Nobody sleeps badly in a tent because of the tent. They sleep badly because of the ground, the cold, the damp, the noise or the pillow made of rolled-up jeans. All of those are fixable, most of them cheaply. Here are the nine fixes that actually move the needle, in the order we would apply them.',
      },
      { t: 'h2', text: '1. Pick the pitch like it matters' },
      {
        t: 'p',
        md: 'Five minutes of pitch choice beats fifty pounds of kit. You want flat or very slightly sloped ground with your head uphill, natural wind shelter, and no hollow that will pool water if it rains. Lie down on the spot before you pitch; your hip will find the rock your eyes missed.',
      },
      { t: 'h2', text: '2. Insulate from the ground, not just the air' },
      {
        t: 'p',
        md: 'The ground steals heat faster than the air. If you are cold at night, the answer is usually beneath you: a mat with a proper R-value, around 2 to 3 for UK three-season nights. Our [R-value guide](/guides/sleeping-mat-r-value-explained) covers the numbers.',
      },
      { t: 'h2', text: '3. Get thickness under your hips' },
      {
        t: 'p',
        md: 'Side sleepers need 5 cm or more of mat, or the hip grinds through to the ground by 2 am. The [DreamLite](/products/dreamlite-camping-mat) runs 6 cm with contoured baffles for exactly this reason.',
      },
      { t: 'h2', text: '4. Bring a real pillow' },
      {
        t: 'p',
        md: 'The bundled-fleece pillow is the most common self-inflicted injury in camping. An [inflatable pillow](/products/camping-pillow) weighs 85 g, packs to plum size and holds your neck at the same angle it enjoys at home. Strap it to the mat so it stays put when you turn.',
      },
      { t: 'h2', text: '5. Sleep in dry layers, never damp ones' },
      {
        t: 'p',
        md: 'Keep one base layer and a pair of socks sacred: they live in the bag and are worn only for sleeping. Damp clothing, even slightly damp from the walk in, will chill you all night no matter how good the bag is.',
      },
      { t: 'h2', text: '6. Vent the tent before you sleep' },
      {
        t: 'p',
        md: 'Condensation is not a leak; it is your own breath. Crack the vents even on cold nights and keep your bag off the tent walls. A slightly cooler, dry tent sleeps far better than a sealed damp one.',
      },
      { t: 'h2', text: '7. Deal with noise before it deals with you' },
      {
        t: 'p',
        md: 'Flysheets flap and hills are noisy in wind. Guy the tent out properly so nothing rattles, then carry foam earplugs weighing nothing. First-night noise anxiety is the most common reason new campers sleep badly, and it costs about a pound to fix.',
      },
      { t: 'h2', text: '8. Eat and drink for the night ahead' },
      {
        t: 'p',
        md: 'A warm meal within a couple of hours of sleep gives your body fuel to heat itself, and caffeine after mid-afternoon works exactly as badly outdoors as it does at home. Take a small water bottle into the tent so the 3 am thirst does not require an expedition.',
      },
      { t: 'h2', text: '9. Warm the bag, not just yourself' },
      {
        t: 'p',
        md: 'If a cold night is forecast, boil water, fill a leakproof bottle, wrap it in a sock and put it in the bag ten minutes before you get in. Old trick, still unbeaten.',
      },
      { t: 'h2', text: 'The pattern behind all nine' },
      {
        t: 'p',
        md: 'Every fix above deals with ground, damp, cold or noise. Solve those four and the tent itself almost does not matter. Most people can transform their nights outdoors for less than the price of a restaurant meal, and the first two fixes cost nothing at all.',
      },
    ],
    related: ['sleeping-mat-r-value-explained', 'wild-camping-peak-district'],
  },

  // -------------------------------------------------------------------------
  {
    slug: 'air-mat-vs-self-inflating-mat',
    title: 'Air Mat vs Self-Inflating Mat: Which to Carry',
    h1: 'Air mat vs self-inflating mat: which should you carry',
    description:
      'The honest trade-offs between air mats and self-inflating mats: weight, packed size, comfort, warmth, durability and faff, and who each type genuinely suits.',
    publishedAt: '2026-07-11',
    hero: {
      src: '/images/photos/roll-on-gritstone.jpg',
      alt: 'A camping mat being rolled tightly on a gritstone slab ready for packing',
    },
    blocks: [
      {
        t: 'p',
        md: 'Walk into any outdoor shop and the mat wall splits two ways: air mats you blow up, and self-inflating mats that do most of the work themselves. Each camp has loyalists who think the other lot are mad. Here is the honest version of the trade-offs, and who each type genuinely suits.',
      },
      { t: 'h2', text: 'How each one works' },
      {
        t: 'p',
        md: 'An **air mat** is a shaped air chamber: everything, comfort and warmth included, comes from the air you put in and any insulation bonded inside. A **self-inflating mat** bonds open-cell foam inside an airtight shell; open the valve and the foam expands, drawing air in on its own, with a few breaths to finish.',
      },
      { t: 'h2', text: 'The trade-offs, side by side' },
      {
        t: 'table',
        head: ['', 'Air mat', 'Self-inflating'],
        rows: [
          ['Weight', 'Lighter, often 350 to 700 g', 'Heavier, often 700 g to 1.5 kg'],
          ['Packed size', 'Bottle-sized', 'Loaf-sized or larger'],
          ['Thickness', 'Typically 5 to 10 cm', 'Typically 2.5 to 5 cm'],
          ['Setup', 'Roughly 10 to 20 breaths or a pump', 'Mostly automatic, a minute or two'],
          ['Puncture risk', 'Higher stakes: flat means flat', 'Softer failure: the foam still insulates'],
          ['Price for the weight', 'Better £ per gram saved', 'Better £ per faff avoided'],
        ],
      },
      { t: 'h2', text: 'Choose an air mat if' },
      {
        t: 'ul',
        items: [
          'You carry your kit any real distance. The weight and pack-size gap is decisive on your back.',
          'You sleep on your side. Air mats offer thickness self-inflating designs cannot match.',
          'You are happy to spend twelve breaths at bedtime and carry the repair patch that comes in the box.',
        ],
      },
      { t: 'h2', text: 'Choose a self-inflating mat if' },
      {
        t: 'ul',
        items: [
          'The car does the carrying: campsites, festivals, van life.',
          'You want the most idiot-proof option to hand a child or a first-timer.',
          'You would rather accept bulk than ever think about inflation at all.',
        ],
      },
      { t: 'h2', text: 'Our position, openly biased' },
      {
        t: 'p',
        md: 'We make an air mat, because for the walking-in camper the maths is hard to argue with: the [DreamLite](/products/dreamlite-camping-mat) gives 6 cm of insulated thickness at 590 g and packs to 21 × 11 cm, numbers no self-inflating design can reach. It inflates in about twelve breaths and ships with a repair kit for the honest weakness of the category.',
      },
      {
        t: 'p',
        md: 'But if your camping is car-to-pitch, a self-inflating mat is a perfectly good answer and we would rather you bought the right type than our type. The wrong mat for your trips is a bad mat, whoever makes it.',
      },
    ],
    related: ['best-camping-mat-wild-camping-uk', 'sleeping-mat-r-value-explained'],
  },
];

export const getGuide = (slug: string): Guide | undefined =>
  guides.find((g) => g.slug === slug);

// Rough reading time from the word count of all text blocks.
export const readingTime = (guide: Guide): number => {
  const words = guide.blocks
    .map((b) => {
      if (b.t === 'p' || b.t === 'callout') return b.md;
      if (b.t === 'h2' || b.t === 'h3') return b.text;
      if (b.t === 'ul') return b.items.join(' ');
      if (b.t === 'table') return b.rows.flat().join(' ');
      return '';
    })
    .join(' ')
    .split(/\s+/).length;
  return Math.max(2, Math.round(words / 220));
};
