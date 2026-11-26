# GESTO 1 - Swipe para eliminar

Propósito: En la pantalla del carrito, swipe a la izquierda (ion-item-sliding) revela el botón "Eliminar". El programa borra la fila del carrito, recalcula el total y actualiza la lista.

Código clave (app.js / interfaces/carrito.html, interfaces/carrito.html):
- carrito.html: `<ion-item-sliding><ion-item><ion-item-options side="end"><ion-item-option>Eliminar</ion-item-option></ion-item-options>...</ion-item>...</ion-item-sliding>`
- app.js: `sliding(row, () => { delete cart[row.dataset.id]; save(); draw(); });` y `export function sliding(row, remove){ row.querySelector('ion-item-option').addEventListener('click', remove); }`

Evidencia visual: gestos/01-swipe.png

Ionic utilizado: ion-content, ion-list, ion-item-sliding, ion-item, ion-item-options, ion-item-option, ion-card.
