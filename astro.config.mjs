import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// The build downloads every original image from jsDelivr. A clean build (no cache, as on Cloudflare
// and GitHub) asks for hundreds at once, and jsDelivr then drops some connections ("fetch failed").
// So: only a few downloads at a time, and try again when one fails.
const IMAGE_HOST = 'cdn.jsdelivr.net';
const MAX_AT_ONCE = 6;
const TRIES = 5;
const plainFetch = globalThis.fetch;
let running = 0;
const waiting = [];

async function politeFetch(input, init) {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
  if (!url.includes(IMAGE_HOST)) return plainFetch(input, init);
  if (running >= MAX_AT_ONCE) await new Promise((go) => waiting.push(go));
  running++;
  try {
    for (let attempt = 1; ; attempt++) {
      try {
        const res = await plainFetch(input, init);
        if (res.status < 500 && res.status !== 429) return res;
        if (attempt === TRIES) return res;
      } catch (err) {
        if (attempt === TRIES) throw err;
      }
      await new Promise((r) => setTimeout(r, 500 * 2 ** (attempt - 1)));
    }
  } finally {
    running--;
    waiting.shift()?.();
  }
}
globalThis.fetch = politeFetch;

export default defineConfig({
  site: 'https://www.eshraq.io',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
  image: {
    // Originals live in the eshraq.io-assets repo; Astro fetches and resizes them at build time.
    domains: ['cdn.jsdelivr.net'],
  },
});
