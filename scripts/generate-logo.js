// Generate logo assets from public/assets/images/logo-source.png
// Outputs: logo.png (512x512), logo-192.png, logo-512.png

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const candidates = [
  'logo-source.png',
  'logo-source.jpg',
  'logo-source.jpeg',
  'logo-source.png.jpeg',
];
const outDir = path.join(ROOT, 'public', 'assets', 'images');

async function ensureFile(p) {
  try {
    await fs.promises.access(p, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function resolveInput() {
  for (const name of candidates) {
    const p = path.join(outDir, name);
    if (await ensureFile(p)) return p;
  }
  return null;
}

async function generate() {
  const inPath = await resolveInput();
  if (!inPath) {
    console.error(`[generate-logo] Missing source file. Place one of: ${candidates.join(', ')} in ${outDir}`);
    process.exit(1);
  }

  const sizes = [
    { name: 'logo.png', size: 512 },
    { name: 'logo-192.png', size: 192 },
    { name: 'logo-512.png', size: 512 },
  ];

  for (const { name, size } of sizes) {
    const outPath = path.join(outDir, name);
    await sharp(inPath)
      .resize({ width: size, height: size, fit: 'cover', position: 'centre' })
      .png()
      .toFile(outPath);
    console.log(`[generate-logo] Wrote ${name} (${size}x${size})`);
  }

  console.log('[generate-logo] Done.');
}

generate().catch((err) => {
  console.error('[generate-logo] Error:', err);
  process.exit(1);
});
