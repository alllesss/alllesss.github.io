// Generates the film-grain texture used on the page background.
// 512px drawn at 256 CSS px, so each grain is half a CSS pixel on high-density screens (fine, not blotchy).
// Pure per-pixel noise has no visible pattern, so the repeat doesn't read as a tile.
import sharp from 'sharp';
const S = 512, buf = Buffer.alloc(S * S);
for (let i = 0; i < buf.length; i++) {
  const g = (Math.random() + Math.random() + Math.random() + Math.random() - 2) / 2; // ~gaussian, -1..1
  buf[i] = Math.max(0, Math.min(255, Math.round(128 + g * 64)));
}
await sharp(buf, { raw: { width: S, height: S, channels: 1 } }).webp({ quality: 50 }).toFile('public/img/grain.webp');
