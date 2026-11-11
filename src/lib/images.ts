import metaJson from '../data/image-meta.json';

export interface ImageMeta { w: number; h: number; color: string; animated?: boolean }
const meta = metaJson as Record<string, ImageMeta>;

/** Size and placeholder colour for a remote image, if it has been measured (scripts/image-meta.mjs). */
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
