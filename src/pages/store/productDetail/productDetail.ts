import { productService } from "../../../services/productService.ts";
import type { Product } from "../../../types/product.ts";


document.addEventListener("DOMContentLoaded", async () => {


    const productImg = document.getElementById("detailImage") as HTMLImageElement;
    const productTitle = document.getElementById("detailTitle") as HTMLHeadingElement;
    const productDescription = document.getElementById("detailDescription") as HTMLParagraphElement;
    const productPrice = document.getElementById("detailPrice") as HTMLParagraphElement;
    const backButton = document.getElementById("backButton") as HTMLButtonElement;



    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get("id") || "0");

    if (!productId) {
        console.error("No se encontró ningún ID en la URL");
        // window.location.href = "../home/home.html"; // Descomentá esto después
        return; // Corta la ejecución acá
    }

    try{

        const findProduct = await productService.getById(productId) as Product;

        productImg.src = findProduct.image;
        productTitle.textContent = findProduct.name;
        productDescription.textContent = findProduct.description;
        productPrice.textContent = `$${findProduct.price.toFixed(2)}`;

        backButton.addEventListener("click", () => {
            window.history.back();
    });
    } catch(error){
        console.error("Error al cargar los detalles: ", error)
        //window.location.href = "../home/home.html";
    }

});
