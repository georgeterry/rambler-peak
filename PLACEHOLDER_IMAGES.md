# Imagery manifest

The site now runs on the **original photoshoot** (graded to the brand's
cold-light palette) plus the film advert. Nothing is blocking launch. This file
documents what's where and the few remaining nice-to-haves.

## Pipeline

Selected originals are pulled from the photoshoot folder, graded (gentle
desaturation, cool white-balance shift, light contrast) and resized by:

```bash
node scripts/prepare-images.mjs
```

Edit the `SHOTS` manifest in that script to add/replace shots or adjust the
grade, then re-run. Output lands in `public/images/photos/`. Studio
(white-background) shots skip the grade so whites stay neutral.

## Current slot map

| Slot | File |
|---|---|
| Homepage hero | `photos/hero-gritstone-edge.jpg` |
| Homepage inset band (base / ring detail) | `photos/band-forest-unroll.jpg` / `photos/detail-strap.jpg` |
| Homepage featured product | `photos/studio-mat-pillow.jpg` |
| Homepage pillow cross-sell | `photos/pillow-inflate-moor.jpg` |
| Homepage + PDP film | `videos/dreamlite-film.mp4` (poster `photos/film-poster.jpg`) |
| Homepage story teaser | `photos/story-tent-reach.jpg` |
| DreamLite gallery (6) | `studio-mat-pillow`, `asleep-on-mat`, `pack-into-rucksack`, `detail-valve`, `baffle-macro`, `hero-gritstone-edge` |
| Pillow gallery (4) | `pillow-inflate-moor`, `pillow-strap-tent`, `pillow-in-tent`, `studio-mat-pillow` |
| PDP story sections | `asleep-in-tent`, `stuffsack-in-hands`, `moorland-tent`, `roll-on-gritstone`, `tent-porch-kit` |
| About | `photos/unroll-on-moor.jpg` |
| Support six-step guide | `aplus-setup-steps.jpg` (kept — shown at native 3:2, uncropped) |
| OG card | `og-default.jpg` (graded hero crop, 1200 × 630) |

Spares already graded and ready in `photos/`: `detail-valve-close`,
`sleeping-bag-on-mat`, `studio-mat-straight`.

## Remaining nice-to-haves

1. **Pillow-only studio shot** on white for the pillow PDP gallery slide 1
   (currently leads with the moorland inflate shot, which works but a studio
   opener matches the mat PDP pattern). ≥ 2000 × 2000.
2. **Designed OG card** — 1200 × 630 with the white wordmark and a tagline over
   the hero image (current card is the photo alone).
3. **Video weight** — the film is a 75 MB 1080p H.264 (click-to-play, so it only
   downloads on demand). Before heavy marketing use, re-encode to ~15–20 MB
   (ffmpeg CRF 23, or host on Mux/Vimeo) — noted in `LAUNCH_CHECKLIST.md`.
