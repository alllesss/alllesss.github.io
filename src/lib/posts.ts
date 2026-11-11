import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'> & { log: number; minutes: number };

/** All published posts, newest first, each with its log number (1 = first entry) and reading time. */
export async function getPosts(): Promise<Post[]> {
  const all = await getCollection('posts', ({ data }) => !data.draft || import.meta.env.DEV);
  all.sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf());
  return all
    .map((p, i) => {
      const words = (p.body ?? '').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
      return Object.assign(p, { log: i + 1, minutes: Math.max(1, Math.round(words / 220)) });
    })
    .reverse();
}

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
/** 09 NOV 2026 — the simulation's readout style. */
export const fmtDate = (d: Date) =>
  `${String(d.getUTCDate()).padStart(2, '0')} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
export const pad2 = (n: number) => String(n).padStart(2, '0');
