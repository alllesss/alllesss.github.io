// Generates the small tileable film-grain texture used by the ground and glass tiles.
import sharp from 'sharp';
const S = 256, buf = Buffer.alloc(S * S);
for (let i = 0; i < buf.length; i++) {
  const g = (Math.random() + Math.random() + Math.random() - 1.5) / 1.5; // ~gaussian, -1..1
  buf[i] = Math.max(0, Math.min(255, Math.round(128 + g * 70)));
}
await sharp(buf, { raw: { width: S, height: S, channels: 1 } }).webp({ quality: 55 }).toFile('public/img/grain.webp');
