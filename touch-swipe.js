// Touch gestures are separate from mouse dragging so browser touch capture
// and native image/link gestures cannot interrupt a horizontal swipe.
function setupTouchSwipe(surface, onMove, onFinish) {
  let gesture;
  let suppressClick = false;
  surface.addEventListener('touchstart', event => {
    if (event.touches.length !== 1) { cancel(); return; }
    suppressClick = false;
    const touch = event.touches[0];
    gesture = { id: touch.identifier, x: touch.clientX, y: touch.clientY, dx: 0, horizontal: false };
  }, { passive: true });
  surface.addEventListener('touchmove', event => {
    if (!gesture) return;
    if (event.touches.length !== 1) { cancel(); return; }
    const touch = Array.from(event.touches).find(t => t.identifier === gesture.id);
    if (!touch) return;
    const dx = touch.clientX - gesture.x;
    const dy = touch.clientY - gesture.y;
    if (!gesture.horizontal) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 10) return;
      if (Math.abs(dy) >= Math.abs(dx)) { cancel(); return; }
      gesture.horizontal = true;
    }
    if (event.cancelable) event.preventDefault();
    gesture.dx = dx;
    suppressClick = true;
    onMove(dx);
  }, { passive: false });
  surface.addEventListener('touchend', event => {
    if (!gesture) return;
    const touch = Array.from(event.changedTouches).find(t => t.identifier === gesture.id);
    if (!touch) return;
    const dx = touch.clientX - gesture.x;
    const dy = touch.clientY - gesture.y;
    const swipe = Math.abs(dx) >= 35 && (gesture.horizontal || Math.abs(dx) > Math.abs(dy));
    gesture = null;
    suppressClick = suppressClick || swipe;
    onFinish(swipe ? (dx < 0 ? 1 : -1) : 0);
  });
  function cancel() { gesture = null; onFinish(0); }
  surface.addEventListener('touchcancel', cancel);
  surface.addEventListener('click', event => {
    if (!suppressClick) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    suppressClick = false;
  }, true);
}
