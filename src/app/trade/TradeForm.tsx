'use client';

import { useState, type FormEvent } from 'react';
import { Input, Textarea, Label } from '@/components/primitives/Input';
import { Button } from '@/components/primitives/Button';

const QUANTITIES = ['20 to 39 units', '40 to 99 units', '100+ units', 'Not sure yet'] as const;

export const TradeForm = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch('/api/trade', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus('ok');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={submit} className="space-y-6" aria-live="polite">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="trade-name">Your name</Label>
          <Input id="trade-name" name="name" required autoComplete="name" />
        </div>
        <div>
          <Label htmlFor="trade-org">Organisation</Label>
          <Input
            id="trade-org"
            name="organisation"
            required
            placeholder="School, provider, shop or club"
          />
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="trade-email">Email</Label>
          <Input id="trade-email" name="email" type="email" required autoComplete="email" />
        </div>
        <div>
          <Label htmlFor="trade-phone">Phone (optional)</Label>
          <Input id="trade-phone" name="phone" type="tel" autoComplete="tel" />
        </div>
      </div>
      <div>
        <Label htmlFor="trade-quantity">Quantity you have in mind</Label>
        <select
          id="trade-quantity"
          name="quantity"
          required
          defaultValue=""
          className="block w-full rounded border border-rp-hairline bg-rp-white px-4 py-3 text-body text-rp-charcoal focus:border-rp-blue focus:outline-none focus:ring-2 focus:ring-rp-blue/25"
        >
          <option value="" disabled>
            Select a range
          </option>
          {QUANTITIES.map((q) => (
            <option key={q} value={q}>
              {q}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="trade-message">Anything we should know? (optional)</Label>
        <Textarea
          id="trade-message"
          name="message"
          placeholder="Timescales, delivery address, whether you would like a sample first"
        />
      </div>
      <Button type="submit" size="lg" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending…' : 'Send enquiry'}
      </Button>
      {status === 'ok' && (
        <p className="text-body text-rp-blue">
          Thanks, we have it. George will reply within one working day.
        </p>
      )}
      {status === 'error' && (
        <p className="text-body text-rp-rust">
          That did not send. Try again, or email hello@ramblerpeak.com directly.
        </p>
      )}
    </form>
  );
};
