# SEO checklist — ramblerpeak.com

The site-side work (schema, favicons, manifest, metadata, sitemap) is done in
code. This file lists the steps **only you can do**, plus what to expect.

## Done in code (for reference)

- Favicon set meeting Google's search guidelines: SVG + 192×192 PNG
  (48px-multiple) + 32/16 PNGs + `favicon.ico` + opaque `apple-touch-icon` +
  `site.webmanifest` with 192/512 icons and brand theme colour
- `Organization`, `WebSite`, `Product` (real price/availability/ratings only),
  `BreadcrumbList` and `FAQPage` JSON-LD
- Unique titles/descriptions, canonicals, OG + Twitter cards on every page
- Valid `sitemap.xml` (10 URLs) referenced from `robots.txt`; checkout pages
  noindexed; old product URL 308-redirects to the new slug

## Your manual steps

1. **Google Search Console** (property already verified)
   - [x] Submit `sitemap.xml`
   - [ ] Request indexing for `/`, `/shop`, `/products/dreamlite-camping-mat`,
     `/products/camping-pillow` (URL Inspection → Request Indexing)
   - [ ] Check back in ~1 week: Pages report should show the 10 sitemap URLs
     indexed and the old Shopify-era URLs dropping out

2. **Marketplace + social URLs for the entity graph** — wired into the
   Organization `sameAs` (and the footer social icons):
   - [x] Amazon storefront (amazon.co.uk/stores/RAMBLERPEAK)
   - [x] TikTok — @ramblerpeak
   - [x] Instagram — @ramblerpeak
   - [ ] eBay shop URL, if/when you have one

3. **Google Business Profile** — only if you want to appear for local
   searches; for a pure ecommerce brand it's optional. If The Paisley Group
   has a public trading address you're happy to list, create one at
   business.google.com; otherwise skip.

4. **Bing Webmaster Tools** (10 minutes, often forgotten) — bing.com/webmasters,
   import straight from Search Console, done. Bing powers DuckDuckGo results.

## What to expect, honestly

- **Favicon in Google results:** appears only after Google recrawls the
  homepage; typically **a few days to a few weeks**. Nothing further to do.
- **"rambler peak camping mat":** with the brand name + product terms now in
  the URL, title, H1 and schema, expect top placement for that branded query
  shortly after indexing. **Non-branded** terms ("ultralight camping mat uk")
  are competitive; that's a months-long content and backlinks game, not a
  code fix.
- The site-name shown beside the favicon comes from the `WebSite` schema +
  brand signals; Google decides, and it can lag the favicon.

## Content ideas that would realistically earn UK organic traffic

Each targets a real UK search intent the products can honestly serve.

| # | Target keyword | Suggested H1 | Angle |
|---|---|---|---|
| 1 | `best camping mat for wild camping uk` | The Best Camping Mats for Wild Camping in the UK (Tested) | Honest comparison incl. competitors; DreamLite positioned on weight/price. George's real hill-testing gives E-E-A-T. |
| 2 | `sleeping mat r value explained` | R-Values Explained: How Warm Does Your Sleeping Mat Need to Be? | Educational; captures researchers early. Links naturally to the 2.5 R-value DreamLite. |
| 3 | `wild camping peak district` | Wild Camping in the Peak District: A Local's Guide | The brand IS Peak District; founder photos from real Wainwright/gritstone trips. Strong topical authority play. |
| 4 | `how to sleep comfortably in a tent` | How to Actually Sleep Well in a Tent: 9 Fixes That Work | Problem-intent; mat + pillow are two of the fixes. High conversion relevance. |
| 5 | `camping mat vs self inflating mat` | Air Mat vs Self-Inflating Mat: Which Should You Carry? | Comparison-intent buyers close to purchase; honest trade-offs build trust. |

Suggested structure if/when you want these: a `/guides` section, one page per
topic, written in the existing brand voice, each internally linking to the two
product pages.
