'use client';

import { useState, type FormEvent } from 'react';
import { Input, Textarea, Label } from '@/components/primitives/Input';
import { Button } from '@/components/primitives/Button';
import { trackEvent } from '@/lib/analytics';

export const ContactForm = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      trackEvent({ name: 'contact_submit', has_order_number: Boolean(data.orderNumber) });
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
          <Label htmlFor="contact-name">Name</Label>
          <Input id="contact-name" name="name" required autoComplete="name" />
        </div>
        <div>
          <Label htmlFor="contact-email">Email</Label>
          <Input id="contact-email" name="email" type="email" required autoComplete="email" />
        </div>
      </div>
      <div>
        <Label htmlFor="contact-order">Order number (optional)</Label>
        <Input id="contact-order" name="orderNumber" placeholder="e.g. RP-10248" />
      </div>
      <div>
        <Label htmlFor="contact-message">Message</Label>
        <Textarea id="contact-message" name="message" required />
      </div>
      <Button type="submit" size="lg" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending…' : 'Send message'}
      </Button>
      {status === 'ok' && (
        <p className="text-body text-rp-blue">
          Thanks, we’ve got it. Expect a reply within one working day.
        </p>
      )}
      {status === 'error' && (
        <p className="text-body text-rp-rust">
          That didn’t send. Check the fields and try again, or email us directly.
        </p>
      )}
    </form>
  );
};
