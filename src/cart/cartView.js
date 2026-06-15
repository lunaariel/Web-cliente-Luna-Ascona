import {
    clearCart,
    decreaseCartItem,
    getCartCount,
    getCartItems,
    getCartTotal,
    increaseCartItem,
    removeCartItem
} from "./cart.js";

function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

function renderEmptyCart() {
    return `
        <div class="cart-empty-state">
            <p class="mb-1">Tu carrito esta vacio.</p>
            <small>Agrega productos desde el detalle.</small>
        </div>
    `;
}

function renderCartItem(item) {
    return `
        <article class="cart-item">
            <img src="${item.image}" alt="${item.title}" class="cart-item-image">

            <div class="cart-item-content">
                <div class="d-flex justify-content-between align-items-start gap-2">
                    <h6 class="cart-item-title mb-1">${item.title}</h6>
                    <button
                        class="btn btn-sm btn-outline-secondary cart-remove-btn"
                        type="button"
                        data-action="remove"
                        data-id="${item.id}"
                    >
                        x
                    </button>
                </div>

                <p class="cart-item-price mb-2">${formatPrice(item.price)}</p>

                <div class="d-flex justify-content-between align-items-center gap-3">
                    <div class="cart-item-controls">
                        <button type="button" class="btn btn-sm btn-outline-dark" data-action="decrease" data-id="${item.id}">-</button>
                        <span>${item.qtty}</span>
                        <button type="button" class="btn btn-sm btn-outline-dark" data-action="increase" data-id="${item.id}">+</button>
                    </div>

                    <strong>${formatPrice(item.price * item.qtty)}</strong>
                </div>
            </div>
        </article>
    `;
}

export function syncCartView() {
    const cartItemsContainer = document.querySelector("#cart-items");
    const cartCount = document.querySelector("#cart-count");
    const cartTotalItems = document.querySelector("#cart-total-items");
    const cartTotal = document.querySelector("#cart-total");
    const checkoutBtn = document.querySelector("#checkout-btn");

    const cartItems = getCartItems();
    const totalItems = getCartCount();
    const totalPrice = getCartTotal();

    cartItemsContainer.innerHTML = cartItems.length
        ? cartItems.map(renderCartItem).join("")
        : renderEmptyCart();

    cartCount.textContent = totalItems;
    cartTotalItems.textContent = totalItems;
    cartTotal.textContent = formatPrice(totalPrice);
    checkoutBtn.disabled = cartItems.length === 0;
}

function bindCartEvents() {
    const cartItemsContainer = document.querySelector("#cart-items");
    const clearCartBtn = document.querySelector("#clear-cart-btn");
    const checkoutBtn = document.querySelector("#checkout-btn");

    cartItemsContainer.addEventListener("click", (event) => {
        const button = event.target.closest("[data-action]");

        if (!button) {
            return;
        }

        const productId = Number(button.dataset.id);
        const action = button.dataset.action;

        if (action === "increase") {
            increaseCartItem(productId);
        }

        if (action === "decrease") {
            decreaseCartItem(productId);
        }

        if (action === "remove") {
            removeCartItem(productId);
        }

        syncCartView();
    });

    clearCartBtn.addEventListener("click", () => {
        clearCart();
        syncCartView();
    });

    checkoutBtn.addEventListener("click", () => {
        const successModalElement = document.querySelector("#checkoutSuccessModal");
        const cartOffcanvasElement = document.querySelector("#cartOffcanvas");
        const bootstrapOffcanvas = bootstrap.Offcanvas.getInstance(cartOffcanvasElement);
        const successModal = new bootstrap.Modal(successModalElement);

        clearCart();
        syncCartView();
        bootstrapOffcanvas?.hide();
        successModal.show();
    });
}

export function initCartView() {
    bindCartEvents();
    syncCartView();
}
