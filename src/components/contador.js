export function contador(id) {
    let template = `
        <div class="d-flex justify-content-center align-items-center gap-3 my-3">
            <button id="incrementBtn-${id}" class="btn btn-dark">-</button>
            <span id="contador-${id}">1</span>
            <button id="decrementBtn-${id}" class="btn btn-dark">+</button>
        </div>
    `;

    return template;
}

export function addEventListeners(id, cantidad = 1) {
    let btnIncrement = document.querySelector(`#incrementBtn-${id}`);
    let btnDecrement = document.querySelector(`#decrementBtn-${id}`);
    let spanContador = document.querySelector(`#contador-${id}`);

    // Botón "-"
    btnIncrement.addEventListener('click', () => {
        if (cantidad > 1) {
            cantidad--;
            spanContador.textContent = cantidad;
        }
    });

    // Botón "+"
    btnDecrement.addEventListener('click', () => {
        cantidad++;
        spanContador.textContent = cantidad;
    });
}