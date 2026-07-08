import { cn } from '@/lib/utils';

type Row = { label: string; value: string };
type Props = { rows: Row[]; className?: string };

export const SpecTable = ({ rows, className }: Props) => (
  <table className={cn('w-full border-collapse', className)}>
    <caption className="sr-only">Full specification</caption>
    <tbody>
      {rows.map((r, i) => (
        <tr key={i} className="border-b border-rp-hairline align-top">
          <th
            scope="row"
            className="py-4 pr-4 text-left text-eyebrow uppercase text-rp-slate w-1/3"
          >
            {r.label}
          </th>
          <td className="py-4 text-body text-rp-charcoal">{r.value}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
