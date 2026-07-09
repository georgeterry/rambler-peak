import type { Order } from '@/lib/orders';
import { site } from '@/lib/seo';

// Email-safe HTML: table layout, inline styles, web-safe font stack (Poppins
// won't load in mail clients). Brand palette hard-coded here on purpose — this
// is the one place hex-in-markup is unavoidable, since email has no CSS vars.
const BLUE = '#2E6BE0';
const CHARCOAL = '#1E242B';
const SLATE = '#5A6672';
const MIST = '#E9EDF0';
const HAIRLINE = '#DADFE4';
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

const money = (pence: number, currency: string) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency }).format(pence / 100);

// Human-friendly order reference derived from the Stripe session id. Stable
// (same id -> same ref) and short enough to read out. The full session id is
// kept on the owner's copy so orders can still be looked up in Stripe.
export const orderReference = (order: Order): string =>
  `RP-${order.id.replace(/[^a-zA-Z0-9]/g, '').slice(-8).toUpperCase()}`;

const shell = (bodyInner: string) => `
<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${MIST};font-family:${FONT};color:${CHARCOAL};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${MIST};padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid ${HAIRLINE};">
        <tr><td style="background:${CHARCOAL};padding:22px 32px;">
          <img src="${site.url}/logos/wordmark-white.png" alt="Rambler Peak" width="176" height="16" style="display:block;width:176px;height:auto;border:0;outline:none;text-decoration:none;" />
        </td></tr>
        ${bodyInner}
        <tr><td style="padding:24px 32px;background:${CHARCOAL};">
          <p style="margin:0;color:rgba(255,255,255,0.7);font-size:12px;line-height:1.6;">
            Here to rekindle humankind&rsquo;s connection with the natural world.<br>
            Designed in the Peak District, UK &middot; <a href="${site.url}" style="color:rgba(255,255,255,0.85);">ramblerpeak.com</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

export function orderConfirmationEmail(order: Order): { subject: string; html: string; text: string } {
  const rows = order.lines
    .map(
      (l) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid ${HAIRLINE};font-size:15px;">
          <strong style="font-weight:600;">${l.description}</strong>
          <span style="color:${SLATE};"> &times; ${l.quantity}</span>
        </td>
        <td align="right" style="padding:12px 0;border-bottom:1px solid ${HAIRLINE};font-size:15px;white-space:nowrap;">
          ${money(l.amountPence, order.currency)}
        </td>
      </tr>`,
    )
    .join('');

  const ship = order.shipping;
  const shippingBlock = ship
    ? `
      <p style="margin:24px 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:${SLATE};">Delivering to</p>
      <p style="margin:0;font-size:15px;line-height:1.6;">
        ${[ship.name, ship.line1, ship.line2, ship.city, ship.postcode, ship.country]
          .filter(Boolean)
          .join('<br>')}
      </p>`
    : '';

  const firstName = order.name?.split(' ')[0] ?? 'there';
  const reference = orderReference(order);

  const html = shell(`
    <tr><td style="padding:32px 32px 8px;">
      <h1 style="margin:0 0 8px;font-size:24px;font-weight:600;letter-spacing:0.02em;text-transform:uppercase;">See you on the hills</h1>
      <p style="margin:0;font-size:15px;line-height:1.65;color:${SLATE};">
        Thanks, ${firstName}. Your order is confirmed and being prepared. Orders placed before 2&nbsp;pm on a working day are dispatched the same day, with tracked UK delivery in 2 to 3 working days.
      </p>
    </td></tr>
    <tr><td style="padding:16px 32px 0;">
      <p style="margin:0 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:${SLATE};">Order reference</p>
      <p style="margin:0 0 16px;font-size:16px;font-weight:600;letter-spacing:0.04em;color:${CHARCOAL};">${reference}</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${rows}
        <tr>
          <td style="padding:16px 0 0;font-size:16px;font-weight:600;">Total paid</td>
          <td align="right" style="padding:16px 0 0;font-size:16px;font-weight:600;color:${BLUE};">${money(order.amountTotalPence, order.currency)}</td>
        </tr>
      </table>
      ${shippingBlock}
    </td></tr>
    <tr><td style="padding:24px 32px 32px;">
      <a href="${site.url}/support" style="display:inline-block;background:${BLUE};color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;padding:14px 28px;border-radius:8px;">Read the care guide</a>
    </td></tr>
  `);

  const text = [
    `See you on the hills`,
    ``,
    `Thanks, ${firstName}. Your order is confirmed.`,
    `Order reference: ${reference}`,
    ``,
    ...order.lines.map((l) => `${l.quantity} x ${l.description}  ${money(l.amountPence, order.currency)}`),
    `Total paid: ${money(order.amountTotalPence, order.currency)}`,
    ship
      ? `\nDelivering to:\n${[ship.name, ship.line1, ship.line2, ship.city, ship.postcode, ship.country].filter(Boolean).join('\n')}`
      : '',
    ``,
    `Rambler Peak — ${site.url}`,
  ].join('\n');

  return { subject: `Your Rambler Peak order is confirmed`, html, text };
}

