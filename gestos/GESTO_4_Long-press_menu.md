# GESTO 4 - Long-press para menú contextual

Propósito: Mantiener presionado un producto del catálogo (550 ms) abre una ventana de opciones para "Ver características" o "Agregar al carrito".

Código clave (app.js, gestos/gestos.js):
- app.js: `longPress(b, () => { chosen = item; $('#chosen').textContent = item.name; $('#options').showModal(); });`
- gestos.js: `export function longPress(el, open) { el.addEventListener('pointerdown', e => { ... timer = setTimeout(() => { open(); }, 550); }); }`

Evidencia visual: gestos/04-long-press.png

Ionic utilizado: ion-content, ion-card, ion-item, dialog (menu contextual).
