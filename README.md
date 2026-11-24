# ESHRAQ.io

The process log of ESHRAQ, a research project by Ali Eslami: <https://www.eshraq.io>

Built with [Astro](https://astro.build) and served by a Cloudflare Worker (static assets).
Every push to `master` builds and publishes the site automatically.

## Writing

- Posts live in `src/content/posts/` as `.mdx` files. The file name becomes the URL: `2026-11-09-ESHRAQ-at-IDFA-DocLab.mdx` is published at `/2026-11-09-ESHRAQ-at-IDFA-DocLab/`.
- Images live in `src/media/<folder>/`, one folder per post (e.g. `src/media/14_Post/`). Link them as `/media/14_Post/Thumb.jpg`; the build makes optimised copies, so originals can be large.
- Videos (`.mp4`) and files used by the static pages in `public/` go in `public/media/<folder>/` instead, linked the same way. They are served as they are, so keep them small (under 25 MB each).
- Pinned cards on the home page: `src/data/pinned.ts`.

## Running locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production build in dist/
```

## Hosting

- `wrangler.jsonc` configures the Cloudflare Worker.
- GitHub Actions (`.github/workflows/ci.yml`) builds every push and deploys `master` to Cloudflare with the `CLOUDFLARE_API_TOKEN` secret. Cloudflare's own Git builds are switched off.
- To publish by hand instead: `npm run build`, then `npx wrangler deploy`.
- `public/_redirects` keeps old addresses working, and `public/_headers` keeps the design document out of search engines.
