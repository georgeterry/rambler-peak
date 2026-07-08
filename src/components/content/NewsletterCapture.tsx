'use client';

import { useState, type FormEvent } from 'react';
import { Input } from '@/components/primitives/Input';
import { Button } from '@/components/primitives/Button';
import { trackEvent } from '@/lib/analytics';
import { site } from '@/lib/seo';
import { cn } from '@/lib/utils';

type Props = {
  source?: string;
  tone?: 'light' | 'dark';
  className?: string;
  heading?: string;
  sub?: string;
};

export const NewsletterCapture = ({
  source = 'homepage',
  tone = 'dark',
  className,
  heading = 'JOIN THE RAMBLE',
  sub = 'Get 10% off your first order, and word from us when new kit lands.',
}: Props) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const [code, setCode] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json().catch(() => ({}));
      trackEvent({ name: 'newsletter_signup', source });
      setCode(typeof data?.code === 'string' ? data.code : null);
      setStatus('ok');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className={cn(tone === 'light' ? 'text-rp-white' : 'text-rp-charcoal', className)}>
      <h2 className="text-h1-brand display-brand">{heading}</h2>
      <p
        className={cn(
          'mt-3 text-body-lg max-w-lg',
          tone === 'light' ? 'text-rp-white/80' : 'text-rp-slate',
        )}
      >
        {sub}
      </p>
      <form
        onSubmit={submit}
        className="mt-6 flex flex-col sm:flex-row gap-3 max-w-lg"
        aria-live="polite"
      >
        <Input
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
          className={cn(
            'flex-1',
            tone === 'light' &&
              'bg-white/10 border-white/25 text-rp-white placeholder:text-rp-white/50',
          )}
        />
        <Button type="submit" disabled={status === 'loading'} size="lg">
          {status === 'loading' ? 'Signing up…' : 'Sign up'}
        </Button>
      </form>
      {status === 'ok' && (
        <p
          className={cn(
            'mt-4 text-caption',
            tone === 'light' ? 'text-rp-white/85' : 'text-rp-blue',
          )}
        >
          {code ? (
            <>
              You&rsquo;re in. Use code{' '}
              <span className="font-semibold tracking-headline">{code}</span> for{' '}
              {site.welcomeDiscountPercent}% off your first order.
            </>
          ) : (
            'Thanks. Check your inbox for your discount code.'
          )}
        </p>
      )}
      {status === 'error' && (
        <p className="mt-4 text-caption text-rp-rust">
          Something went wrong. Try again in a moment.
        </p>
      )}
      <p
        className={cn(
          'mt-4 text-caption',
          tone === 'light' ? 'text-rp-white/60' : 'text-rp-slate',
        )}
      >
        One email a month. Unsubscribe any time.
      </p>
    </div>
  );
};
