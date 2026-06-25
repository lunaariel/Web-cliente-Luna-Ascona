# Luna / Ascona Storefront

Este proyecto consiste en una tienda online del lado del cliente construida con JavaScript vanilla, Bootstrap 5 y la [Fake Store API](https://fakestoreapi.com/). Su objetivo es demostrar una solución front-end simple para explorar productos, ver su detalle, administrar un carrito local y practicar buenas separaciones de lógica sin sobre-complejizar la arquitectura.

## Lectura rápida

1. Abrir `C:\Users\mateo\Desktop\ISTEA\Lab. Apps Web Cliente\Web-cliente-Luna-Ascona\index.html` en el navegador, o servir la carpeta con un servidor estático simple.
2. Explorar productos, filtrar por categoría o buscar por nombre.
3. Abrir una card para ver el detalle, agregar productos al carrito y simular una compra.

## Objetivo del proyecto

El proyecto fue desarrollado para practicar un flujo de e-commerce pequeño sin incorporar frameworks ni herramientas innecesarias. Los focos principales fueron:

- consumir una API externa de productos
- renderizar un catálogo responsive
- separar la lógica en módulos pequeños y entendibles
- persistir el carrito con `localStorage`
- mantener un código fácil de extender y de trabajar en equipo

## Qué incluye la aplicación

| Área | Implementación |
|------|----------------|
| Fuente de productos | Fake Store API mediante `fetch()` |
| Stack de interfaz | HTML + CSS + Bootstrap 5 |
| Persistencia | `localStorage` |
| Descubrimiento de productos | Buscador + filtros por categoría |
| Detalle de producto | Modal de Bootstrap |
| Carrito | Offcanvas de Bootstrap + helpers propios |
| Feedback visual | Toast al agregar + modal de compra exitosa |
| Responsive | Desktop, Tablet y Mobile |

## Cómo se construyó

La aplicación sigue una estructura modular simple:

- `src/services/api.js` obtiene los productos desde la API.
- `src/components/cards.js` renderiza la grilla y controla las interacciones de las cards.
- `src/components/modal.js` arma el modal de detalle del producto.
- `src/components/contador.js` administra el selector de cantidad dentro del modal.
- `src/cart/cart.js` contiene las operaciones de datos del carrito.
- `src/cart/cartView.js` se ocupa del render del carrito, totales, toast y simulación de checkout.
- `src/storage/storage.js` encapsula el acceso a `localStorage`.
- `src/index.js` inicializa la aplicación y conecta filtros/búsqueda con el render.

### Decisiones principales de implementación

1. **JavaScript vanilla en módulos**  
   Se priorizó una solución liviana, clara y fácil de seguir.

2. **Lógica del carrito separada**  
   Los datos y la vista del carrito se dividieron en archivos dedicados para reducir acoplamiento y conflictos de merge.

3. **Bootstrap para interacciones**  
   Se utilizaron modal, offcanvas y toast para resolver interacciones comunes sin agregar dependencias nuevas.

4. **Responsive en tres niveles**  
   La interfaz fue adaptada para Desktop, Tablet y Mobile ajustando anchos, alturas, espaciados y distribución de componentes.

## Flujo principal de usuario

1. Se consultan los productos desde Fake Store API.
2. Se renderiza el catálogo en formato de cards.
3. El usuario puede filtrar por categoría o buscar por nombre.
4. Al hacer click en una card, se abre el detalle del producto.
5. El producto puede agregarse al carrito desde la card o desde el modal.
6. El carrito se guarda en `localStorage`.
7. Un toast informa qué producto se agregó y con qué cantidad.
8. El checkout se simula vaciando el carrito y mostrando un modal de compra exitosa.

## Estructura del proyecto

```text
Web-cliente-Luna-Ascona/
├── index.html
├── README.md
├── css/
│   └── style.css
└── src/
    ├── index.js
    ├── cart/
    │   ├── cart.js
    │   └── cartView.js
    ├── components/
    │   ├── cards.js
    │   ├── contador.js
    │   └── modal.js
    ├── services/
    │   └── api.js
    └── storage/
        └── storage.js
```

## Consideraciones

- El flujo de checkout es únicamente una simulación visual.
- El carrito se guarda localmente en el navegador.
- El proyecto no requiere build step para ejecutarse.

## Próximos pasos posibles

- agregar mejor manejo de errores ante fallas de la API
- reforzar accesibilidad y navegación por teclado
- conectar el checkout a una lógica real de back-end
