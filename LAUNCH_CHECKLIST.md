# Launch checklist — ramblerpeak.com

## ✅ LAUNCHED

Rambler Peak went live at **https://www.ramblerpeak.com** on 8 July 2026.
Verified end-to-end with a real live order: payment captured, order confirmation
+ owner-notification emails delivered, order in the Stripe live dashboard.

- [x] Deployed to Vercel from `github.com/georgeterry/rambler-peak` (auto-deploys on push to `main`)
- [x] Domain live with SSL; apex `ramblerpeak.com` 308-redirects to `www`
- [x] iCloud email (MX + SPF) preserved through the DNS cutover; Resend sending domain verified
- [x] Live Stripe key set; checkout creates real `cs_live` sessions
- [x] Live Stripe webhook (`/api/webhooks/stripe`) created, signing secret in Vercel, signature verification confirmed
- [x] Resend live: order confirmation, owner notification, contact form, newsletter → Audience
- [x] `RAMBLE10` 10%-off first-order promo code live in Stripe
- [x] Legal identity complete: The Paisley Group Limited (13985948), 4 Ganton Way, Grantham, NG31 9FD, trading as Rambler Peak
- [x] Real reviews (37, from the Amazon listing) on the DreamLite PDP; pillow rating hidden until it has its own
- [x] `NEXT_PUBLIC_SITE_URL` set — canonical/OG/sitemap all use the real domain

## Post-launch — worth doing soon

- [ ] **Submit the sitemap** in Google Search Console (`https://www.ramblerpeak.com/sitemap.xml`) so Google indexes you
- [ ] **VAT number** — add to `src/lib/seo.ts` (`vatNumber`) if/when VAT registered; it auto-appears on the legal pages
- [ ] **Legal review** — have someone qualified skim `/privacy`, `/terms`, `/shipping-returns` (sensible UK-law defaults, not legal advice)
- [ ] **Confirm the shipping promises** match reality (2 pm same-day dispatch, £3.95 under £30, 2–3 days)
- [ ] **Analytics** — add a GA4 or Plausible snippet to `src/app/layout.tsx`; events already fire via `src/lib/analytics.ts` (add a cookie notice if the tool uses cookies)

## Post-launch — nice to have

- [ ] **Pillow studio shot** on white for the pillow PDP gallery slide 1 (see `PLACEHOLDER_IMAGES.md`)
- [ ] **Designed OG card** (1200×630 with wordmark + tagline) — currently the graded hero photo
- [ ] **Shrink the film** — 75 MB MP4 (click-to-play, so only loads on demand). Before heavy paid traffic, re-encode to ~15–20 MB (ffmpeg CRF 23) or host on Mux/Vimeo and swap the `src` in the two `VideoBlock` usages
- [ ] **Queryable order store** — `recordOrder()` emails you every order (durable log in the inbox); add a DB/Sheet upsert there if you want to query orders outside Stripe

## How to make changes now

Edit locally, then `git push` — Vercel auto-deploys `main` in ~1 minute.
Prices/specs/copy live in `src/data/products.ts`; reviews in `src/data/reviews.ts`.
Run `node scripts/prepare-images.mjs` after adding photos to the manifest.
