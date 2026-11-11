import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  // The file name is the URL, e.g. 2026-11-09-ESHRAQ-at-IDFA-DocLab.mdx -> /2026-11-09-ESHRAQ-at-IDFA-DocLab/
  loader: glob({
    pattern: '*.{md,mdx}',
    base: './src/content/posts',
    generateId: ({ entry }) => entry.replace(/\.mdx?$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.coerce.date(),
    author: z.string().default('Ali Eslami'),
    cover: z.string().optional(),
    thumbnail: z.string().optional(),
    description: z.string().optional(),
    // Moments out in the world get an orange dot on the home timeline and count as Events
    // (except Residency, which reads as a devlog). Leave it out for ordinary devlogs and essays.
    type: z.enum(['Exhibition', 'Residency', 'Talk', 'Screening', 'Release']).optional(),
    // The cover is shown as a wide banner with the title on it. Set `banner: false` for covers that
    // shouldn't be cropped (posters, logos, small images): they're shown whole, under the title.
    banner: z.boolean().default(true),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
