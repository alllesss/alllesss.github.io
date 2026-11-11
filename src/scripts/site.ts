// Small behaviours for the whole site. No framework; everything is optional enhancement.

// --- Looping clips play only while visible ---
const clips = document.querySelectorAll<HTMLVideoElement>('video[data-autoplay]');
if (clips.length) {
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const v = e.target as HTMLVideoElement;
        if (e.isIntersecting && !still) v.play().catch(() => {});
        else v.pause();
      }
    },
    { rootMargin: '200px 0px', threshold: 0.1 },
  );
  clips.forEach((v) => {
    v.addEventListener('loadedmetadata', () => {
      v.style.aspectRatio = v.videoWidth + ' / ' + v.videoHeight;
      // Tall (portrait) clips are capped so they never grow taller than the screen.
      const fig = v.closest<HTMLElement>('.fig');
      if (fig && v.videoHeight > v.videoWidth && !fig.style.maxWidth) fig.style.maxWidth = Math.round((760 * v.videoWidth) / v.videoHeight) + 'px';
    });
    if (still) v.controls = true;
    io.observe(v);
  });
}

// --- YouTube: poster first, player on click ---
document.querySelectorAll<HTMLAnchorElement>('a[data-yt]').forEach((a) => {
  const img = a.querySelector('img');
  if (img) {
    // YouTube answers with a tiny grey placeholder when the large poster does not exist.
    const check = () => {
      if (img.naturalWidth && img.naturalWidth <= 120 && img.dataset.fallback) {
        img.src = img.dataset.fallback;
        delete img.dataset.fallback;
      }
    };
    if (img.complete) check();
    else img.addEventListener('load', check);
  }
  a.addEventListener('click', (ev) => {
    ev.preventDefault();
    const f = document.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/' + a.dataset.yt + '?autoplay=1&rel=0&cc_load_policy=0&playsinline=1'; // captions off unless the viewer turns them on
    f.title = a.getAttribute('aria-label') ?? 'Video';
    f.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
    f.allowFullscreen = true;
    const box = document.createElement('div');
    box.className = 'embed-frame is-playing';
    box.style.cssText = a.style.cssText;
    box.append(f);
    a.replaceWith(box);
  });
});

// --- Lightbox: click an image to see it large; arrows step through the page's images ---
const box = document.querySelector<HTMLDialogElement>('dialog.lightbox');
if (box) {
  const big = box.querySelector<HTMLImageElement>('.lb-img')!;
  const cap = box.querySelector<HTMLElement>('.lb-cap')!;
  const count = box.querySelector<HTMLElement>('.lb-count')!;
  const prev = box.querySelector<HTMLButtonElement>('.lb-prev')!;
  const next = box.querySelector<HTMLButtonElement>('.lb-next')!;
  let frames: HTMLElement[] = [];
  let i = 0;
  const largest = (frame: HTMLElement, img: HTMLImageElement) => {
    const set = (frame.querySelector('source')?.srcset || img.srcset || '').split(',').map((x) => x.trim().split(/\s+/)[0]).filter(Boolean);
    return set.length ? set[set.length - 1] : img.currentSrc || img.src;
  };
  const show = (n: number) => {
    i = (n + frames.length) % frames.length;
    const frame = frames[i];
    const img = frame.querySelector('img')!;
    big.style.animation = 'none';
    void big.offsetWidth; // restart the fade-in for each image
    big.style.animation = '';
    big.src = largest(frame, img);
    big.alt = img.alt;
    cap.textContent = frame.closest('figure')?.querySelector('figcaption')?.textContent?.trim() ?? '';
    const many = frames.length > 1;
    prev.hidden = next.hidden = count.hidden = !many;
    count.textContent = many ? (i + 1) + ' / ' + frames.length : '';
  };
  document.addEventListener('click', (ev) => {
    const frame = (ev.target as HTMLElement).closest<HTMLElement>('[data-zoom]');
    if (!frame || !frame.querySelector('img')) return;
    frames = [...document.querySelectorAll<HTMLElement>('[data-zoom]')].filter((f) => f.querySelector('img'));
    show(frames.indexOf(frame));
    box.showModal();
    box.focus(); // keep focus on the viewer, not on a button, so no focus ring shows on open
  });
  prev.addEventListener('click', () => show(i - 1));
  next.addEventListener('click', () => show(i + 1));
  box.querySelector('.lb-close')!.addEventListener('click', () => box.close());
  // A click on the dark area (not the image, caption or buttons) closes.
  box.addEventListener('click', (ev) => {
    const t = ev.target as HTMLElement;
    if (t === box || t.classList.contains('lb-stage')) box.close();
  });
  box.addEventListener('keydown', (ev) => {
    if (ev.key === 'ArrowLeft') show(i - 1);
    if (ev.key === 'ArrowRight') show(i + 1);
  });
  // Swipe left/right on touch screens.
  let x0 = 0;
  box.addEventListener('touchstart', (ev) => { x0 = ev.touches[0].clientX; }, { passive: true });
  box.addEventListener('touchend', (ev) => {
    const dx = ev.changedTouches[0].clientX - x0;
    if (frames.length > 1 && Math.abs(dx) > 50) show(i + (dx < 0 ? 1 : -1));
  });
}

