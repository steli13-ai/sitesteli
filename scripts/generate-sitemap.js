// Generate sitemap.xml from publicLinks.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const siteUrl = process.env.VITE_SITE_URL || 'https://matecusucces.ro';

async function run() {
  try {
    const linksPath = path.resolve(process.cwd(), 'src', 'config', 'publicLinks.js');
    if (!fs.existsSync(linksPath)) {
      console.warn('[sitemap] src/config/publicLinks.js missing, skipping');
      return;
    }
    // Dynamic import for ESM
    const mod = await import(pathToFileURL(linksPath));
    const urls = mod.CANONICAL_ROUTES || mod.default || mod.publicLinks || [];
    const list = Array.isArray(urls) ? urls : Object.values(urls || {});

    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
    const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    const urlsetClose = '</urlset>\n';
    const body = list
      .filter(Boolean)
      .map((u) => {
        const loc = u.startsWith('http') ? u : `${siteUrl}${u}`;
        return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`;
      })
      .join('\n');

    const xml = xmlHeader + urlsetOpen + body + '\n' + urlsetClose;
    const outDir = path.resolve(process.cwd(), 'public');
    fs.writeFileSync(path.resolve(outDir, 'sitemap.xml'), xml);
    console.log(`[sitemap] Wrote ${list.length} URLs to public/sitemap.xml`);
  } catch (e) {
    console.warn('[sitemap] failed:', e?.message);
  }
}

// Helper: fileURL
function pathToFileURL(p) {
  const url = new URL('file:');
  url.pathname = path.resolve(p).replace(/\\/g, '/');
  return url;
}

run();
