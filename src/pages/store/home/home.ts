import { getCategories, PRODUCTS } from "../../../data/data.js";
import type { CartItem, Product } from "../../../types/product";


const productsContainer = document.querySelector(".products-container") as HTMLDivElement;
const logoutButton = document.getElementById("logout-btn") as HTMLButtonElement;

logoutButton?.addEventListener("click", () => {
    window.location.href = "/src/pages/auth/login/login.html";
});

function renderProducts(products: Product[]) {

    if (!productsContainer) return;

    productsContainer.innerHTML = "";

    products.forEach((product: Product) => {
        const productCard = document.createElement("div") as HTMLDivElement;
        productCard.classList.add("product-card");

        const productImage = document.createElement("img") as HTMLImageElement;
        productImage.src = product.imagen;
        productImage.alt = product.nombre;

        const productCategory = document.createElement("p") as HTMLParagraphElement;
        productCategory.textContent = product.categorias.map((cat: { nombre: string }) => cat.nombre).join(", ").toUpperCase();

        const productDescription = document.createElement("p") as HTMLParagraphElement;
        productDescription.textContent = product.descripcion;
        productDescription.classList.add("product-description");
        
        const productName = document.createElement("h3") as HTMLHeadingElement;
        productName.textContent = product.nombre;
        
        const productPrice = document.createElement("p") as HTMLParagraphElement;
        productPrice.textContent = `$${product.precio}`;
        productPrice.classList.add("product-price");
        
        const addToCartButton = document.createElement("button") as HTMLButtonElement;
        addToCartButton.textContent = "Agregar al carrito";
        addToCartButton.addEventListener("click", () => {
            const cartItem: CartItem [] = JSON.parse(localStorage.getItem("cart") || "[]");

            const existingItemIndex = cartItem.findIndex((item: CartItem) => item.id === product.id);

            if (existingItemIndex !== -1) {
                cartItem[existingItemIndex].cantidad ++;
            } else {
                cartItem.push({ ...product, cantidad: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cartItem));
            
            updateCartBadge();

            addToCartButton.textContent = "Agregado";
            addToCartButton.style.backgroundColor = "var(--primary-dark)";

            setTimeout(() => {
                addToCartButton.textContent = "Agregar al carrito";
                addToCartButton.style.backgroundColor = "var(--accent-orange)";
            }, 1000);
        });

        productCard.append(productImage, productCategory, productDescription, productName, productPrice, addToCartButton);
        productsContainer.appendChild(productCard);
    });

};


const searchInput = document.getElementById("searchInput") as HTMLInputElement;

    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = PRODUCTS.filter((product) =>
            product.nombre.toLowerCase().includes(searchTerm)
        );
        renderProducts(filteredProducts);
    });



function renderCategories() {
    const categoriasList = document.getElementById("categoriasList") as HTMLUListElement;
    const categorias = getCategories();

    if (!categoriasList) return;

    categoriasList.innerHTML = "";
    categorias.forEach((categoria: { nombre: string; id: number }) => {
        const categoryItem = document.createElement("li") as HTMLLIElement;
        categoryItem.textContent = categoria.nombre;
        categoriasList.classList.add("category-item");
        categoriasList.appendChild(categoryItem);
        
        categoryItem.addEventListener("click", () => {
            const filteredProducts = PRODUCTS.filter((product: Product) =>
                product.categorias.some((cat: { id: number }) => cat.id === categoria.id)
            );
            renderProducts(filteredProducts);
        });
    });
}

function updateCartBadge() {
    const cartItems: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const badge = document.getElementById("cart-count") as HTMLSpanElement;
    if (badge) {
        const totalCount = cartItems.reduce((sum: number, item: CartItem) => sum + item.cantidad, 0);
        badge.textContent = totalCount.toString();
        badge.style.display = totalCount > 0 ? "inline-block" : "none";
    }
}


renderProducts(PRODUCTS);
renderCategories();
updateCartBadge();