// --- Index rail: highlight the section being read ---
const links = [...document.querySelectorAll<HTMLAnchorElement>('.toc a')];
if (links.length) {
  const byId = new Map(links.map((l) => [decodeURIComponent(l.hash.slice(1)), l]));
  const heads = [...byId.keys()].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
  const update = () => {
    let cur = heads[0];
    for (const h of heads) if (h.getBoundingClientRect().top < 140) cur = h;
    links.forEach((l) => l.classList.toggle('is-active', l === byId.get(cur?.id)));
  };
  addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  update();

  // The floating index button: shown once you scroll into the post, opens and closes its list.
  const toc = document.querySelector<HTMLElement>('.toc');
  const btn = toc?.querySelector<HTMLButtonElement>('.toc-btn');
  const panel = toc?.querySelector<HTMLElement>('.toc-panel');
  if (toc && btn && panel) {
    const setOpen = (open: boolean) => { btn.setAttribute('aria-expanded', String(open)); panel.hidden = !open; };
    btn.addEventListener('click', () => setOpen(panel.hidden));
    panel.addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('a')) setOpen(false); });
    document.addEventListener('click', (e) => { if (!toc.contains(e.target as Node)) setOpen(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
    // Sit just below the sticky header, whatever its height (it wraps to two rows on phones).
    const header = document.querySelector<HTMLElement>('.site-header');
    const place = () => { if (header) toc.style.top = header.getBoundingClientRect().height + 14 + 'px'; };
    place();
    addEventListener('resize', () => requestAnimationFrame(place));
    const show = () => {
      const on = scrollY > 280;
      toc.classList.toggle('is-shown', on);
      if (!on) setOpen(false);
    };
    addEventListener('scroll', () => requestAnimationFrame(show), { passive: true });
    show();
  }
}


// --- Tactile effects -----------------------------------------------------------------------

const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

// 1. Cursor light on tiles and cards (only with a real mouse).
if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll<HTMLElement>('.entry, .pin, .post-nav a, .about-card, .about-tile, .f-concept, .series-parts a, .link').forEach((el) => {
    el.classList.add('spot');
    let raf = 0;
    el.addEventListener('pointermove', (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', e.clientX - r.left + 'px');
        el.style.setProperty('--my', e.clientY - r.top + 'px');
        raf = 0;
      });
    }, { passive: true });
  });
}

// 2. Images emerge as they scroll into view. (Images already on screen at load appear straight away.)
if (!calm && 'IntersectionObserver' in window) {
  const targets = [...document.querySelectorAll<HTMLElement>('.prose .fig-frame, .entry-media, .post-cover-plain, .f-who-side, .feature-media, .tile-media')];
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  targets.forEach((el) => {
    if (el.getBoundingClientRect().top < innerHeight) return;
    el.classList.add('reveal');
    io.observe(el);
  });
}

// 5. Reading progress on long pages (posts, Foundations).
const article = document.querySelector<HTMLElement>('article.prose');
const header = document.querySelector<HTMLElement>('.site-header');
if (article && header) {
  const bar = document.createElement('div');
  bar.className = 'read-progress';
  bar.setAttribute('aria-hidden', 'true');
  header.append(bar);
  const update = () => {
    const r = article.getBoundingClientRect();
    const total = r.height - innerHeight * 0.6;
    const done = Math.min(1, Math.max(0, (-r.top + innerHeight * 0.25) / Math.max(1, total)));
    bar.style.setProperty('--read', done.toFixed(4));
  };
  addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  addEventListener('resize', () => requestAnimationFrame(update));
  update();
}

// --- Phones: tuck the header away while scrolling down, bring it back on the way up ---
{
  const head = document.querySelector<HTMLElement>('.site-header');
  const small = matchMedia('(max-width: 640px)');
  if (head) {
    let lastY = scrollY;
    addEventListener('scroll', () => {
      const y = scrollY;
      if (!small.matches || y < 120) head.classList.remove('is-tucked');
      else if (y > lastY + 6) head.classList.add('is-tucked');
      else if (y < lastY - 6) head.classList.remove('is-tucked');
      lastY = y;
    }, { passive: true });
  }
}
