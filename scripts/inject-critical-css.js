/* Inline critical CSS using Critters post-build.
   Assumes build output in ./build
   Run automatically via build script. */
import fs from 'fs';
import path from 'path';
import Critters from 'critters';

async function run() {
  const buildDir = path.resolve('build');
  const indexPath = path.join(buildDir, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('[critical-css] index.html not found, skipping.');
    return;
  }
  const html = fs.readFileSync(indexPath, 'utf8');
  const critters = new Critters({
    path: buildDir,
    preload: 'swap',
    pruneSource: true,
    compress: true,
    inlineFonts: true,
    reduceInlineStyles: true
  });
  try {
    const processed = await critters.process(html);
    fs.writeFileSync(indexPath, processed, 'utf8');
    console.log('[critical-css] inlined critical CSS successfully.');
  } catch (e) {
    console.warn('[critical-css] failed:', e.message);
  }
}
run();
