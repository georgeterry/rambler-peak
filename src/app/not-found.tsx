import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { ButtonLink } from '@/components/primitives/Button';
import { Icon } from '@/components/primitives/Icon';

export default function NotFound() {
  return (
    <Section tone="charcoal" padding="lg" className="min-h-[70vh] flex items-center">
      <Container className="text-center">
        <Icon name="peak" className="h-14 w-14 text-rp-blue mx-auto" />
        <p className="mt-8 eyebrow text-rp-white/60">404 · Page not found</p>
        <h1 className="mt-4 text-display-1 display-brand text-rp-white">
          You’ve wandered off the trail
        </h1>
        <p className="mt-6 text-body-lg text-rp-white/80 max-w-lg mx-auto">
          The page you’re after has either moved or never existed. The path back is well
          waymarked.
        </p>
        <div className="mt-10 flex justify-center gap-3">
          <ButtonLink href="/shop" size="lg">
            Back to the shop
          </ButtonLink>
          <ButtonLink href="/" size="lg" variant="ghost-light">
            Home
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
