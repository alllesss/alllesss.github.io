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
    f.src = 'https://www.youtube-nocookie.com/embed/' + a.dataset.yt + '?autoplay=1&rel=0';
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

// --- Lightbox: click an image to see it large ---
const box = document.querySelector<HTMLDialogElement>('dialog.lightbox');
if (box) {
  const big = box.querySelector('img')!;
  const cap = box.querySelector('p')!;
  document.addEventListener('click', (ev) => {
    const frame = (ev.target as HTMLElement).closest<HTMLElement>('[data-zoom]');
    const img = frame?.querySelector('img');
    if (!frame || !img) return;
    const set = (frame.querySelector('source')?.srcset || img.srcset || '')
      .split(',')
      .map((s) => s.trim().split(/\s+/)[0])
      .filter(Boolean);
    big.src = set.length ? set[set.length - 1] : img.currentSrc || img.src;
    big.alt = img.alt;
    cap.textContent = frame.parentElement?.querySelector('figcaption')?.textContent ?? '';
    box.showModal();
  });
  box.addEventListener('click', (ev) => {
    if (ev.target !== cap) box.close();
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

  // Fade the index out while a wide image or video passes alongside it, so it never sits on top of one.
  const toc = document.querySelector<HTMLElement>('.toc');
  const wide = [...document.querySelectorAll<HTMLElement>('.prose > .fig--auto, .prose > .embed')];
  if (toc && wide.length) {
    const check = () => {
      if (getComputedStyle(toc).display === 'none') return;
      const t = toc.getBoundingClientRect();
      const covered = wide.some((el) => {
        const r = el.getBoundingClientRect();
        return r.left < t.right + 8 && r.bottom > t.top - 16 && r.top < t.bottom + 16;
      });
      toc.classList.toggle('is-covered', covered);
    };
    addEventListener('scroll', () => requestAnimationFrame(check), { passive: true });
    addEventListener('resize', () => requestAnimationFrame(check));
    check();
  }
}
