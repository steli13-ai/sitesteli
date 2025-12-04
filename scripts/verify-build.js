#!/usr/bin/env node
/**
 * verify-build.js
 * Post-build sanity check: ensures manifest listed chunks & CSS exist.
 */
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

function fail(msg){
  console.error(`[verify-build] FAIL: ${msg}`); // CI can parse
  process.exitCode = 1;
}

try {
  const manifestPath = join(process.cwd(), 'build', 'manifest.json');
  if(!existsSync(manifestPath)) return fail('manifest.json missing in build/');
  const manifest = JSON.parse(readFileSync(manifestPath,'utf-8'));
  const entries = Object.values(manifest);
  let missing = 0;
  for(const entry of entries){
    const { file, css = [], assets = [] } = entry;
    const fp = join(process.cwd(),'build', file);
    if(!existsSync(fp)) { missing++; console.error(`Missing JS: ${file}`); }
    css.forEach(c => { const cp = join(process.cwd(),'build', c); if(!existsSync(cp)) { missing++; console.error(`Missing CSS: ${c}`); }});
    assets.forEach(a => { const ap = join(process.cwd(),'build', a); if(!existsSync(ap)) { missing++; console.error(`Missing asset: ${a}`); }});
  }
  if(missing === 0) {
    console.log('[verify-build] All referenced chunks/assets present.');
  } else {
    fail(`${missing} missing artifacts.`);
  }
} catch (e) {
  fail(e.message);
}
