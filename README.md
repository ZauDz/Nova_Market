# Nova Market · Semana 3

Trabajo individual de Zaury Jose Diaz Hiraldo. Aplicación de práctica para seleccionar artículos y retirarlos en Mao. Los pedidos se guardan únicamente en la sesión de demostración. El carrito persiste en el navegador.

## Abrir en VS Code

Abra la carpeta que contiene package.json. Con Node.js LTS y npm, ejecute npm install y luego npm start. En Windows también puede abrir Iniciar.cmd. El instalador instala Ionic Core 8.4.3 dentro del proyecto. La variante sin npm descarga la distribución de npm y comprueba su integridad SHA-512. El servidor usa Node.js. Si falta Node, instale la versión LTS desde https://nodejs.org/.

Abra http://localhost:8100. Desde Android Studio Emulator, la dirección del equipo anfitrión es http://10.0.2.2:8100. Desde un teléfono en la misma red, use la IP local del equipo y el puerto 8100. El proyecto usa Ionic Web Components, HTML y módulos JavaScript.

## Pantallas

| Pantalla | Componentes de la rúbrica | Prueba |
| --- | --- | --- |
| Catálogo | ion-card, ion-list, ion-refresher | Buscar 750 y comprobar que queda la botella. Borrar y probar una pulsación larga. |
| Detalle | ion-card, ion-list, ion-fab | Abrir la mochila, ampliar con dos dedos y restablecer con 1×. Agregar al carrito. |
| Carrito | ion-list, ion-item-sliding, ion-card | Deslizar, tocar Eliminar y verificar el total. Si quedan productos, confirmar el pedido de prueba. |

El menú tiene tres destinos e iconos. El encabezado contiene el logo original. index.html define ion-menu e ion-split-pane con el punto de cambio de tablet en 768 px. menu/menu.html contiene sus opciones.

## Preparación HEI

Con Ionic instalado, abra /hei/tarjeta.html para ejecutar la tarjeta de la Parte A. El carrito adapta el ejemplo de la Parte B. En escritura de izquierda a derecha, side="end" sitúa Eliminar a la derecha. Se revela arrastrando la fila a la izquierda.

En la API de Ionic, createGesture configura el reconocedor. onStart indica qué hacer al comenzar y enable(true) habilita la escucha. La API pública documentada no necesita una llamada gesture.start(). Un swipe se reconoce por desplazamiento. Una pulsación larga exige mantener el contacto con poco movimiento. Esta implementación usa Pointer Events para la pinza y la pulsación, y componentes Ionic para las otras dos interacciones.

Para un mapa de retiro en Mao priorizaría arrastrar con un dedo para explorar los alrededores de la tienda. La pinza resulta útil para pasar de una vista general a una calle concreta.

## Estado de verificación

Las capturas se tomaron ejecutando Ionic Core 8.4.3 con Chrome en emulación táctil. Se comprobó la hidratación de los componentes, la búsqueda por capacidad, el menú móvil y de tablet y los cuatro gestos. El deslizamiento emitió ionDrag y mostró el botón Eliminar. Al tocarlo, el carrito quedó vacío y el total bajó a RD$ 0. Se verificó la tarjeta de la Parte A en hei/tarjeta-en-ejecucion.png. La prueba completa terminó sin errores de JavaScript.

El instalador verificó el SHA-512 del paquete oficial. El ZIP distribuido incluye vendor/core-8.4.3.tgz para instalar la distribución web sin descargar dependencias de npm. Desde el repositorio también se puede usar npm ci. La entrada principal utiliza Ionic. El modo de respaldo requiere el parámetro explícito ?vista=respaldo. La validación se realizó en Chrome con pantalla táctil emulada. Queda pendiente la prueba física o en Android Emulator.
## Recursos

Guía de Componentes de Interfaz de Usuario Ionic, ISW-307, UAPA, partes A y B. Documentación de gestos de Ionic: https://ionicframework.com/docs/utilities/gestures . Android Touch Gestures: https://developer.android.com/develop/ui/views/touch-and-input/gestures . Los dos enlaces de YouTube de la consigna no se pudieron reproducir en esta sesión.

## VS Code

Abra esta carpeta y pulse F5. La configuración Nova Market con Ionic ejecuta el instalador y el servidor. El instalador también acepta el archivo oficial core-8.4.3.tgz en Descargas y comprueba su SHA-512 antes de extraerlo. package-lock.json fija las versiones para instalaciones mediante npm ci.


