import type { Metadata } from 'next';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { ButtonLink } from '@/components/primitives/Button';

export const metadata: Metadata = {
  title: 'Checkout cancelled',
  robots: { index: false },
};

export default function CheckoutCancelledPage() {
  return (
    <Section tone="white" padding="lg" className="min-h-[70vh] flex items-center">
      <Container className="text-center">
        <p className="eyebrow">Checkout cancelled</p>
        <h1 className="mt-4 text-display-2 display-brand">No harm done</h1>
        <p className="mt-4 text-body-lg text-rp-slate max-w-lg mx-auto">
          Your basket is exactly as you left it. If something put you off, a question
          about sizing, delivery or anything else, we’re happy to help before you decide.
        </p>
        <div className="mt-10 flex justify-center gap-3">
          <ButtonLink href="/shop" size="lg">
            Back to the shop
          </ButtonLink>
          <ButtonLink href="/contact" size="lg" variant="ghost">
            Ask us first
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
