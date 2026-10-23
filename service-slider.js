(() => {
  const slider = document.querySelector('.service-slider');
  if (!slider) return;
  const cards = [...slider.querySelectorAll('.service-card')];
  const controls = slider.querySelector('.service-controls');
  const pagination = slider.querySelector('.service-pagination');
  let active = 0;
  const dots = cards.map((card, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', card.querySelector('h3').textContent);
    button.addEventListener('click', () => select(index));
    pagination.append(button);
    return button;
  });
  function select(index) {
    active = (index + cards.length) % cards.length;
    cards.forEach((card, i) => {
      let offset = (i - active + cards.length) % cards.length;
      if (offset > cards.length / 2) offset -= cards.length;
      card.style.setProperty('--offset', offset);
      card.style.setProperty('--depth', Math.abs(offset));
      card.style.zIndex = String(cards.length - Math.abs(offset));
      card.classList.toggle('is-active', offset === 0);
      card.inert = offset !== 0;
      card.setAttribute('aria-hidden', String(offset !== 0));
      dots[i].setAttribute('aria-pressed', String(offset === 0));
    });
  }
  slider.classList.add('is-ready');
  controls.hidden = false;
  pagination.hidden = false;
  slider.querySelector('[data-service-prev]').addEventListener('click', () => select(active - 1));
  slider.querySelector('[data-service-next]').addEventListener('click', () => select(active + 1));
  slider.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    select(active + (event.key === 'ArrowRight' ? 1 : -1));
  });
  const deck = slider.querySelector('.service-deck');
  let start;
  deck.addEventListener('pointerdown', event => {
    if (event.button !== 0 || event.target.closest('button, a')) return;
    start = { x: event.clientX, y: event.clientY, id: event.pointerId, dx: 0 };
  });
  deck.addEventListener('pointermove', event => {
    if (!start || event.pointerId !== start.id) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (!deck.classList.contains('is-dragging') && Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 10) { start = null; return; }
    if (Math.abs(dx) > 8) {
      deck.classList.add('is-dragging');
      deck.setPointerCapture(event.pointerId);
      start.dx = dx;
      deck.style.setProperty('--drag', `${Math.max(-180, Math.min(180, dx))}px`);
    }
  });
  function finishDrag(event) {
    if (!start || event.pointerId !== start.id) return;
    const dx = start.dx;
    start = null;
    deck.classList.remove('is-dragging');
    deck.style.setProperty('--drag', '0px');
    if (deck.hasPointerCapture(event.pointerId)) deck.releasePointerCapture(event.pointerId);
    if (event.type !== 'pointercancel' && Math.abs(dx) > 45) select(active + (dx < 0 ? 1 : -1));
  }
  deck.addEventListener('pointerup', finishDrag);
  deck.addEventListener('pointercancel', finishDrag);
  deck.addEventListener('lostpointercapture', finishDrag);
  // Only consume horizontal gestures; vertical scrolling and pinch zoom stay native.
  let wheelDistance = 0;
  let wheelUsed = false;
  let wheelTimer;
  deck.addEventListener('wheel', event => {
    if (event.ctrlKey) return;
    const delta = event.shiftKey && !event.deltaX ? event.deltaY : event.deltaX;
    if (!delta || (!event.shiftKey && Math.abs(event.deltaY) >= Math.abs(delta))) return;
    event.preventDefault();
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(() => { wheelDistance = 0; wheelUsed = false; }, 180);
    if (wheelUsed) return;
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? deck.clientWidth : 1;
    wheelDistance += delta * unit;
    if (Math.abs(wheelDistance) >= 45) {
      select(active + (wheelDistance > 0 ? 1 : -1));
      wheelUsed = true;
    }
  }, { passive: false });
  select(0);
})();
