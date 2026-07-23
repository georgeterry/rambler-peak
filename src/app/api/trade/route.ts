import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { contactNotificationEmail } from '@/lib/email-templates';
import { site } from '@/lib/seo';

// Trade / group order enquiries. Reuses the contact notification template with
// the organisation and quantity folded into the message body, and a subject
// line that makes trade enquiries easy to spot in the inbox.
// Contract: POST { name, organisation, email, phone?, quantity, message? } -> 200 | 4xx.
export async function POST(request: Request) {
  let p: {
    name: string;
    organisation: string;
    email: string;
    phone?: string;
    quantity: string;
    message?: string;
  };
  let honeypot: string;
  let renderedAt: number;
  try {
    const body = await request.json();
    p = {
      name: String(body?.name ?? '').trim(),
      organisation: String(body?.organisation ?? '').trim(),
      email: String(body?.email ?? '').trim(),
      phone: body?.phone ? String(body.phone).trim() : undefined,
      quantity: String(body?.quantity ?? '').trim(),
      message: body?.message ? String(body.message).trim() : undefined,
    };
    honeypot = String(body?.website ?? '').trim();
    renderedAt = Number(body?.renderedAt ?? 0);
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  // Bot deterrence: a filled honeypot or a submit faster than any human can
  // fill the form both mean a bot. Report success without sending so the bot
  // doesn't adapt and retry.
  if (honeypot || !renderedAt || Date.now() - renderedAt < 1500) {
    return NextResponse.json({ ok: true });
  }

  if (
    !p.name ||
    !p.organisation ||
    !p.quantity ||
    !/^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/.test(p.email)
  ) {
    return NextResponse.json(
      { error: 'Name, organisation, a valid email and a quantity are required' },
      { status: 422 },
    );
  }

  const composed = [
    `Organisation: ${p.organisation}`,
    p.phone ? `Phone: ${p.phone}` : null,
    `Quantity: ${p.quantity}`,
    '',
    p.message || '(no message)',
  ]
    .filter((l): l is string => l !== null)
    .join('\n');

  const { html, text } = contactNotificationEmail({
    name: p.name,
    email: p.email,
    message: composed,
  });

  const to = process.env.CONTACT_TO_EMAIL ?? site.supportEmail;
  const result = await sendEmail({
    to,
    subject: `Trade enquiry: ${p.organisation} (${p.quantity})`,
    html,
    text,
    replyTo: p.email,
  });

  if (!result.ok) {
    // eslint-disable-next-line no-console
    console.error('[trade] send failed:', result.error);
    return NextResponse.json({ error: 'Could not send your enquiry. Please email us directly.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
