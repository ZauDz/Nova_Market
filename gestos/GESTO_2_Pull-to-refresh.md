# GESTO 2 - Pull-to-refresh

Propósito: En la pantalla de catálogo, tirar hacia abajo desde el inicio (ion-refresher) relee los productos desde /assets/catalogo.json y muestra la hora de actualización.

Código clave (interfaces/catalogo.html, app.js):
- catalogo.html: `<ion-refresher slot="fixed"><ion-refresher-content pulling-icon="arrow-down" pulling-text="Suelta para actualizar" refreshing-text="Actualizando..."></ion-refresher-content></ion-refresher>`
- app.js: `const reload = async () => { const data = await (await get('/assets/catalogo.json')).json(); ... $('#updated').textContent = 'Catálogo actualizado ' + new Date().toLocaleTimeString(); }; refresh($('ion-refresher'), reload);`
- gestos.js: `export function refresh(control, reload) { control.addEventListener('ionRefresh', async () => { try { await reload(); } finally { await control.complete(); } }); }`

Evidencia visual: gestos/02-refresh.png

Ionic utilizado: ion-content, ion-refresher, ion-refresher-content.
