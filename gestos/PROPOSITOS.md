# Gestos en Nova Market

| Gesto | Propósito | Código y evidencia |
| --- | --- | --- |
| Deslizar para eliminar | Deslizar una fila del carrito revela Eliminar. Un toque posterior borra esa línea y recalcula el importe. | interfaces/carrito.html, app.js, sliding() y 01-swipe.png |
| Tirar para actualizar | Arrastrar hacia abajo desde el inicio del catálogo relee los productos y muestra la hora de actualización. | interfaces/catalogo.html, refresh() y 02-refresh.png |
| Pinza de dos dedos | Separar los dedos amplía la imagen hasta tres veces para examinar el artículo. Juntarlos reduce la escala. | pinch() y 03-pinch.png |
| Pulsación prolongada | Mantener el dedo sobre una tarjeta durante 550 ms abre las opciones de consultar o agregar el producto. | longPress() y 04-long-press.png |

Las capturas documentan gestos reproducidos con Ionic Core 8.4.3 en Chrome con emulación táctil. En el carrito se verificó ionDrag, el botón Eliminar y el total de RD$ 0 tras vaciar la lista. Falta la comprobación en un dispositivo físico o Android Emulator.
