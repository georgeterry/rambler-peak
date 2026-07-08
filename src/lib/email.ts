import { Resend } from 'resend';

// Transactional email via Resend. Server-side only. Key-gated: with no
// RESEND_API_KEY the app runs fine and email sends become no-ops that log,
// so the whole order/contact flow works in dev without an email account.

const resend = (() => {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
})();

export const isEmailConfigured = () => Boolean(process.env.RESEND_API_KEY);

// Sender must be an address on a domain you've verified in Resend.
// e.g. EMAIL_FROM="Rambler Peak <hello@ramblerpeak.com>"
const FROM = process.env.EMAIL_FROM ?? 'Rambler Peak <hello@ramblerpeak.com>';

export type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
};

type SendResult = { ok: true; id: string | null } | { ok: false; error: string };

export async function sendEmail({
  to,
  subject,
  html,
  text,
  replyTo,
}: SendEmailInput): Promise<SendResult> {
  if (!resend) {
    // eslint-disable-next-line no-console
    console.info(`[email] RESEND_API_KEY not set — would send "${subject}" to ${Array.isArray(to) ? to.join(', ') : to}`);
    return { ok: true, id: null };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM,
      to,
      subject,
      html,
      text,
      ...(replyTo ? { replyTo } : {}),
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true, id: data?.id ?? null };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'unknown error' };
  }
}
