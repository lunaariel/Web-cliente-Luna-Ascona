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
    let value = Number(price);

    if (isNaN(value)) {
        value = 0;
    }

    return `$${value.toFixed(2)}`;
}

export function showAddToCartToast(productTitle, quantity) {
    const toastElement = document.querySelector("#cartToast");
    const toastProduct = document.querySelector("#cartToastProduct");
    const toastQuantity = document.querySelector("#cartToastQuantity");

    if (!toastElement || !toastProduct || !toastQuantity) {
        return;
    }

    toastProduct.textContent = productTitle || "Product";
    toastQuantity.textContent = `Quantity: ${quantity || 1}`;

    const toast = bootstrap.Toast.getOrCreateInstance(toastElement, {
        delay: 1500,
        autohide: true
    });

    toast.show();
}

function renderEmptyCart() {
    return `
        <div class="cart-empty-state">
            <p class="mb-1">Your cart is empty.</p>
            <small>Add products from the details view.</small>
        </div>
    `;
}

function renderCartItem(item) {
    let id = item.id;
    let title = item.title || "Product";
    let image = item.image || "";
    let price = Number(item.price);

    if (isNaN(price)) {
        price = 0;
    }

    let qtty = Number(item.qtty);

    if (isNaN(qtty) || qtty < 1) {
        qtty = 1;
    }

    return `
        <article class="cart-item">
            <img src="${image}" alt="${title}" class="cart-item-image">

            <div class="cart-item-content">
                <div class="d-flex justify-content-between align-items-start gap-2">
                    <h6 class="cart-item-title mb-1">${title}</h6>

                    <button
                        class="btn btn-sm btn-outline-secondary cart-remove-btn"
                        type="button"
                        data-action="remove"
                        data-id="${id}"
                    >
                        x
                    </button>
                </div>

                <p class="cart-item-price mb-2">${formatPrice(price)}</p>

                <div class="d-flex justify-content-between align-items-center gap-3">
                    <div class="cart-item-controls">
                        <button 
                            type="button" 
                            class="btn btn-sm btn-outline-dark" 
                            data-action="decrease" 
                            data-id="${id}"
                        >
                            -
                        </button>

                        <span>${qtty}</span>

                        <button 
                            type="button" 
                            class="btn btn-sm btn-outline-dark" 
                            data-action="increase" 
                            data-id="${id}"
                        >
                            +
                        </button>
                    </div>

                    <strong>${formatPrice(price * qtty)}</strong>
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

    if (!cartItemsContainer || !cartCount || !cartTotalItems || !cartTotal || !checkoutBtn) {
        return;
    }

    const cartItems = getCartItems();

    let totalItems = Number(getCartCount());

    if (isNaN(totalItems)) {
        totalItems = 0;
    }

    let totalPrice = Number(getCartTotal());

    if (isNaN(totalPrice)) {
        totalPrice = 0;
    }

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

    if (!cartItemsContainer || !clearCartBtn || !checkoutBtn) {
        return;
    }

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

        clearCart();
        syncCartView();

        if (cartOffcanvasElement) {
            const bootstrapOffcanvas = bootstrap.Offcanvas.getInstance(cartOffcanvasElement);
            bootstrapOffcanvas?.hide();
        }

        if (successModalElement) {
            const successModal = new bootstrap.Modal(successModalElement);
            successModal.show();
        }
    });
}

export function initCartView() {
    bindCartEvents();
    syncCartView();
}