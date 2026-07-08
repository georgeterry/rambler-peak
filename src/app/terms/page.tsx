import type { Metadata } from 'next';
import { LegalPage } from '@/components/content/LegalPage';
import { legalIdentity } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'The terms that govern purchases from ramblerpeak.com.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="2 July 2026"
      intro="The short version: we sell you kit at the price shown, deliver it promptly, and honour your statutory rights in full. The longer version follows."
      blocks={[
        {
          heading: 'About us',
          body: <p>ramblerpeak.com is operated by {legalIdentity()}</p>,
        },
        {
          heading: 'Orders and payment',
          body: (
            <>
              <p>
                Prices are shown in pounds sterling and include VAT. Payment is taken at
                checkout via Stripe. An order is accepted when we email dispatch
                confirmation; until then we may decline or refund an order (for example,
                a pricing error or stock issue).
              </p>
              <p>
                If we discover a genuine pricing error before dispatch, we’ll contact you
                with the correct price and you can confirm or cancel with a full refund.
              </p>
            </>
          ),
        },
        {
          heading: 'Delivery',
          body: (
            <p>
              Delivery estimates are set out on our Shipping & Returns page. Risk passes
              to you on delivery; title passes when payment clears.
            </p>
          ),
        },
        {
          heading: 'Cancellation and returns',
          body: (
            <p>
              Under the Consumer Contracts Regulations 2013 you may cancel within 14 days
              of delivery without giving a reason; we voluntarily extend this to 30 days
              as set out in our Shipping & Returns policy. Your statutory rights under the
              Consumer Rights Act 2015 are unaffected.
            </p>
          ),
        },
        {
          heading: 'Warranty',
          body: (
            <p>
              Our 1-year warranty against manufacturing defects is in addition to, and
              does not limit, your statutory rights.
            </p>
          ),
        },
        {
          heading: 'Liability',
          body: (
            <p>
              Nothing in these terms limits liability for death or personal injury caused
              by negligence, fraud, or anything else that cannot be limited under English
              law. Otherwise our liability is limited to the price paid for the products.
            </p>
          ),
        },
        {
          heading: 'Intellectual property',
          body: (
            <p>
              Rambler Peak® is a registered trade mark. Content on this site may not be
              reproduced commercially without written permission.
            </p>
          ),
        },
        {
          heading: 'Law and jurisdiction',
          body: (
            <p>
              These terms are governed by the law of England and Wales, and disputes are
              subject to the non-exclusive jurisdiction of its courts.
            </p>
          ),
        },
      ]}
    />
  );
}
