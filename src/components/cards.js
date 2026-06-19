import { addToCart } from "../cart/cart.js";
import { syncCartView } from "../cart/cartView.js";
import { Modal } from "./modal.js";

export function RenderCards(products) {

    let productList = document.querySelector("#product-list");

    let template = '';

    products.forEach((p) => {

        template += `
            <div class="col">
                <div
                    class="card card-product justify-content-center align-items-center"
                    id="card-${p.id}"
                    role="button"
                    tabindex="0"
                    aria-label="View details for ${p.title}"
                >
                    <img src="${p.image}" class="card-img-top card-product-image" alt="${p.title}">
                    <span class="card-details-hint">View details</span>
                    
                    <div class="card-body card-product-body">
                        <h5 class="card-title text-truncate">${p.title}</h5>

                        <div class="card-product-footer">
                            <p class="card-price mb-0">USD $${p.price}</p>

                            <button
                                type="button"
                                class="btn card-cart-btn"
                                id="add-btn-${p.id}"
                                aria-label="Add ${p.title} to cart"
                            >
                                <span class="card-cart-icon" aria-hidden="true">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H1a.5.5 0 0 1 .49.402L1.89 3H14.5a.5.5 0 0 1 .49.598l-1.5 7A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.49-.402L1.01 2H.5A.5.5 0 0 1 0 1.5M4.415 10h8.18l1.286-6H3.13z"/>
                                        <path d="M5.5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m5 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
                                    </svg>
                                </span>
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

    });

    productList.innerHTML = template;

    products.forEach((p) => {
        let card = document.querySelector(`#card-${p.id}`);
        let addBtn = document.querySelector(`#add-btn-${p.id}`);

        card.addEventListener('click', () => {
            Modal(p);
        });

        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                Modal(p);
            }
        });

        addBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            addToCart(p, 1);
            syncCartView();
        });
    });
}
