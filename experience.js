(() => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const toggle = document.getElementById('motion-toggle');
  let userPaused = false;
  let orbitVisible = true;
  const running = new Set();
  const activeHover = new Map();
  const motion = window.Motion;
  const canAnimate = () => motion && !reducedMotion.matches && !userPaused;

  function animate(target, frames, options) {
    if (!canAnimate()) return;
    const control = motion.animate(target, frames, options);
    running.add(control);
    control.then(() => running.delete(control));
    return control;
  }

  let orbit;

  function syncMotion() {
    const paused = userPaused || reducedMotion.matches;
    if (!paused && motion && !orbit) {
      orbit = motion.animate('.orbital-tilt', { rotateY: [0, 360] }, { duration: 28, repeat: Infinity, ease: 'linear' });
    }
    document.body.classList.toggle('motion-paused', paused || document.hidden);
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.textContent = reducedMotion.matches ? 'Reduced motion on' : paused ? 'Resume motion ▷' : 'Pause motion Ⅱ';
    toggle.disabled = reducedMotion.matches;
    running.forEach(control => {
      if (paused) control.complete();
      else if (document.hidden) control.pause();
      else control.play();
    });
    if (orbit) {
      if (paused || document.hidden || !orbitVisible) orbit.pause();
      else orbit.play();
    }
    if (paused) {
      activeHover.forEach(control => { control.stop(); running.delete(control); });
      activeHover.clear();
      document.querySelectorAll('.primary-btn, .ghost-btn, .value-grid article, .identity-card, .venture-card').forEach(el => el.style.removeProperty('transform'));
    }
  }
  toggle.addEventListener('click', () => { userPaused = !userPaused; syncMotion(); });
  reducedMotion.addEventListener('change', syncMotion);
  document.addEventListener('visibilitychange', syncMotion);
  syncMotion();

  if (motion) {
    animate('.title-line', { y: [65, 0], opacity: [0, 1], filter: ['blur(8px)', 'blur(0px)'] }, {
      duration: .95, delay: motion.stagger(.12), ease: [.16, 1, .3, 1],
    });
    animate('.hero-eyebrow, .hero-lede, .hero-actions, .hero-youtube', { y: [20, 0], opacity: [0, 1] }, {
      duration: .8, delay: motion.stagger(.1, { startDelay: .3 }), ease: [.16, 1, .3, 1],
    });
    animate('.hero-art', { scale: [.8, 1], opacity: [0, 1] }, { duration: 1.5, ease: [.16, 1, .3, 1] });
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animate(entry.target, { y: [45, 0], opacity: [.15, 1] }, { duration: .8, ease: [.16, 1, .3, 1] });
      observer.unobserve(entry.target);
    });
  }, { threshold: .08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  new IntersectionObserver(([entry]) => {
    orbitVisible = entry.isIntersecting;
    if (orbit) {
      if (orbitVisible && canAnimate() && !document.hidden) orbit.play();
      else orbit.pause();
    }
  }).observe(document.querySelector('.hero-art'));

  function hoverAnimation(el, frames) {
    const previous = activeHover.get(el);
    if (previous) { previous.stop(); running.delete(previous); }
    const control = animate(el, frames, { type: 'spring', stiffness: 180, damping: 20 });
    if (control) {
      activeHover.set(el, control);
      control.then(() => { if (activeHover.get(el) === control) activeHover.delete(el); });
    }
  }
  document.querySelectorAll('.primary-btn, .ghost-btn').forEach(el => {
    el.addEventListener('pointermove', event => {
      if (!canAnimate() || !finePointer.matches) return;
      const rect = el.getBoundingClientRect();
      hoverAnimation(el, { x: (event.clientX - rect.left - rect.width / 2) * .13, y: (event.clientY - rect.top - rect.height / 2) * .2 });
    });
    el.addEventListener('pointerleave', () => { if (canAnimate()) hoverAnimation(el, { x: 0, y: 0 }); });
  });
  document.querySelectorAll('.value-grid article, .identity-card, .venture-card').forEach(el => {
    el.addEventListener('pointermove', event => {
      if (!canAnimate() || !finePointer.matches) return;
      const rect = el.getBoundingClientRect();
      hoverAnimation(el, { rotateX: -(event.clientY - rect.top - rect.height / 2) / 45, rotateY: (event.clientX - rect.left - rect.width / 2) / 45, transformPerspective: 800 });
    });
    el.addEventListener('pointerleave', () => { if (canAnimate()) hoverAnimation(el, { rotateX: 0, rotateY: 0 }); });
  });

  const progress = document.querySelector('.reading-progress');
  let scheduled = false;
  function updateProgress() {
    const distance = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${distance > 0 ? scrollY / distance : 0})`;
    scheduled = false;
  }
  addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateProgress); }
  }, { passive: true });
  addEventListener('resize', updateProgress);
  updateProgress();
})();
