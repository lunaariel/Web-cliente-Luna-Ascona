import { addToCart } from "../cart/cart.js";
import { syncCartView } from "../cart/cartView.js";
import { contador, addEventListeners } from "./contador.js";

export function Modal(product) {
    let modal = document.querySelector("#productModal");

    let template = `
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">${product.title.toUpperCase()}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
                <div class="row align-items-center">

                    <div class="col-md-6 text-center">
                        <img 
                            src="${product.image}" 
                            style="height: 400px; width: 100%; object-fit: contain;"
                            alt="${product.title}"
                        >
                    </div>

                    <div class="col-md-6">
                        <p>${product.description}</p>
                        <p><strong>Price: USD $${product.price}</strong></p>

                        ${contador(product.id)}
                    </div>

                </div>
            </div>
                
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-dark" id="addToCartBtn-${product.id}">Add to cart</button>
            </div>
        </div>
    </div>
    `;
    
    modal.innerHTML = template;

    addEventListeners(product.id, 1);

    let BtnAddToCart = document.querySelector(`#addToCartBtn-${product.id}`);

    BtnAddToCart.addEventListener('click', () => {
        let qtty = parseInt(document.querySelector(`#contador-${product.id}`).textContent);
        addToCart(product, qtty);
        syncCartView();
        bootstrap.Modal.getInstance(modal)?.hide();
    });

    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
}