// Internal notification to the shop owner on every paid order. Doubles as a
// durable order log in the inbox until a real order store is wired up.
export function orderOwnerNotificationEmail(order: Order): { subject: string; html: string; text: string } {
  const rows = order.lines
    .map(
      (l) => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid ${HAIRLINE};font-size:14px;">${l.quantity} &times; ${l.description}</td>
        <td align="right" style="padding:8px 0;border-bottom:1px solid ${HAIRLINE};font-size:14px;">${money(l.amountPence, order.currency)}</td>
      </tr>`,
    )
    .join('');

  const ship = order.shipping;
  const shipText = ship
    ? [ship.name, ship.line1, ship.line2, ship.city, ship.postcode, ship.country].filter(Boolean).join(', ')
    : 'No shipping address';

  const reference = orderReference(order);

  const html = shell(`
    <tr><td style="padding:32px;">
      <h1 style="margin:0 0 4px;font-size:20px;font-weight:600;letter-spacing:0.02em;text-transform:uppercase;">New order &middot; ${money(order.amountTotalPence, order.currency)}</h1>
      <p style="margin:0 0 2px;font-size:15px;font-weight:600;letter-spacing:0.04em;color:${CHARCOAL};">${reference}</p>
      <p style="margin:0 0 20px;font-size:12px;color:${SLATE};font-family:monospace;">${order.id}</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.6;margin-bottom:16px;">
        <tr><td style="padding:4px 0;color:${SLATE};width:120px;">Customer</td><td style="padding:4px 0;">${order.name ?? '—'}</td></tr>
        <tr><td style="padding:4px 0;color:${SLATE};">Email</td><td style="padding:4px 0;"><a href="mailto:${order.email ?? ''}" style="color:${BLUE};">${order.email ?? '—'}</a></td></tr>
        <tr><td style="padding:4px 0;color:${SLATE};vertical-align:top;">Ship to</td><td style="padding:4px 0;">${shipText}</td></tr>
      </table>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${rows}
        <tr><td style="padding:12px 0 0;font-size:15px;font-weight:600;">Total</td><td align="right" style="padding:12px 0 0;font-size:15px;font-weight:600;color:${BLUE};">${money(order.amountTotalPence, order.currency)}</td></tr>
      </table>
    </td></tr>
  `);

  const text = [
    `New order — ${money(order.amountTotalPence, order.currency)}`,
    `Reference: ${reference}`,
    `Stripe session: ${order.id}`,
    `Customer: ${order.name ?? '—'} <${order.email ?? '—'}>`,
    `Ship to: ${shipText}`,
    ``,
    ...order.lines.map((l) => `${l.quantity} x ${l.description}  ${money(l.amountPence, order.currency)}`),
    `Total: ${money(order.amountTotalPence, order.currency)}`,
  ].join('\n');

  return { subject: `New order — ${money(order.amountTotalPence, order.currency)} — ${order.name ?? order.email ?? order.id}`, html, text };
}

export function contactNotificationEmail(input: {
  name: string;
  email: string;
  orderNumber?: string;
  message: string;
}): { subject: string; html: string; text: string } {
  const html = shell(`
    <tr><td style="padding:32px;">
      <h1 style="margin:0 0 16px;font-size:20px;font-weight:600;letter-spacing:0.02em;text-transform:uppercase;">New contact message</h1>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px;line-height:1.6;">
        <tr><td style="padding:6px 0;color:${SLATE};width:120px;">Name</td><td style="padding:6px 0;">${input.name}</td></tr>
        <tr><td style="padding:6px 0;color:${SLATE};">Email</td><td style="padding:6px 0;"><a href="mailto:${input.email}" style="color:${BLUE};">${input.email}</a></td></tr>
        ${input.orderNumber ? `<tr><td style="padding:6px 0;color:${SLATE};">Order no.</td><td style="padding:6px 0;">${input.orderNumber}</td></tr>` : ''}
      </table>
      <p style="margin:20px 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:${SLATE};">Message</p>
      <p style="margin:0;font-size:15px;line-height:1.65;white-space:pre-wrap;">${escapeHtml(input.message)}</p>
    </td></tr>
  `);

  const text = [
    `New contact message`,
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    input.orderNumber ? `Order no.: ${input.orderNumber}` : '',
    ``,
    input.message,
  ]
    .filter((l) => l !== '')
    .join('\n');

  return { subject: `Contact form: ${input.name}`, html, text };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
