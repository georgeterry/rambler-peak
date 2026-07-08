# Rambler Peak® — ramblerpeak.com

Production ecommerce site for Rambler Peak, a UK outdoor gear brand from the Peak
District selling ultralight camping sleep systems.

Built with **Next.js 14 (App Router) · TypeScript · Tailwind CSS · Stripe Checkout**.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in keys (see below)
npm run dev                  # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

> **No Stripe key?** The site still works: `/api/checkout` detects the missing key
> and simulates a successful checkout redirect so the full basket → success flow
> can be exercised locally.

## Deploying to Vercel

1. Push this repo to GitHub.
2. `vercel` → import the repo. Zero config needed — Next.js is auto-detected.
3. Add the environment variables from `.env.example` in Vercel → Settings →
   Environment Variables (at minimum `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
   and `NEXT_PUBLIC_SITE_URL=https://www.ramblerpeak.com`).
4. Point the `ramblerpeak.com` domain at the project.

## Payments & orders (Stripe)

- **Checkout** — `POST /api/checkout` creates a Stripe Checkout Session (GBP).
  Free UK delivery over £30, otherwise a flat £3.95 tracked rate — computed
  from the basket subtotal. Without `STRIPE_SECRET_KEY` it simulates the
  redirect so the flow still works in dev.
- **Webhook** — `POST /api/webhooks/stripe` receives `checkout.session.completed`,
  verifies the Stripe signature, then calls `recordOrder()` and
  `sendOrderConfirmationEmail()` in [`src/lib/orders.ts`](src/lib/orders.ts).
  Both are idempotent-safe (Stripe can redeliver an event). `recordOrder()` is
  still a console-log stub — point it at your store of choice.

## Email (Resend)

Transactional email runs through [Resend](https://resend.com) in
[`src/lib/email.ts`](src/lib/email.ts), with branded HTML templates in
[`src/lib/email-templates.ts`](src/lib/email-templates.ts):

- **Order confirmation** — sent to the customer from the Stripe webhook.
- **Contact form** — `POST /api/contact` emails the support inbox with the
  sender set as `reply-to`, so replying goes straight back to the customer.

- **Order notification** — a copy of every order is emailed to `CONTACT_TO_EMAIL`
  from `recordOrder()`, giving a durable order log in your inbox with no database.
- **Newsletter** — `POST /api/newsletter` adds the address to a Resend Audience
  (`RESEND_AUDIENCE_ID`) and returns the welcome code so the form can show it.

Key-gated: with no `RESEND_API_KEY` every send becomes a no-op that logs, so dev
works without an email account. To go live:

1. Create a Resend account and **verify your sending domain** (ramblerpeak.com).
2. Create an Audience for the newsletter and copy its id.
3. Set `RESEND_API_KEY`, `EMAIL_FROM` (an address on the verified domain),
   `CONTACT_TO_EMAIL` and `RESEND_AUDIENCE_ID` in the environment.

### Welcome discount (RAMBLE10)

The newsletter promises 10% off the first order. The matching Stripe promotion
code is created by a script (idempotent, first-order-only):

```bash
node scripts/create-welcome-code.mjs   # uses whatever STRIPE_SECRET_KEY is set
```

Run it once with your **live** key before launch. Checkout already accepts
promotion codes, and the code string lives in `site.welcomeDiscountCode`.

**Testing the webhook locally** (needs the [Stripe CLI](https://stripe.com/docs/stripe-cli)):

```bash
stripe login
stripe listen --forward-to localhost:3100/api/webhooks/stripe
# copy the whsec_... it prints into STRIPE_WEBHOOK_SECRET in .env.local, restart dev
stripe trigger checkout.session.completed
```

**Going live:** create a webhook endpoint in the Stripe Dashboard pointing at
`https://www.ramblerpeak.com/api/webhooks/stripe`, subscribe it to
`checkout.session.completed` (plus the two `async_payment_*` events if you
enable delayed payment methods), and put its signing secret in
`STRIPE_WEBHOOK_SECRET`.

## Where everything lives

| What | Where |
|---|---|
| Products, prices, specs, PDP copy, FAQs | `src/data/products.ts` — single source of truth |
| Reviews (replace seeds with real ones) | `src/data/reviews.ts` |
| Support/FAQ page content | `src/data/faqs.ts` |
| Navigation (header + footer) | `src/data/nav.ts` |
| Site constants (domain, support email, company nos.) | `src/lib/seo.ts` |
| Brand colours / type scale | `tailwind.config.ts` + `src/app/globals.css` |
| Cart logic (context + localStorage) | `src/lib/cart.tsx` |
| Stripe checkout session | `src/app/api/checkout/route.ts` |
| Newsletter + contact endpoints (stubs) | `src/app/api/newsletter/route.ts`, `src/app/api/contact/route.ts` |
| Analytics event helper (GA4/Plausible-ready) | `src/lib/analytics.ts` |
| Icon set (inline SVG, stroke inherits) | `src/components/primitives/Icon.tsx` |
| Signature circular inset component | `src/components/brand/CircularInset.tsx` |

### Changing a price

Edit `price: gbp(79.99)` in `src/data/products.ts`. Every surface — cards, PDP,
basket, JSON-LD, Stripe line items — reads from there.

### Swapping to Shopify / Stripe Products later

Components never import product objects directly from the file; they use the
`products` array / `getProduct(slug)` accessors, so replacing the internals of
`src/data/products.ts` with an API call is contained to that one module.

## Imagery & film

The site runs on the **original photoshoot**, graded to the brand's cold-light
palette by `scripts/prepare-images.mjs` (sharp: desaturation + cool shift +
light contrast; studio shots stay neutral). Edit the `SHOTS` manifest in that
script and re-run to add or re-grade shots. The slot map lives in
`PLACEHOLDER_IMAGES.md`.

The one-minute film advert is served click-to-play from
`public/videos/dreamlite-film.mp4` via the `VideoBlock` component (homepage +
DreamLite PDP) — no autoplay, nothing downloads until the visitor presses play.

## Analytics

`src/lib/analytics.ts` exposes a typed `trackEvent()` already called on:
`view_item`, `add_to_cart`, `remove_from_cart`, `begin_checkout`,
`purchase_success`, `newsletter_signup`, `contact_submit`. It currently
forwards to `window.gtag` / `window.plausible` if present (and logs in dev) —
add your GA4/Plausible snippet in `src/app/layout.tsx` and events flow through.

## Accessibility & performance notes

- Focus states use the brand blue outline; drawer/accordions are keyboard-operable;
  cart updates announce via `aria-live`.
- Fade-up animations respect `prefers-reduced-motion`.
- Fonts load via `next/font` (no layout shift); hero image is `priority`,
  everything below the fold lazy-loads.
- Every page has a unique title/description, canonical URL, OG card;
  `sitemap.xml` and `robots.txt` are generated.
- Product pages emit `Product` + `Offer` + `AggregateRating` JSON-LD.

See `LAUNCH_CHECKLIST.md` before going live.
