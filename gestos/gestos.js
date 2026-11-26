// Se cancela la pulsación si el usuario empieza a desplazar la lista.
export function longPress(el, open) {
  let timer, start, consumed = false;
  const stop = () => clearTimeout(timer);
  el.addEventListener('pointerdown', e => {
    if (!e.isPrimary || e.button !== 0) return;
    stop(); start = [e.clientX, e.clientY]; consumed = false;
    timer = setTimeout(() => { consumed = true;
      // Al aparecer el diálogo bajo el dedo, la liberación no debe activar su botón.
      const suppress = event => { event.preventDefault(); event.stopImmediatePropagation(); };
      window.addEventListener('click', suppress, {capture:true, once:true});
      const release = () => setTimeout(() => window.removeEventListener('click', suppress, true), 350);
      window.addEventListener('pointerup', release, {capture:true, once:true});
      window.addEventListener('pointercancel', release, {capture:true, once:true});
      open(); }, 550);
  });
  el.addEventListener('pointermove', e => {
    if (start && Math.hypot(e.clientX-start[0], e.clientY-start[1]) > 9) stop();
  });
  for (const type of ['pointerup','pointercancel','pointerleave']) el.addEventListener(type,stop);
  el.addEventListener('contextmenu', e => e.preventDefault());
  el.addEventListener('click', e => { if (consumed) {e.stopImmediatePropagation();consumed=false;} }, true);
}
export function pinch(surface, change) {
  const points = new Map(); let base = 1, initial = 0, scale = 1;
  const distance = () => {const [a,b] = [...points.values()]; return Math.hypot(a[0]-b[0],a[1]-b[1]);};
  surface.onpointerdown = e => {
    surface.setPointerCapture(e.pointerId); points.set(e.pointerId,[e.clientX,e.clientY]);
    if (points.size === 2) { initial = distance(); base = scale; }
  };
  surface.onpointermove = e => {
    if (!points.has(e.pointerId)) return;
    points.set(e.pointerId,[e.clientX,e.clientY]);
    if (points.size === 2 && initial) { scale = Math.max(1,Math.min(3,base*distance()/initial)); change(scale); }
  };
  surface.onlostpointercapture = e => { points.delete(e.pointerId); if(points.size===2){initial=distance();base=scale;} };
  return () => {scale=base=1;change(1);};
}
export function refresh(control, reload) {
  control.addEventListener('ionRefresh', async () => {
    try { await reload(); } finally { await control.complete(); }
  });
}
export function sliding(row, remove) {
  row.querySelector('ion-item-option').addEventListener('click',remove);
}

