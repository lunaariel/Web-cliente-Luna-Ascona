import { RenderCards } from './components/cards.js';
import { getProducts } from './services/api.js';
import { initLocalStorage } from './storage/storage.js';

initLocalStorage();

getProducts().then((products) => {

    RenderCards(products);

    let inputSearch = document.querySelector('#inputSearch');

    let home = document.querySelector('#home');
    let electronics = document.querySelector('#electronics');
    let jewelery = document.querySelector('#jewelery');
    let mensClothing = document.querySelector('#mens-clothing');
    let womensClothing = document.querySelector('#women-s-clothing');

    home.addEventListener('click', () => {
        RenderCards(products);
    });

    electronics.addEventListener('click', () => {
        let result = products.filter((p) => p.category === 'electronics');
        RenderCards(result);
    });

    jewelery.addEventListener('click', () => {
        let result = products.filter((p) => p.category === 'jewelery');
        RenderCards(result);
    });

    mensClothing.addEventListener('click', () => {
        let result = products.filter((p) => p.category === "men's clothing");
        RenderCards(result);
    });

    womensClothing.addEventListener('click', () => {
        let result = products.filter((p) => p.category === "women's clothing");
        RenderCards(result);
    });

    inputSearch.addEventListener('input', (event) => {
        let query = event.target.value;

        if (query !== '') {
            let result = products.filter((p) =>
                p.title.toLowerCase().includes(query.toLowerCase())
            );

            RenderCards(result);
            return;
        }

        RenderCards(products);
    });

});
