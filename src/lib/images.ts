import type { ImageMetadata } from 'astro';
import metaJson from '../data/image-meta.json';

// Post images live in src/media/ and are written in posts as /media/<folder>/<file>
// (e.g. /media/14_Post/Thumb.jpg). Astro resizes them at build time; nothing is downloaded.
// Videos, and files used by the static pages in public/, live in public/media/ and are served as they are.

export interface ImageMeta { w: number; h: number; color: string; animated?: boolean }
const meta = metaJson as Record<string, ImageMeta>;

const files = import.meta.glob<ImageMetadata>('/src/media/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default',
});

/** The processable image behind a /media/… path, or undefined if it isn't in src/media. */
export const localImage = (src?: string): ImageMetadata | undefined =>
  src?.startsWith('/media/') ? files['/src' + decodeURI(src)] : undefined;

/** Size and placeholder colour for an image, if it has been measured (scripts/image-meta.mjs). */
export const imageMeta = (src?: string): ImageMeta | undefined => (src ? meta[src] : undefined);

/** Output formats, best first. The last one is the fallback every browser gets. */
export const FORMATS = ['avif'] as const;
export const FALLBACK = 'webp' as const;

/** Widths to generate, never upscaling past the original. */
export function widthsFor(original: number, steps = [480, 768, 1080, 1440, 1920, 2560]): number[] {
  const out = steps.filter((w) => w < original);
  if (original <= steps[steps.length - 1]) out.push(original);
  else out.push(steps[steps.length - 1]);
  return [...new Set(out)];
}
