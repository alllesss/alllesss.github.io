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
    // Cards crop the thumbnail to a wide frame. Set `thumbFit: whole` when the subject fills the image
    // (e.g. a square photo of an object): it's then shown whole on its own background colour.
    thumbFit: z.enum(['crop', 'whole']).default('crop'),
    description: z.string().optional(),
    // Moments out in the world count as Events in the home filter (except Residency, which reads
    // as a devlog). Leave it out for ordinary devlogs and essays.
    type: z.enum(['Exhibition', 'Residency', 'Talk', 'Screening', 'Release']).optional(),
    // The cover is shown as a wide banner with the title on it. Set `banner: false` for covers that
    // shouldn't be cropped (posters, logos, small images): they're shown whole, under the title.
    banner: z.boolean().default(true),
    // Video posts (a talk, a screening, a walkthrough): `format: video` puts the video first, full width,
    // with the text beside a small details panel. Give the video, its length in minutes, and optionally
    // details (label / value / link) and a poster image for the panel.
    format: z.enum(['article', 'video']).default('article'),
    video: z.string().optional(),
    minutes: z.number().optional(),
    details: z.array(z.object({ label: z.string(), value: z.string(), href: z.string().optional() })).optional(),
    poster: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
