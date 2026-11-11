// Records width, height and a placeholder colour for every remote image used in the content,
// so pages reserve the right space before images load (no layout jumps) and builds stay fast.
// Runs automatically before `npm run dev` and `npm run build`; only new images are measured.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'src', 'data', 'image-meta.json');
const CDN = 'https://cdn.jsdelivr.net/gh/alllesss/eshraq.io-assets/';
// If the assets repo is checked out next to this one, read from disk instead of the network.
const LOCAL = process.env.ESHRAQ_ASSETS_DIR || path.resolve(ROOT, '..', 'eshraq.io-assets');

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);

const urls = new Set();
for (const file of walk(path.join(ROOT, 'src')).filter((f) => /\.(mdx?|astro|ts|js)$/.test(f))) {
  const text = fs.readFileSync(file, 'utf8');
  for (const m of text.matchAll(/https:\/\/cdn\.jsdelivr\.net\/gh\/alllesss\/eshraq\.io-assets\/[^\s"')>]+\.(?:jpe?g|png|webp|avif|gif)/gi)) urls.add(m[0]);
}

const meta = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
const todo = [...urls].filter((u) => !meta[u]);
const hex = ({ r, g, b }) => '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');

async function measure(url) {
  const local = path.join(LOCAL, decodeURIComponent(url.slice(CDN.length)));
  let input;
  if (fs.existsSync(local)) input = fs.readFileSync(local);
  else {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    input = Buffer.from(await res.arrayBuffer());
  }
  const img = sharp(input, { failOn: 'none' });
  const m = await img.metadata();
  const { width, height } = m.autoOrient ?? m;
  const { dominant } = await sharp(input, { failOn: 'none' }).resize(64, 64, { fit: 'inside' }).removeAlpha().stats();
  // Darken the placeholder so it sits quietly on the ground until the image arrives.
  const dim = { r: Math.round(dominant.r * 0.45 + 20), g: Math.round(dominant.g * 0.45 + 18), b: Math.round(dominant.b * 0.45 + 16) };
  return { w: width, h: height, color: hex(dim), ...(m.pages > 1 ? { animated: true } : {}) };
}

let done = 0, failed = 0;
const queue = [...todo];
await Promise.all(Array.from({ length: 8 }, async () => {
  for (let url; (url = queue.shift()); ) {
    try { meta[url] = await measure(url); done++; }
    catch (e) { failed++; console.warn('  could not measure', url, '-', e.message); }
  }
}));

for (const key of Object.keys(meta)) if (!urls.has(key)) delete meta[key];
const sorted = Object.fromEntries(Object.keys(meta).sort().map((k) => [k, meta[k]]));
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(sorted, null, 1) + '\n');
console.log(`image-meta: ${Object.keys(sorted).length} images (${done} new${failed ? `, ${failed} failed` : ''})`);
