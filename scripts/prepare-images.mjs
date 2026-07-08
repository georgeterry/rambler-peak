// One-off image pipeline: pulls selected photoshoot originals, applies the
// Rambler Peak cold-light grade, resizes for web and writes JPEGs into
// public/images/photos/. Re-run any time with:  node scripts/prepare-images.mjs
//
// Grade: gentle desaturation + cool white-balance shift + light contrast —
// pushing every lifestyle frame toward the brand's overcast, muted look so
// the product blue stays the loudest colour on the page. Studio (white
// background) shots skip the grade to keep whites neutral.

import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const SRC = '/Users/georgeterry/Desktop/THE PAISLEY GROUP/Camping Mat Images/Ca';
const OUT = new URL('../public/images/photos/', import.meta.url).pathname;

// Cool the frame: nudge red down, blue up. Rows ≈ 1 to hold overall exposure.
const COOL_MATRIX = [
  [0.95, 0.04, 0.01],
  [0.02, 0.96, 0.02],
  [0.01, 0.03, 1.02],
];

/** @type {{src:string,out:string,width:number,grade:boolean,height?:number}[]} */
const SHOTS = [
  // Hero + bands
  { src: 'Rambler Peak 16.jpg', out: 'hero-gritstone-edge.jpg', width: 2400, grade: true },
  { src: 'Rambler Peak 2.jpg', out: 'band-forest-unroll.jpg', width: 2400, grade: true },
  { src: 'Rambler Peak 9.jpg', out: 'moorland-tent.jpg', width: 2200, grade: true },
  { src: 'Rambler Peak 15.jpg', out: 'story-tent-reach.jpg', width: 1600, grade: true },

  // Detail shots (circular insets)
  { src: 'Rambler Peak 8.jpg', out: 'detail-strap.jpg', width: 1400, grade: true },
  { src: 'Rambler Peak 5.jpg', out: 'detail-valve.jpg', width: 1400, grade: true },
  { src: 'Rambler Peak 1.jpg', out: 'detail-valve-close.jpg', width: 1400, grade: true },

  // DreamLite gallery + story
  // Combined mat + pillow hero (George's preferred angled composition, absolute
  // path so it survives full pipeline re-runs). Studio white-bg shot -> ungraded.
  { src: '/Users/georgeterry/Desktop/New listing images/Hero Image.png', out: 'studio-mat-pillow.jpg', width: 2400, grade: false },
  { src: 'White Background without pillow straight.jpg', out: 'studio-mat-straight.jpg', width: 2000, grade: false },
  { src: 'Rambler Peak 20.jpg', out: 'pack-into-rucksack.jpg', width: 2000, grade: true },
  { src: 'Rambler Peak 3.jpg', out: 'asleep-on-mat.jpg', width: 2000, grade: true },
  { src: 'Rambler Peak 17.jpg', out: 'baffle-macro.jpg', width: 1600, grade: true },
  { src: 'Rambler Peak 13.jpg', out: 'asleep-in-tent.jpg', width: 1600, grade: true },
  { src: 'Rambler Peak 12.jpg', out: 'sleeping-bag-on-mat.jpg', width: 1800, grade: true },
  { src: 'Rambler Peak 4.jpg', out: 'tent-porch-kit.jpg', width: 2000, grade: true },
  { src: 'Rambler Peak Instructional 2.jpg', out: 'roll-on-gritstone.jpg', width: 2000, grade: true },
  { src: 'Rambler Peak Instructional 1.jpg', out: 'stuffsack-in-hands.jpg', width: 2000, grade: true },
  { src: 'Rambler Peak Instructional 4.jpg', out: 'unroll-on-moor.jpg', width: 2000, grade: true },

  // Pillow gallery
  { src: 'Rambler Peak 6.jpg', out: 'pillow-inflate-moor.jpg', width: 2000, grade: true },
  { src: 'Rambler Peak 11.jpg', out: 'pillow-strap-tent.jpg', width: 2000, grade: true },
  { src: 'Rambler Peak 10.jpg', out: 'pillow-in-tent.jpg', width: 2000, grade: true },

  // Founder photo for /about (absolute path: lives outside the photoshoot folder).
  // Lighter treatment than the product lifestyle grade so it reads as a real
  // snapshot, not campaign imagery.
  { src: '/Users/georgeterry/Desktop/About me picture.jpg', out: 'founder-dow-crag.jpg', width: 1290, grade: true },
];

await mkdir(OUT, { recursive: true });

for (const shot of SHOTS) {
  const input = shot.src.startsWith('/') ? shot.src : path.join(SRC, shot.src);
  let img = sharp(input).rotate().resize({ width: shot.width, withoutEnlargement: true });

  if (shot.grade) {
    img = img
      .recomb(COOL_MATRIX)
      .modulate({ saturation: 0.86, brightness: 0.99 })
      .linear(1.05, -6)
      .sharpen({ sigma: 0.7 });
  } else {
    img = img.sharpen({ sigma: 0.6 });
  }

  const out = path.join(OUT, shot.out);
  const info = await img.jpeg({ quality: 82, mozjpeg: true }).toFile(out);
  console.log(`${shot.out}  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)} kB${shot.grade ? '  [graded]' : ''}`);
}

// 16:9 poster frame for the film block, from the forest unroll shot.
await sharp(path.join(SRC, 'Rambler Peak 2.jpg'))
  .rotate()
  .resize(1920, 1080, { fit: 'cover', position: 'centre' })
  .recomb(COOL_MATRIX)
  .modulate({ saturation: 0.86, brightness: 0.99 })
  .linear(1.05, -6)
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile(path.join(OUT, 'film-poster.jpg'));
console.log('film-poster.jpg  1920×1080');

// OG card 1200×630 from the hero shot.
await sharp(path.join(SRC, 'Rambler Peak 16.jpg'))
  .rotate()
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .recomb(COOL_MATRIX)
  .modulate({ saturation: 0.86, brightness: 0.99 })
  .linear(1.05, -6)
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(new URL('../public/og-default.jpg', import.meta.url).pathname);
console.log('og-default.jpg  1200×630');
