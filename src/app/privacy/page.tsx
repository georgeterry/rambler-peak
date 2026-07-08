import type { Metadata } from 'next';
import { LegalPage } from '@/components/content/LegalPage';
import { site, legalIdentity } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Rambler Peak collects, uses and protects your personal data.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="2 July 2026"
      intro="We collect the minimum we need to sell you good kit and support it afterwards. We never sell your data."
      blocks={[
        {
          heading: 'Who we are',
          body: (
            <p>
              {legalIdentity()} Data questions: {site.supportEmail}.
            </p>
          ),
        },
        {
          heading: 'What we collect',
          body: (
            <>
              <p>
                <strong>Orders:</strong> name, email, delivery address and order history.
                Payment details are handled entirely by Stripe, so card numbers never
                touch our servers.
              </p>
              <p>
                <strong>Newsletter:</strong> your email address and, over time, which
                emails you open, so we can send fewer and better ones.
              </p>
              <p>
                <strong>Support:</strong> whatever you include in messages to us, kept for
                as long as the conversation stays useful.
              </p>
            </>
          ),
        },
        {
          heading: 'What we use it for',
          body: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Fulfilling and delivering your order (contractual necessity)</li>
              <li>Warranty and returns support (contractual necessity)</li>
              <li>The newsletter, only if you opted in (consent, withdraw any time)</li>
              <li>Anonymous, aggregated site analytics (legitimate interest)</li>
            </ul>
          ),
        },
        {
          heading: 'Who we share it with',
          body: (
            <p>
              Only processors needed to run the shop: Stripe (payments), Royal Mail
              (delivery), our email provider (newsletter and receipts) and our hosting
              provider. Each is bound by their own GDPR-compliant terms. We never sell or
              rent personal data.
            </p>
          ),
        },
        {
          heading: 'How long we keep it',
          body: (
            <p>
              Order records: 6 years (UK tax law). Newsletter data: until you unsubscribe.
              Support threads: 2 years after the last message.
            </p>
          ),
        },
        {
          heading: 'Your rights',
          body: (
            <p>
              Under UK GDPR you can request access, correction, deletion or portability of
              your data, and object to or restrict processing. Email {site.supportEmail}{' '}
              and we respond within 30 days. Complaints can also go to the ICO
              (ico.org.uk).
            </p>
          ),
        },
        {
          heading: 'Cookies',
          body: (
            <p>
              We use essential cookies for the basket and, if you consent, lightweight
              analytics to understand which pages help people. No advertising trackers.
            </p>
          ),
        },
      ]}
    />
  );
}
