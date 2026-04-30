import { getCategories, PRODUCTS } from "../../../data/data.js";
import type { CartItem, Product } from "../../../types/product";

// Seleccionamos los elementos del DOM que vamos a utilizar
const productsContainer = document.getElementById("productsGrid") as HTMLDivElement;
const logoutButton = document.getElementById("logout-btn") as HTMLButtonElement;

// Si el botón de logout existe, le agregamos un evento para redirigir al login
logoutButton.addEventListener("click", () => {
    window.location.href = "/src/pages/auth/login/login.html";
});

// Función para renderizar los productos en la página

function renderProducts(products: Product[]) {

    // Si no hay contenedor, no hacemos nada
    if (!productsContainer) return;

    productsContainer.innerHTML = "";

    // Iteramos sobre los productos y creamos las tarjetas correspondientes
    products.forEach((product: Product) => {
        const productCard = document.createElement("div") as HTMLDivElement;
        productCard.classList.add("card");

        const productImage = document.createElement("img") as HTMLImageElement;
        productImage.classList.add("card__image");
        productImage.src = product.imagen;
        productImage.alt = product.nombre;

        const productCategory = document.createElement("p") as HTMLParagraphElement;
        productCategory.textContent = product.categorias.map((cat: { nombre: string }) => cat.nombre).join(", ").toUpperCase();
        productCategory.classList.add("card__category");

        const productDescription = document.createElement("p") as HTMLParagraphElement;
        productDescription.textContent = product.descripcion;
        productDescription.classList.add("card__description");
        
        const productName = document.createElement("h3") as HTMLHeadingElement;
        productName.textContent = product.nombre;
        productName.classList.add("card__name");
        
        const productPrice = document.createElement("p") as HTMLParagraphElement;
        productPrice.textContent = `$${product.precio}`;
        productPrice.classList.add("card__price");
        
        const addToCartButton = document.createElement("button") as HTMLButtonElement;
        addToCartButton.textContent = "Agregar al carrito";
        addToCartButton.classList.add("card__btn");
        // Evento para agregar el producto al carrito
        addToCartButton.addEventListener("click", () => {

            // Obtenemos el carrito actual del localStorage o inicializamos uno nuevo
            const cartItem: CartItem [] = JSON.parse(localStorage.getItem("cart") || "[]");

            // Verificamos si el producto ya está en el carrito
            const existingItemIndex = cartItem.findIndex((item: CartItem) => item.id === product.id);

            // Si el producto ya está en el carrito, incrementamos la cantidad, de lo contrario, lo agregamos con cantidad 1
            if (existingItemIndex !== -1) {
                cartItem[existingItemIndex].cantidad ++;
            } else {
                cartItem.push({ ...product, cantidad: 1 });
            }

            // Guardamos el carrito actualizado en el localStorage
            localStorage.setItem("cart", JSON.stringify(cartItem));
            
            updateCartBadge();

            addToCartButton.textContent = "Agregado";
            addToCartButton.style.backgroundColor = "var(--primary-dark)";

            setTimeout(() => {
                addToCartButton.textContent = "Agregar al carrito";
                addToCartButton.style.backgroundColor = "var(--accent-orange)";
            }, 1000);
        });


        // Agregamos los elementos a la tarjeta y luego la tarjeta al contenedor
        productCard.append(productImage, productCategory, productDescription, productName, productPrice, addToCartButton);
        productsContainer.appendChild(productCard);
    });

};

// Función para manejar la búsqueda de productos
const searchInput = document.getElementById("searchInput") as HTMLInputElement;

    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = PRODUCTS.filter((product) =>
            product.nombre.toLowerCase().includes(searchTerm)
        );
        renderProducts(filteredProducts);
    });

// Renderizado inicial de productos y categorías

function renderCategories() {
    const categoriasList = document.getElementById("categoriasList") as HTMLUListElement;
    const categorias = getCategories();

    if (!categoriasList) return;

    categoriasList.innerHTML = "";

    // Opción para mostrar todos los productos
    const allItem = document.createElement("li") as HTMLLIElement;
        allItem.textContent = "Todas";
        allItem.classList.add("sidebar__item");

        allItem.addEventListener("click", () => {
            renderProducts(PRODUCTS);
        });

        categoriasList?.appendChild(allItem);
    
        // Iteramos sobre las categorías y creamos los elementos correspondientes
    categorias.forEach((categoria: { nombre: string; id: number }) => {

        const categoryItem = document.createElement("li") as HTMLLIElement;
        categoryItem.textContent = categoria.nombre;
        categoryItem.classList.add("sidebar__item");
        categoriasList?.appendChild(categoryItem);
        
        // Evento para filtrar los productos por categoría al hacer clic en el nombre de la categoría
        categoryItem?.addEventListener("click", () => {
            const filteredProducts = PRODUCTS.filter((product: Product) =>
                product.categorias.some((cat: { id: number }) => cat.id === categoria.id)
            );
            renderProducts(filteredProducts);
        });
    });
}

// Función para actualizar el contador del carrito en el header


function updateCartBadge() {
    const cartItems: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const badge = document.getElementById("cart-count") as HTMLSpanElement;
    if (badge) {
        const totalCount = cartItems.reduce((sum: number, item: CartItem) => sum + item.cantidad, 0);
        badge.textContent = totalCount.toString();
        badge.style.display = totalCount > 0 ? "inline-block" : "none";
    }
}

// Renderizado inicial

renderProducts(PRODUCTS);
renderCategories();
updateCartBadge();