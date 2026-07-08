# Launch checklist — ramblerpeak.com

## 1. Stripe (blocking)
- [ ] Create the two products in the Stripe dashboard (or rely on inline `price_data` — already wired)
- [ ] Set `STRIPE_SECRET_KEY` (live key) in Vercel env vars
- [ ] Optionally set `STRIPE_PRICE_DREAMLITE` / `STRIPE_PRICE_PILLOW` to dashboard price IDs
- [ ] Place a real test order end-to-end (test mode first, then a £-live smoke test + refund)
- [x] Webhook handler built (`/api/webhooks/stripe`): verifies signature, records order, queues confirmation email. Verified in test mode.
- [ ] Create the live webhook endpoint in the Stripe Dashboard → `https://www.ramblerpeak.com/api/webhooks/stripe`, subscribe to `checkout.session.completed`, and put its signing secret in `STRIPE_WEBHOOK_SECRET` (Vercel env)
- [ ] Wire `recordOrder()` + `sendOrderConfirmationEmail()` in `src/lib/orders.ts` to a real store + email provider (currently console-log stubs)

## 2. Domain & hosting (blocking)
- [ ] Deploy to Vercel, add `ramblerpeak.com` + `www.ramblerpeak.com`
- [ ] Set `NEXT_PUBLIC_SITE_URL=https://www.ramblerpeak.com`
- [ ] Verify `https://www.ramblerpeak.com/sitemap.xml` and `/robots.txt` resolve
- [ ] Submit the sitemap in Google Search Console

## 3. Legal copy (blocking)
- [x] Business identity set: The Paisley Group Limited, trading as Rambler Peak (`businessType: 'ltd'`, `legalEntityName` in `src/lib/seo.ts`). Legal pages + footer now use it; no broken placeholder tokens.
- [ ] **Paste the two remaining fields in `src/lib/seo.ts`** (both on the Companies House record): `companyNumber` and `registeredAddress`. Add `vatNumber` if VAT registered. They auto-slot into /privacy, /terms and the footer.
- [ ] Have someone qualified skim `/privacy`, `/terms`, `/shipping-returns` — sensible UK-law placeholders, not legal advice
- [ ] Confirm the shipping promises (2 pm same-day dispatch, £3.95 under £30, 2–3 days) match reality

## 4. Reviews (honesty check)
- [ ] The seeded reviews in `src/data/reviews.ts` are **fictional placeholders** — replace with real customer reviews before launch, or empty the array (the sections hide gracefully)
- [ ] Same for `ratingSummary` per product in `src/data/products.ts` — set to real numbers or remove (JSON-LD adapts)

## 5. Email plumbing (all wired — just needs keys)
- [x] Order confirmation, **order owner-notification** (durable order log to your inbox), and contact form all wired through Resend (`src/lib/email.ts` + templates). Verified in dev.
- [x] Newsletter signups add to a Resend Audience; success message shows the **RAMBLE10** code. Verified.
- [x] **RAMBLE10** 10%-off promo code created in Stripe (test mode) via `scripts/create-welcome-code.mjs`, first-order-only. `allow_promotion_codes` already on at checkout.
- [ ] Create a Resend account, **verify the ramblerpeak.com sending domain**, create an Audience, then set `RESEND_API_KEY` + `EMAIL_FROM` + `CONTACT_TO_EMAIL` + `RESEND_AUDIENCE_ID` in Vercel env
- [ ] Re-run `node scripts/create-welcome-code.mjs` with your **live** Stripe key to create RAMBLE10 in live mode
- [ ] (Optional) Point `recordOrder()` at a queryable store (DB/Sheet) if inbox + Stripe dashboard aren't enough

## 6. Imagery & film
- [ ] Site now runs on the graded photoshoot — see `PLACEHOLDER_IMAGES.md` for the slot map and the two remaining nice-to-haves (pillow studio shot, designed OG card)
- [ ] The film is served as a 75 MB progressive MP4 (click-to-play). Fine to launch; before pushing paid traffic, re-encode to ~15–20 MB with ffmpeg (CRF 23) or move to Mux/Vimeo and swap the `src` in the two `VideoBlock` usages

## 7. Analytics
- [ ] Add GA4 or Plausible snippet to `src/app/layout.tsx`; events already fire via `src/lib/analytics.ts`
- [ ] Add a cookie notice if you enable analytics with cookies (Plausible needs none)

## 8. Pre-flight QA
- [ ] `npm run build` passes clean
- [ ] Lighthouse ≥ 90 on / , /products/dreamlite-sleeping-mat, /shop (mobile)
- [ ] Test basket persistence across refresh, checkout success + cancelled paths
- [ ] Keyboard-only walk: nav → PDP → add to basket → drawer → checkout
- [ ] Screen-reader sanity pass on the PDP buy box and cart drawer
