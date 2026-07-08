import { Icon } from '@/components/primitives/Icon';
import { cn } from '@/lib/utils';

type FAQ = { q: string; a: string };
type Props = { items: FAQ[]; tone?: 'light' | 'dark'; className?: string; name?: string };

// Native <details> for progressive enhancement. In supported browsers the
// `name` attribute makes it behave as an accordion (only one open at a time).
export const FAQAccordion = ({ items, tone = 'dark', className, name = 'faq' }: Props) => (
  <div
    className={cn(
      'divide-y',
      tone === 'light' ? 'divide-white/15' : 'divide-rp-hairline',
      className,
    )}
  >
    {items.map((item, i) => (
      <details key={i} className="group py-6" name={name}>
        <summary
          className={cn(
            'flex items-start gap-4 cursor-pointer list-none focus-visible:outline-none',
            tone === 'light' ? 'text-rp-white' : 'text-rp-charcoal',
          )}
        >
          <span className="text-subhead flex-1">{item.q}</span>
          <Icon
            name="chevron-down"
            className="h-5 w-5 mt-1 transition-transform group-open:rotate-180"
            strokeWidth={1.5}
            aria-hidden
          />
        </summary>
        <div
          className={cn(
            'mt-4 max-w-prose text-body',
            tone === 'light' ? 'text-rp-white/85' : 'text-rp-slate',
          )}
        >
          {item.a}
        </div>
      </details>
    ))}
  </div>
);
