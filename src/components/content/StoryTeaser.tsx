import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { ButtonLink } from '@/components/primitives/Button';
import { Reveal } from '@/components/primitives/Reveal';
import { PlaceholderImage } from '@/components/brand/PlaceholderImage';

export const StoryTeaser = () => (
  <Section tone="charcoal" padding="lg">
    <Container>
      <div className="grid gap-12 md:grid-cols-12 items-center">
        <Reveal className="md:col-span-6">
          <PlaceholderImage
            src="/images/photos/story-tent-reach.jpg"
            alt="A camper reaching into a tent pitched on Peak District moorland"
            ratio="4:5"
            tone="charcoal"
            rounded
          />
        </Reveal>
        <Reveal className="md:col-span-6 text-rp-white">
          <p className="eyebrow text-rp-white/70">Our story</p>
          <h2 className="mt-3 text-display-2 display-brand">Made small, made honest</h2>
          <p className="mt-6 text-body-lg text-rp-white/85 max-w-lg">
            Rambler Peak® is a small UK company from the Peak District. We build sleep kit
            for wild campers, backpackers and ramblers. Thoughtfully engineered, patiently
            tested and quiet by design.
          </p>
          <p className="mt-4 text-body-lg text-rp-white/85 max-w-lg">
            Here to rekindle humankind’s connection with the natural world.
          </p>
          <div className="mt-8">
            <ButtonLink href="/about" variant="ghost-light" size="lg">
              Read the story
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </Container>
  </Section>
);
