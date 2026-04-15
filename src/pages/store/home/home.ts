import { PRODUCTS } from "../../../data/data.js";
import type { CartItem, Product } from "../../../types/product";


const productsContainer = document.querySelector(".products-container") as HTMLDivElement;


function renderProducts(products: Product[]) {

    if (!productsContainer) return;

    productsContainer.innerHTML = "";

    products.forEach((product) => {
        const productCard = document.createElement("div") as HTMLDivElement;
        productCard.classList.add("product-card");

        const productImage = document.createElement("img") as HTMLImageElement;
        productImage.src = product.imagen;
        productImage.alt = product.nombre;

        const productName = document.createElement("h3") as HTMLHeadingElement;
        productName.textContent = product.nombre;

        const productPrice = document.createElement("p") as HTMLParagraphElement;
        productPrice.textContent = `$${product.precio}`;

        const addToCartButton = document.createElement("button") as HTMLButtonElement;
        addToCartButton.textContent = "Agregar al carrito";
        addToCartButton.addEventListener("click", () => {
            const cartItem: CartItem [] = JSON.parse(localStorage.getItem("cart") || "[]");

            const existingItemIndex = cartItem.findIndex((item) => item.id === product.id);

            if (existingItemIndex >= 0) {
                cartItem[existingItemIndex].cantidad += 1;
            } else {
                cartItem.push({ ...product, cantidad: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cartItem));
            alert(`${product.nombre} agregado al carrito!`); // Feedback visual para el usuario
        });

        productCard.appendChild(productImage);
        productCard.appendChild(productName);
        productCard.appendChild(productPrice);
        productCard.appendChild(addToCartButton);
        productsContainer.appendChild(productCard);
    });

    const searchInput = document.getElementById("searchInput") as HTMLInputElement;

    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = PRODUCTS.filter((product) =>
            product.nombre.toLowerCase().includes(searchTerm)
        );
        renderProducts(filteredProducts);
    });

};

renderProducts(PRODUCTS);