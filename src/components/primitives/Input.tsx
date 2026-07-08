import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

const inputBase =
  'block w-full rounded border border-rp-hairline bg-rp-white px-4 py-3 text-body text-rp-charcoal placeholder:text-rp-slate/70 focus:border-rp-blue focus:outline-none focus:ring-2 focus:ring-rp-blue/25 transition-colors';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...rest }, ref) => (
    <input ref={ref} className={cn(inputBase, className)} {...rest} />
  ),
);
Input.displayName = 'Input';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...rest }, ref) => (
    <textarea ref={ref} className={cn(inputBase, 'min-h-[140px] resize-y', className)} {...rest} />
  ),
);
Textarea.displayName = 'Textarea';

type LabelProps = { htmlFor: string; children: ReactNode; className?: string };

export const Label = ({ htmlFor, children, className }: LabelProps) => (
  <label htmlFor={htmlFor} className={cn('block mb-2 text-eyebrow uppercase text-rp-slate', className)}>
    {children}
  </label>
);
