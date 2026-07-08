import type { Metadata } from 'next';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { ButtonLink } from '@/components/primitives/Button';
import { Icon } from '@/components/primitives/Icon';
import { PostCheckout } from './PostCheckout';

export const metadata: Metadata = {
  title: 'Order confirmed',
  robots: { index: false },
};

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  return (
    <Section tone="white" padding="lg" className="min-h-[70vh] flex items-center">
      <Container className="text-center">
        <span className="inline-flex h-16 w-16 rounded-full bg-rp-blue items-center justify-center">
          <Icon name="check" className="h-8 w-8 text-rp-white" strokeWidth={2.2} />
        </span>
        <h1 className="mt-8 text-display-2 display-brand">See you on the hills</h1>
        <p className="mt-4 text-body-lg text-rp-slate max-w-lg mx-auto">
          Your order is confirmed. A receipt is on its way to your inbox, and a dispatch
          email with tracking will follow, same day if you ordered before 2 pm.
        </p>
        <div className="mt-10 flex justify-center gap-3">
          <ButtonLink href="/support" size="lg" variant="ghost">
            Read the care guide
          </ButtonLink>
          <ButtonLink href="/" size="lg">
            Back home
          </ButtonLink>
        </div>
        <PostCheckout sessionId={searchParams.session_id} />
      </Container>
    </Section>
  );
}
