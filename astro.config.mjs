import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.eshraq.io',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
  image: {
    // Originals live in the eshraq.io-assets repo; Astro fetches and resizes them at build time.
    domains: ['cdn.jsdelivr.net'],
  },
});
