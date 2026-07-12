import type { Metadata } from 'next';
import { LegalPage } from '@/components/content/LegalPage';
import { site } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Shipping & Returns',
  description:
    'UK shipping, 30-day returns and the 1-year Rambler Peak warranty, in plain English.',
  alternates: { canonical: '/shipping-returns' },
};

export default function ShippingReturnsPage() {
  return (
    <LegalPage
      title="Shipping & Returns"
      updated="12 July 2026"
      intro="The plain-English version: free UK delivery on every order, 30 days to change your mind, and a 1-year warranty we honour without a fight."
      blocks={[
        {
          heading: 'UK delivery',
          body: (
            <>
              <p>
                Every order ships free within the UK, sent by tracked Royal Mail.
              </p>
              <p>
                Order before 2 pm on a working day and we dispatch the same day. Typical
                delivery is 2 to 3 working days. You’ll get a tracking link by email the
                moment it leaves us.
              </p>
            </>
          ),
        },
        {
          heading: 'International delivery',
          body: (
            <p>
              We’re UK-only for now. Join the newsletter and you’ll be first to know when
              we open shipping to Ireland and Europe.
            </p>
          ),
        },
        {
          heading: '30-day returns',
          body: (
            <>
              <p>
                Changed your mind? Return any unused item in its original packaging within
                30 days of delivery for a full refund. Email {site.supportEmail} with your
                order number and we’ll send a returns label the same day.
              </p>
              <p>
                Return postage is deducted from the refund unless the item is faulty. If
                it’s faulty, the label is on us and we refund or replace, your choice.
              </p>
              <p>Refunds land within 5 working days of the return arriving back.</p>
            </>
          ),
        },
        {
          heading: '1-year warranty',
          body: (
            <>
              <p>
                Every Rambler Peak product is covered against manufacturing defects in
                seams, valves and materials for 12 months from purchase.
              </p>
              <p>
                Punctures from use aren’t manufacturing defects, which is why a repair
                patch kit ships in every box. If you’re unsure which yours is, send a
                photo. We err on the side of the customer.
              </p>
            </>
          ),
        },
        {
          heading: 'Something arrived damaged?',
          body: (
            <p>
              Email {site.supportEmail} within 48 hours of delivery with a photo and your
              order number. We’ll dispatch a replacement before you’ve packed the damaged
              one back up.
            </p>
          ),
        },
      ]}
    />
  );
}
