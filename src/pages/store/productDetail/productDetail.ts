import type { Product } from "../../../types/product";
import { PRODUCTS } from "../../../data/data.ts";


// Función para cargar los detalles del producto

document.addEventListener("DOMContentLoaded", () => {

    const productImg = document.getElementById("detailImage") as HTMLImageElement;
    const productTitle = document.getElementById("detailTitle") as HTMLHeadingElement;
    const productDescription = document.getElementById("detailDescription") as HTMLParagraphElement;
    const productPrice = document.getElementById("detailPrice") as HTMLParagraphElement;
    const backButton = document.getElementById("backButton") as HTMLButtonElement;



    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get("id") || "0");

    const productoEncontrado: Product | undefined = PRODUCTS.find((p: Product) => p.id === productId);

    if (!productoEncontrado) {
        alert("Producto no encontrado");
        window.location.href = "../home/home.html";
        return;
    }

    productImg.src = productoEncontrado.imagen;
    productTitle.textContent = productoEncontrado.nombre;
    productDescription.textContent = productoEncontrado.descripcion;
    productPrice.textContent = `$${productoEncontrado.precio.toFixed(2)}`;

    backButton.addEventListener("click", () => {
        window.history.back();
    });
});
