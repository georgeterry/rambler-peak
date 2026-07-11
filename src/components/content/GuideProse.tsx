import Link from 'next/link';
import { Fragment, type ReactNode } from 'react';
import type { GuideBlock } from '@/data/guides';
import { cn } from '@/lib/utils';

// Renders guide blocks. Inline syntax is deliberately tiny: [text](href) and
// **bold**. Everything is parsed to React nodes — no HTML injection path.
const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;
const BOLD_RE = /\*\*([^*]+)\*\*/g;

const renderBold = (text: string, keyBase: string): ReactNode[] =>
  text.split(BOLD_RE).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={`${keyBase}-b${i}`} className="font-semibold text-rp-charcoal">
        {part}
      </strong>
    ) : (
      <Fragment key={`${keyBase}-t${i}`}>{part}</Fragment>
    ),
  );

const renderInline = (md: string): ReactNode[] => {
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  const re = new RegExp(LINK_RE);
  let i = 0;
  while ((match = re.exec(md)) !== null) {
    if (match.index > last) nodes.push(...renderBold(md.slice(last, match.index), `pre${i}`));
    const [, label, href] = match;
    nodes.push(
      href.startsWith('/') ? (
        <Link key={`l${i}`} href={href} className="link-underline">
          {label}
        </Link>
      ) : (
        <a key={`l${i}`} href={href} target="_blank" rel="noopener noreferrer" className="link-underline">
          {label}
        </a>
      ),
    );
    last = match.index + match[0].length;
    i += 1;
  }
  if (last < md.length) nodes.push(...renderBold(md.slice(last), 'tail'));
  return nodes;
};

export const GuideProse = ({ blocks }: { blocks: GuideBlock[] }) => (
  <div className="space-y-6">
    {blocks.map((block, i) => {
      switch (block.t) {
        case 'h2':
          return (
            <h2 key={i} className="text-h1-brand display-brand pt-6">
              {block.text}
            </h2>
          );
        case 'h3':
          return (
            <h3 key={i} className="text-h2-brand display-brand pt-2">
              {block.text}
            </h3>
          );
        case 'p':
          return (
            <p key={i} className="text-body-lg text-rp-slate max-w-prose">
              {renderInline(block.md)}
            </p>
          );
        case 'callout':
          return (
            <aside
              key={i}
              className="border-l-4 border-rp-blue bg-rp-mist rounded-r px-6 py-5 text-body-lg text-rp-charcoal max-w-prose"
            >
              {renderInline(block.md)}
            </aside>
          );
        case 'ul':
          return (
            <ul key={i} className="space-y-3 max-w-prose">
              {block.items.map((item, j) => (
                <li key={j} className="flex gap-3 text-body-lg text-rp-slate">
                  <span className="mt-[0.7em] h-1.5 w-1.5 rounded-full bg-rp-blue shrink-0" aria-hidden />
                  <span>{renderInline(item)}</span>
                </li>
              ))}
            </ul>
          );
        case 'table':
          return (
            <div key={i} className="overflow-x-auto -mx-1 px-1">
              <table className="w-full min-w-[560px] border-collapse text-body">
                <thead>
                  <tr>
                    {block.head.map((h, j) => (
                      <th
                        key={j}
                        scope="col"
                        className="text-left text-eyebrow uppercase text-rp-slate py-3 pr-4 border-b border-rp-charcoal/20"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, j) => (
                    <tr key={j} className="border-b border-rp-hairline align-top">
                      {row.map((cell, k) => (
                        <td
                          key={k}
                          className={cn('py-3 pr-4', k === 0 ? 'font-medium text-rp-charcoal' : 'text-rp-slate')}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        default:
          return null;
      }
    })}
  </div>
);
