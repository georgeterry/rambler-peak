import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { site } from '@/lib/seo';

// Newsletter signup. Adds the contact to a Resend audience when configured
// (RESEND_API_KEY + RESEND_AUDIENCE_ID), otherwise logs so nothing breaks in
// dev. Returns the welcome discount code for the success message.
// Contract: POST { email, source } -> 200 { code } | 4xx.
export async function POST(request: Request) {
  let email = '';
  let source = 'unknown';
  try {
    const body = await request.json();
    email = String(body?.email ?? '').trim().toLowerCase();
    source = String(body?.source ?? 'unknown');
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Enter a valid email address' }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (apiKey && audienceId) {
    try {
      const resend = new Resend(apiKey);
      // Idempotent enough: Resend dedupes by email within an audience.
      await resend.contacts.create({ email, audienceId, unsubscribed: false });
    } catch (err) {
      // Don't fail the signup on a provider hiccup; log and still succeed so
      // the visitor gets their code. Surface for monitoring.
      // eslint-disable-next-line no-console
      console.error('[newsletter] Resend contact create failed:', err instanceof Error ? err.message : err);
    }
  } else {
    // eslint-disable-next-line no-console
    console.info(`[newsletter] signup (${source}) ${email} — RESEND_AUDIENCE_ID not set, not stored`);
  }

  return NextResponse.json({ ok: true, code: site.welcomeDiscountCode });
}
