// Minimal Vite plugin to inline a slice of critical CSS into build/index.html
// Heuristic: inline the first N bytes of the main CSS referenced by index.html.
// Keeps the original <link> for full CSS to avoid breakage.
import fs from 'fs';
import path from 'path';

export default function criticalCssInline(opts = {}) {
  const {
    outDir = 'build',
    maxInlineBytes = 8192, // ~8KB
    htmlFile = 'index.html',
  } = opts;

  return {
    name: 'critical-css-inline',
    apply: 'build',
    async closeBundle() {
      try {
        const htmlPath = path.resolve(process.cwd(), outDir, htmlFile);
        if (!fs.existsSync(htmlPath)) return;
        let html = fs.readFileSync(htmlPath, 'utf8');
        const cssHrefMatch = html.match(/<link[^>]+href="(assets\/index-[^"]+\.css)"[^>]*>/i);
        if (!cssHrefMatch) return;
        const cssRelPath = cssHrefMatch[1];
        const cssPath = path.resolve(process.cwd(), outDir, cssRelPath);
        if (!fs.existsSync(cssPath)) return;
        const cssContent = fs.readFileSync(cssPath, 'utf8');
        const inlineSlice = cssContent.slice(0, maxInlineBytes);
        const styleTag = `\n<style data-inline-critical>\n${inlineSlice}\n</style>\n`;
        // Insert styleTag before the first stylesheet link
        html = html.replace(cssHrefMatch[0], styleTag + cssHrefMatch[0]);
        fs.writeFileSync(htmlPath, html, 'utf8');
        // Optional: add a marker
        // console.log('[critical-css-inline] Inlined', inlineSlice.length, 'bytes from', cssRelPath);
      } catch (e) {
        // Fail silently to avoid breaking the build
      }
    },
  };
}
