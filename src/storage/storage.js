const STORAGE_KEY = 'cart';

export function initLocalStorage() {
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    }
}

export function saveToLocalStorage(item) {
    let cart = getFromLocalStorage();
    cart.push(item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export function getFromLocalStorage() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function setToLocalStorage(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function updateItemInLocalStorage(itemId, qtty) {
    let dataStorage = getFromLocalStorage();

    let idx = dataStorage.findIndex((p) => p.id === itemId);

    if (idx !== -1) {
        dataStorage[idx].qtty += qtty;
        setToLocalStorage(dataStorage);
    }

    return idx;
}