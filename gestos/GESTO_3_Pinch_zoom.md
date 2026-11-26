# GESTO 3 - Pinch/Zoom sobre la imagen

Propósito: En la pantalla de detalle, pellizcar (dos dedos) amplía la imagen del producto hasta 3x; soltar reducirla. El acompañante ion-fab ofrece un botón de restablecer zoom.

Código clave (interfaces/detalle.html, app.js):
- detalle.html: `<div id="photo"><img id="picture" alt=""></div><ion-fab slot="fixed" vertical="top" horizontal="end"><ion-fab-button id="resetZoom">1x</ion-fab-button></ion-fab>`
- app.js: `pinch($('#photo'), scale => { $('#picture').style.transform = 'scale(' + scale + ')'; $('#scale').textContent = Math.round(scale*100) + ' %'; });`
- gestos.js: `export function pinch(surface, change){ const points = new Map(); ... }`

Evidencia visual: gestos/03-pinch.png

Ionic utilizado: ion-content, ion-card, ion-list, ion-fab, ion-fab-button.
