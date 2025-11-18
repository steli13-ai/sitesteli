/* Image optimization pipeline: generates responsive WebP & AVIF variants.
   Run: `node scripts/optimize-images.js` before build. */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SRC_DIR = path.resolve('public/assets/images');
const OUT_DIR = path.resolve('public/assets/images/optimized');
const SIZES = [192, 512]; // Based on existing logo assets; adjust as needed

function isProcessable(filename) {
  return /\.(png|jpe?g)$/i.test(filename) && !/optimized\//.test(filename);
}

async function optimize() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const files = fs.readdirSync(SRC_DIR).filter(isProcessable);
  if (!files.length) {
    console.log('[images] No matching source images to optimize.');
    return;
  }
  console.log(`[images] Optimizing ${files.length} images...`);
  for (const file of files) {
    const input = path.join(SRC_DIR, file);
    const base = file.replace(/\.(png|jpe?g)$/i, '');
    for (const w of SIZES) {
      const pipeline = sharp(input).resize({ width: w });
      try {
        await pipeline.clone().webp({ quality: 80 }).toFile(path.join(OUT_DIR, `${base}-${w}.webp`));
        await pipeline.clone().avif({ quality: 55 }).toFile(path.join(OUT_DIR, `${base}-${w}.avif`));
        console.log(`[images] ${file} -> ${w}px variants generated.`);
      } catch (e) {
        console.warn(`[images] Failed processing ${file} at width ${w}:`, e.message);
      }
    }
  }
  console.log('[images] Optimization complete.');
}

optimize();
