# ESHRAQ.io

The process log of ESHRAQ, a research project by Ali Eslami: <https://www.eshraq.io>

Built with [Astro](https://astro.build) and served by a Cloudflare Worker (static assets).
Every push to `master` builds and publishes the site automatically.

## Writing

- Posts live in `src/content/posts/` as `.mdx` files. The file name becomes the URL: `2026-11-09-ESHRAQ-at-IDFA-DocLab.mdx` is published at `/2026-11-09-ESHRAQ-at-IDFA-DocLab/`.
- Images live in the [eshraq.io-assets](https://github.com/alllesss/eshraq.io-assets) repo. Link them with their `cdn.jsdelivr.net/gh/alllesss/eshraq.io-assets/...` address; the build makes optimised copies.
- Pinned cards on the home page: `src/data/pinned.ts`.

## Running locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production build in dist/
```

## Hosting

- `wrangler.jsonc` configures the Cloudflare Worker.
- `public/_redirects` keeps old addresses working, and `public/_headers` keeps the design document out of search engines.
