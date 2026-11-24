import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.eshraq.io',
  trailingSlash: 'always',
  // Post images live in src/media/ and are resized at build time; nothing is downloaded.
  integrations: [mdx(), sitemap()],
});
