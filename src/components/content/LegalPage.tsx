import type { ReactNode } from 'react';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';

type Block = { heading: string; body: ReactNode };

type Props = {
  title: string;
  updated: string;
  intro?: string;
  blocks: Block[];
};

export const LegalPage = ({ title, updated, intro, blocks }: Props) => (
  <Section tone="white" padding="md">
    <Container size="narrow">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-3 text-display-2 display-brand">{title}</h1>
      <p className="mt-3 text-caption text-rp-slate">Last updated: {updated}</p>
      {intro && <p className="mt-6 text-body-lg text-rp-slate max-w-prose">{intro}</p>}
      <div className="mt-12 space-y-10">
        {blocks.map((b) => (
          <section key={b.heading}>
            <h2 className="text-h2-brand display-brand">{b.heading}</h2>
            <div className="mt-3 space-y-4 text-body text-rp-slate max-w-prose">{b.body}</div>
          </section>
        ))}
      </div>
    </Container>
  </Section>
);
