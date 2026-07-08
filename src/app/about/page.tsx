import type { Metadata } from 'next';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { Reveal } from '@/components/primitives/Reveal';
import { SectionHeading } from '@/components/content/SectionHeading';
import { PlaceholderImage } from '@/components/brand/PlaceholderImage';
import { TrustBadgeStrip } from '@/components/brand/TrustBadgeStrip';
import { ButtonLink } from '@/components/primitives/Button';

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'Rambler Peak is a small UK company from the Peak District, making thoughtfully engineered sleep systems for wild campers, backpackers and ramblers.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <Section tone="charcoal" padding="lg">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Our story"
              title="From the Peak District, for everywhere wild"
              sub="Here to rekindle humankind’s connection with the natural world."
              tone="light"
              size="lg"
              as="h1"
            />
          </Reveal>
        </Container>
      </Section>

      <Section tone="white" padding="md">
        <Container>
          <div className="grid gap-12 md:grid-cols-12 items-center">
            <Reveal className="md:col-span-6">
              <PlaceholderImage
                src="/images/photos/unroll-on-moor.jpg"
                alt="A rambler unrolling the DreamLite on heather moorland above a wide Peak District valley"
                ratio="4:5"
                rounded
              />
            </Reveal>
            <Reveal className="md:col-span-6">
              <h2 className="text-h1-brand display-brand">Made small, made honest</h2>
              <div className="mt-6 space-y-5 text-body-lg text-rp-slate max-w-prose">
                <p>
                  Rambler Peak® started the way most decent ideas do: on a damp hillside,
                  wide awake at three in the morning on a mat that had given up an hour
                  after we had. We live on the edge of the Peak District. The gritstone
                  edges, the mist, the moorland. This is where we walk, camp and test.
                </p>
                <p>
                  We are a small UK company, and we like it that way. Small means every
                  product gets obsessed over. The DreamLite went through eleven baffle
                  layouts before the curve felt right. The pillow strap was redesigned
                  three times because it slipped once.
                </p>
                <p>
                  We make gear for wild campers, backpackers and ramblers, people who
                  measure a good weekend in miles walked and stars seen, not things
                  bought. Our kit should disappear into your pack, then quietly give you
                  the best night you’ve ever had on a hill.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="mist" padding="md">
        <Container>
          <div className="grid gap-10 md:grid-cols-3">
            <Reveal>
              <h3 className="text-h2-brand display-brand">Thoughtful engineering</h3>
              <p className="mt-3 text-body text-rp-slate">
                Every spec earns its place. 590 g because grams matter on mile twelve.
                An R-value of 2.5 because British springs are colder than they look.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h3 className="text-h2-brand display-brand">Tested on the hills</h3>
              <p className="mt-3 text-body text-rp-slate">
                Kinder Scout, Stanage Edge, the Great Ridge. If a product survives a
                Peak District season, it will look after you anywhere.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <h3 className="text-h2-brand display-brand">Honest by default</h3>
              <p className="mt-3 text-body text-rp-slate">
                Plain numbers, no inflated claims. 30-day returns and a 1-year warranty,
                because we stand behind what leaves the workshop.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="white" padding="md">
        <Container>
          <div className="grid gap-12 md:grid-cols-12 items-center">
            <Reveal className="md:col-span-7 md:order-1 order-2">
              <h2 className="text-h1-brand display-brand">Meet George</h2>
              <div className="mt-6 space-y-5 text-body-lg text-rp-slate max-w-prose">
                <p>
                  That is George on Dow Crag, holding up seven fingers for his seventh
                  Wainwright of the day, fresh off the Old Man of Coniston. It was taken
                  on the kind of day Rambler Peak exists for: long miles, big views and
                  no rush to be anywhere else.
                </p>
                <p>
                  George started Rambler Peak because decent sleep kit seemed to come in
                  two flavours. Heavy and cheap, or ultralight and eye-wateringly
                  expensive. He wanted a mat he could carry all day, trust all night and
                  afford without wincing. When he could not find one, he built it.
                </p>
                <p>
                  He still tests every product himself, on the hills that shaped the
                  brand. If it survives his idea of a good weekend, it earns its place
                  in the range.
                </p>
              </div>
            </Reveal>
            <Reveal className="md:col-span-5 md:order-2 order-1">
              <PlaceholderImage
                src="/images/photos/founder-dow-crag.jpg"
                alt="George, founder of Rambler Peak, sat on the summit rocks of Dow Crag holding up seven fingers for his seventh Wainwright of the day"
                ratio="3:4"
                rounded
                imgClassName="object-[center_35%]"
              />
              <p className="mt-3 text-caption text-rp-slate">
                Dow Crag, the Lake District. Wainwright number seven of the day.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="mist" padding="md">
        <Container>
          <Reveal className="text-center max-w-2xl mx-auto">
            <h2 className="text-display-2 display-brand">Come ramble with us</h2>
            <p className="mt-4 text-body-lg text-rp-slate">
              The best way to understand the kit is a night under a big sky.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <ButtonLink href="/shop" size="lg">
                Shop the range
              </ButtonLink>
              <ButtonLink href="/support" size="lg" variant="ghost">
                Talk to us
              </ButtonLink>
            </div>
          </Reveal>
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
