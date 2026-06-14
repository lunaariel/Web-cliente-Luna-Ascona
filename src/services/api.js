export function getProducts() {
    return fetch('https://fakestoreapi.com/products')
        .then(response => response.json());
}