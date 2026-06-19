import { getFromLocalStorage, setToLocalStorage } from "../storage/storage.js";

function normalizeCartItem(product, qtty) {
    return {
        id: product.id,
        title: product.title,
        price: Number(product.price),
        image: product.image,
        qtty
    };
}

export function getCartItems() {
    return getFromLocalStorage();
}

export function addToCart(product, qtty = 1) {
    const cartItems = getCartItems();
    const itemIndex = cartItems.findIndex((item) => item.id === product.id);

    if (itemIndex === -1) {
        cartItems.push(normalizeCartItem(product, qtty));
    } else {
        cartItems[itemIndex].qtty += qtty;
    }

    setToLocalStorage(cartItems);
}

export function increaseCartItem(productId) {
    const cartItems = getCartItems().map((item) => {
        if (item.id === productId) {
            return {
                ...item,
                qtty: item.qtty + 1
            };
        }

        return item;
    });

    setToLocalStorage(cartItems);
}

export function decreaseCartItem(productId) {
    const cartItems = getCartItems()
        .map((item) => {
            if (item.id === productId) {
                return {
                    ...item,
                    qtty: item.qtty - 1
                };
            }

            return item;
        })
        .filter((item) => item.qtty > 0);

    setToLocalStorage(cartItems);
}

export function removeCartItem(productId) {
    const cartItems = getCartItems().filter((item) => item.id !== productId);
    setToLocalStorage(cartItems);
}

export function clearCart() {
    setToLocalStorage([]);
}

export function getCartCount() {
    return getCartItems().reduce((total, item) => total + item.qtty, 0);
}

export function getCartTotal() {
    return getCartItems().reduce((total, item) => total + (item.price * item.qtty), 0);
}
