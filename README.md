# Tienda Web Cliente

Este proyecto fue desarrollado por Ariel Luna y Mateo Ascona para la materia **Laboratorio de Aplicación Web Cliente** de ISTEA.

La aplicación consiste en una tienda online del lado del cliente construida con **HTML**, **CSS**, **JavaScript vanilla** y **Bootstrap 5**. Los productos se obtienen desde la [Fake Store API](https://fakestoreapi.com/), y el objetivo principal fue aplicar conceptos de manipulación del DOM, consumo de APIs, modularización del código y persistencia local de datos.

## Objetivo

El trabajo busca representar un flujo básico de e-commerce tanto en navegador como en mobile.

## Funcionalidades

La aplicación permite:

- visualizar un catálogo de productos
- buscar productos por nombre
- filtrar productos por categoría
- abrir el detalle de cada producto en un modal
- agregar productos al carrito
- guardar el carrito en `localStorage`
- vaciar el carrito
- simular una compra mediante un checkout visual

## Tecnologías utilizadas

- **HTML5**
- **CSS3**
- **JavaScript (ES Modules)**
- **Bootstrap 5**

## Ejecución del proyecto

No se requiere proceso de build ni instalación de dependencias.

Para ejecutar el proyecto:

1. Abrir el archivo `index.html` en un navegador.
2. Como alternativa, levantar la carpeta con cualquier servidor estático local.

## Estructura del proyecto

```text
Web-cliente-Luna-Ascona/
├── index.html
├── README.md
├── css/
│   └── style.css
├── resources/
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

## Descripción de módulos

- `src/index.js`: inicializa la aplicación, obtiene los productos y conecta búsqueda y filtros.
- `src/services/api.js`: realiza la consulta a la API de productos.
- `src/components/cards.js`: renderiza las cards y gestiona sus interacciones.
- `src/components/modal.js`: muestra el detalle del producto seleccionado.
- `src/components/contador.js`: administra la cantidad elegida dentro del modal.
- `src/cart/cart.js`: contiene la lógica del carrito.
- `src/cart/cartView.js`: renderiza el carrito, actualiza totales y controla el checkout simulado.
- `src/storage/storage.js`: encapsula el acceso a `localStorage`.

## Flujo principal de uso

1. La aplicación consulta los productos desde Fake Store API.
2. Los productos se renderizan en forma de cards.
3. El usuario puede buscar o filtrar por categoría.
4. Al seleccionar un producto, se abre un modal con su detalle.
5. El producto puede agregarse al carrito desde la card o desde el modal.
6. El carrito queda almacenado localmente en el navegador.
7. El checkout vacía el carrito y muestra una confirmación visual de compra.

## Consideraciones

- El checkout implementado es una simulación visual; no existe procesamiento real de pagos.
- El carrito se conserva localmente mediante `localStorage`.
- Si la API no responde correctamente, los productos no podrán cargarse.

## Posibles mejoras

- incorporar manejo de errores más claro ante fallas de la API
- agregar validaciones visuales adicionales
- conectar el checkout con una lógica real de backend
- ampliar filtros y opciones de búsqueda

## Autores

- Ariel Luna
- Mateo Ascona
