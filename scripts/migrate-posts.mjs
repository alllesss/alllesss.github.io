// One-time migration: Jekyll posts (_posts/*.md) -> Astro MDX (src/content/posts/*.mdx).
// Safe to re-run; it overwrites the generated files. Run with: node scripts/migrate-posts.mjs
import fs from 'node:fs';
import path from 'node:path';
import * as yaml from 'js-yaml';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, '_posts');
const OUT = path.join(ROOT, 'src', 'content', 'posts');
fs.mkdirSync(OUT, { recursive: true });

const attr = (s, name) => {
  const m = s.match(new RegExp(`\\b${name}\\s*=\\s*"([^"]*)"`, 'i'));
  return m ? m[1] : undefined;
};
const q = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const PLAIN = /^[^"<>{}\[\]*_`]*$/;

function cleanCaption(raw = '') {
  return raw
    .replace(/<\/?(i|center|em)\b[^>]*>/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function sizeProps(figAttrs = '', imgAttrs = '') {
  const cls = attr(figAttrs, 'class') || '';
  const style = attr(figAttrs, 'style') || '';
  let out = '';
  if (/\bmedium\b/.test(cls)) out += ' size="medium"';
  else if (/\bsmall\b/.test(cls)) out += ' size="small"';
  const mw = style.match(/max-width:\s*([^;]+)/i);
  if (mw && mw[1].trim() !== '100%') out += ` width="${mw[1].trim()}"`;
  const w = attr(imgAttrs, 'width');
  if (w && !mw) out += ` width="${w}"`;
  return out;
}

function figure(src, alt, extra, caption) {
  const cap = cleanCaption(caption);
  const a = alt && alt.trim() && alt.trim() !== 'alt text' ? alt.trim() : cap.replace(/<[^>]+>/g, '');
  const base = `<Figure src="${src}" alt="${q(a)}"${extra}`;
  if (!cap) return `${base} />`;
  if (PLAIN.test(cap)) return `${base} caption="${cap}" />`;
  return `${base}>${cap}</Figure>`;
}

function video(src, extra, caption) {
  const cap = cleanCaption(caption);
  const base = `<Video src="${src}"${extra}`;
  if (!cap) return `${base} />`;
  if (PLAIN.test(cap)) return `${base} caption="${cap}" />`;
  return `${base}>${cap}</Video>`;
}

function embed(iframeAttrs, pad) {
  const src = (attr(iframeAttrs, 'src') || '').replace(/&amp;/g, '&');
  const title = attr(iframeAttrs, 'title');
  let out = `<Embed src="${src}"`;
  if (title && title !== 'YouTube video player') out += ` title="${q(title)}"`;
  if (pad && Math.abs(parseFloat(pad) - 56.25) > 0.1) {
    out += ` ratio="${(100 / parseFloat(pad)).toFixed(3)}"`;
  }
  return out + ' />';
}

function convertBody(body, file) {
  let s = body.replace(/\r\n/g, '\n');
  const notes = [];

  // HTML comments -> MDX comments
  s = s.replace(/<!--([\s\S]*?)-->/g, (_, c) => `{/*${c.replace(/\*\//g, '* /')}*/}`);

  // Jekyll includes
  s = s.replace(/\{%\s*include\s+pdf-viewer\.html([\s\S]*?)%\}/g, (_, a) => {
    const props = ['url', 'title', 'height', 'caption']
      .map((k) => (attr(a, k) ? ` ${k}="${q(attr(a, k))}"` : ''))
      .join('');
    return `<PdfViewer${props} />`;
  });

  // Newsletter embed
  s = s.replace(
    /<div class="newsletter-container[^"]*">\s*<iframe[^>]*substack[^>]*>\s*<\/iframe>\s*<\/div>/g,
    '<Newsletter />',
  );

  // Lightbox anchors: unwrap, keep the image
  s = s.replace(/<a class="example-image-link"[^>]*>\s*(<img[^>]*>)\s*<\/a>/g, '$1');

  // <video> blocks -> token
  s = s.replace(
    /<div class="video-container([^"]*)">\s*<video[^>]*>\s*<source src="([^"]+)"[^>]*>[\s\S]*?<\/video>\s*<\/div>/g,
    (_, cls, src) => `@@VIDEO|${src}|${cls.trim()}@@`,
  );

  // iframe embeds
  s = s.replace(
    /<div style="padding:\s*([\d.]+)% 0 0 0;\s*position:relative;">\s*<iframe([\s\S]*?)>\s*<\/iframe>\s*<\/div>(\s*<script[^>]*>\s*<\/script>)?/g,
    (_, pad, a) => embed(a, pad),
  );
  s = s.replace(
    /<div class="video-embed">\s*<iframe([\s\S]*?)>\s*<\/iframe>\s*<\/div>/g,
    (_, a) => embed(a),
  );
  s = s.replace(/<iframe([^>]*(?:youtube|vimeo)[^>]*)>\s*<\/iframe>/g, (_, a) => embed(a));
  s = s.replace(/<script[^>]*player\.vimeo\.com[^>]*>\s*<\/script>/g, '');

  const MEDIA = String.raw`(<img[^>]*>|@@VIDEO\|[^@]*@@)`;
  const CAP = String.raw`(?:\s*<figcaption[^>]*>([\s\S]*?)<\/figcaption>)?`;

  const render = (figAttrs, media, cap) => {
    if (media.startsWith('@@VIDEO')) {
      const [, src, cls] = media.slice(2, -2).split('|');
      const extra = sizeProps(`class="${cls}"`) + sizeProps(figAttrs).replace(/ size="[^"]*"/, '');
      return video(src, extra, cap);
    }
    return figure(attr(media, 'src'), attr(media, 'alt') || '', sizeProps(figAttrs, media), cap);
  };

  // <figure> … media … caption … (</figure> is often missing in the source)
  s = s.replace(
    new RegExp(String.raw`<figure([^>]*)>\s*${MEDIA}${CAP}(?:\s*<\/figure>)?`, 'g'),
    (_, fa, media, cap) => render(fa, media, cap),
  );
  // media outside a figure, optionally followed by a caption
  s = s.replace(new RegExp(`${MEDIA}${CAP}`, 'g'), (_, media, cap) => render('', media, cap));
  s = s.replace(/[ \t]*<\/figure>[ \t]*\n?/g, '');

  // Markdown images (with optional kramdown attributes) -> Figure
  s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)(\{:[^}]*\})?/g, (_, alt, src, title, ial) => {
    let extra = '';
    const w = ial && ial.match(/width="([^"]+)"/);
    if (w) extra = ` width="${w[1]}"`;
    return figure(src, alt, extra, title || '');
  });

  // kramdown block attributes: {: .box-gray} applies to the paragraph above it
  const lines = s.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^\s*\{:\s*\.box-(\w+)\s*\}\s*$/);
    if (!m) continue;
    const tone = { gray: 'note', yellow: 'accent', error: 'soul' }[m[1]] || 'note';
    let start = i - 1;
    while (start > 0 && lines[start - 1].trim() !== '') start--;
    lines[i] = '\n</Callout>';
    lines[start] = `<Callout tone="${tone}">\n\n${lines[start]}`;
  }
  s = lines.join('\n');

  // The page title is the only <h1>: if a post uses "#" for its sections, shift every heading down one level.
  if (/^# \S/m.test(s.replace(/```[\s\S]*?```/g, ''))) {
    let fence = false;
    s = s.split('\n').map((l) => {
      if (/^\s*```/.test(l)) fence = !fence;
      return !fence && /^#{1,5} \S/.test(l) ? '#' + l : l;
    }).join('\n');
  }

  // void elements must self-close in MDX
  s = s.replace(/<br\s*>/gi, '<br />').replace(/<hr\s*>/gi, '<hr />');
  s = s.replace(/<\/?center>/gi, '');

  for (const [re, label] of [
    [/<figcaption|<\/figcaption/, 'stray figcaption'],
    [/<figure/, 'stray figure'],
    [/<img\b/, 'stray img'],
    [/<iframe/, 'stray iframe'],
    [/<video|@@VIDEO/, 'stray video'],
    [/\{:|\{%/, 'stray kramdown/liquid'],
    [/<script/, 'stray script'],
  ]) {
    s.split('\n').forEach((l, n) => {
      if (re.test(l)) notes.push(`${label} @${n + 1}: ${l.trim().slice(0, 110)}`);
    });
  }
  if (notes.length) console.log(`\n${file}\n  ` + notes.join('\n  '));
  return s.replace(/\n{4,}/g, '\n\n\n').trim() + '\n';
}

let count = 0;
for (const name of fs.readdirSync(SRC).filter((f) => f.endsWith('.md')).sort()) {
  const raw = fs.readFileSync(path.join(SRC, name), 'utf8').replace(/\r\n/g, '\n');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) { console.warn('no frontmatter:', name); continue; }
  const fm = yaml.load(m[1]) || {};
  const slug = name.replace(/\.md$/, '');
  const first = (v) => {
    if (!v) return undefined;
    if (typeof v === 'string') return v.trim();
    if (Array.isArray(v)) return first(v[0]);
    if (typeof v === 'object') return Object.keys(v)[0];
  };
  const out = {
    title: fm.title,
    subtitle: fm.subtitle,
    date: slug.slice(0, 10),
    author: fm.author,
    cover: first(fm['cover-img']),
    thumbnail: first(fm['thumbnail-img']),
    description: fm['share-description'],
  };
  for (const k of Object.keys(out)) if (out[k] === undefined) delete out[k];
  const front = yaml.dump(out, { lineWidth: -1, quotingType: '"' }).replace(/^date: "?([\d-]+)"?$/m, 'date: $1');
  fs.writeFileSync(path.join(OUT, `${slug}.mdx`), `---\n${front}---\n\n${convertBody(m[2], name)}`);
  count++;
}
console.log(`\nMigrated ${count} posts -> src/content/posts/`);
