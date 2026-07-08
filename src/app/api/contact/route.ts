import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { contactNotificationEmail } from '@/lib/email-templates';
import { site } from '@/lib/seo';

// Contact endpoint. Forwards submissions to the support inbox via Resend, with
// reply-to set to the sender so a reply goes straight back to them.
// Contract: POST { name, email, orderNumber?, message } -> 200 | 4xx.
export async function POST(request: Request) {
  let payload: { name: string; email: string; orderNumber?: string; message: string };
  try {
    const body = await request.json();
    payload = {
      name: String(body?.name ?? '').trim(),
      email: String(body?.email ?? '').trim(),
      orderNumber: body?.orderNumber ? String(body.orderNumber).trim() : undefined,
      message: String(body?.message ?? '').trim(),
    };
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  if (!payload.name || !payload.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return NextResponse.json(
      { error: 'Name, a valid email and a message are required' },
      { status: 422 },
    );
  }

  const to = process.env.CONTACT_TO_EMAIL ?? site.supportEmail;
  const { subject, html, text } = contactNotificationEmail(payload);
  const result = await sendEmail({ to, subject, html, text, replyTo: payload.email });

  if (!result.ok) {
    // eslint-disable-next-line no-console
    console.error('[contact] send failed:', result.error);
    return NextResponse.json({ error: 'Could not send your message. Please try again.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
