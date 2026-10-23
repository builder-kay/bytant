(() => {
  const slider = document.querySelector('.service-slider');
  if (!slider) return;
  const cards = [...slider.querySelectorAll('.service-card')];
  const controls = slider.querySelector('.service-controls');
  const pagination = slider.querySelector('.service-pagination');
  const status = slider.querySelector('.service-status');
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
    status.textContent = `${String(active + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')} - ${cards[active].querySelector('h3').textContent}`;
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
  let start;
  slider.addEventListener('pointerdown', event => {
    if (event.pointerType === 'touch') start = { x: event.clientX, y: event.clientY };
  });
  slider.addEventListener('pointerup', event => {
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) select(active + (dx < 0 ? 1 : -1));
    start = null;
  });
  slider.addEventListener('pointercancel', () => { start = null; });
  select(0);
})();
