(() => {
  // Only run spotlight interaction on hover-capable devices
  const canHover = matchMedia("(hover:hover) and (pointer:fine)").matches;
  if (!canHover) return;

  const targets = document.querySelectorAll('.spotlight-target');

  targets.forEach((el) => {
    // Ensure element can host overlay
    if (getComputedStyle(el).position === 'static') {
      el.style.position = 'relative';
    }

    let raf = null;

    const onEnter = () => {
      el.classList.add('is-spotlight');
    };

    const onMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        // Use element-local mouse coordinates relative to the target's box
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        el.style.setProperty('--mx', `${x}px`);
        el.style.setProperty('--my', `${y}px`);
        raf = null;
      });
    };

    const onLeave = () => {
      el.classList.remove('is-spotlight');
    };

    el.addEventListener('mouseenter', onEnter, { passive: true });
    el.addEventListener('mousemove', onMove, { passive: true });
    el.addEventListener('mouseleave', onLeave, { passive: true });
  });
})();
