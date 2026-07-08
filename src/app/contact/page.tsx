import type { Metadata } from 'next';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { Reveal } from '@/components/primitives/Reveal';
import { SectionHeading } from '@/components/content/SectionHeading';
import { ContactForm } from './ContactForm';
import { site } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Rambler Peak for questions, warranty claims or plain advice. We reply within one working day.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <Section tone="white" padding="md">
      <Container>
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <SectionHeading
              eyebrow="Contact"
              title="Talk to us"
              sub="Questions, warranty claims, or advice on your first wild camp. A person replies, not a bot."
              size="lg"
              as="h1"
            />
            <dl className="mt-10 space-y-6">
              <div>
                <dt className="text-eyebrow uppercase text-rp-slate">Email</dt>
                <dd className="mt-1 text-body-lg">
                  <a href={`mailto:${site.supportEmail}`} className="link-underline">
                    {site.supportEmail}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-eyebrow uppercase text-rp-slate">Response time</dt>
                <dd className="mt-1 text-body-lg text-rp-slate">Within one working day</dd>
              </div>
              <div>
                <dt className="text-eyebrow uppercase text-rp-slate">Based in</dt>
                <dd className="mt-1 text-body-lg text-rp-slate">The Peak District, UK</dd>
              </div>
            </dl>
          </Reveal>
          <Reveal className="md:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
