import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function flatten(obj, prefix = '') {
  const out = {};
  for (const [k, v] of Object.entries(obj || {})) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      Object.assign(out, flatten(v, key));
    } else {
      out[key] = v;
    }
  }
  return out;
}

function run() {
  const roPath = path.resolve(process.cwd(), 'src', 'i18n', 'ro.json');
  const enPath = path.resolve(process.cwd(), 'src', 'i18n', 'en.json');
  const ro = JSON.parse(fs.readFileSync(roPath, 'utf-8'));
  const en = JSON.parse(fs.readFileSync(enPath, 'utf-8'));
  const fro = flatten(ro);
  const fen = flatten(en);
  const missingInEn = Object.keys(fro).filter((k) => !(k in fen));
  const missingInRo = Object.keys(fen).filter((k) => !(k in fro));

  if (missingInEn.length === 0 && missingInRo.length === 0) {
    console.log('[i18n] Keys aligned between ro and en.');
    process.exit(0);
  }
  if (missingInEn.length) {
    console.warn('[i18n] Missing in en:', missingInEn);
  }
  if (missingInRo.length) {
    console.warn('[i18n] Missing in ro:', missingInRo);
  }
  // Non-zero exit to surface in CI
  process.exit(1);
}

run();
