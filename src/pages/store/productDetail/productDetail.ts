import { addToCart, updateCartCount } from "../../../services/cartService.ts";
import { productService } from "../../../services/productService.ts";
import type { Product } from "../../../types/product.ts";



document.addEventListener("DOMContentLoaded", async () => {

    const container = document.getElementById("detailContainer") as HTMLDivElement;
    const productDetailMedia = document.createElement("div") as HTMLDivElement;
    productDetailMedia.classList.add('product-detail__media');
    const productImg = document.createElement('img') as HTMLImageElement;
    productImg.classList.add("product-detail__image");
    const productDetailInfo = document.createElement("div") as HTMLDivElement;
    productDetailInfo.classList.add('product-detail__info');
    const productDetailTitle = document.createElement("h2") as HTMLHeadingElement;
    productDetailTitle.classList.add("product-detail__title");
    const productDetailDescription = document.createElement("p") as HTMLParagraphElement;
    productDetailDescription.classList.add("product-detail__description");
    const productDetailBadge = document.createElement("span") as HTMLSpanElement;
    productDetailBadge.classList.add("product-detail__badge");
    const productDetailPrice = document.createElement("p") as HTMLParagraphElement;
    productDetailPrice.classList.add("product-detail__price");
    const productDetailQuantityWrapper = document.createElement("div") as HTMLDivElement;
    productDetailQuantityWrapper.classList.add("product-detail__quantity--wrapper");
    const productDetailQuantityLabel = document.createElement("span") as HTMLSpanElement;
    productDetailQuantityLabel.classList.add("product-detail__quantity-label");
    const quantityControls = document.createElement("div") as HTMLDivElement;
    quantityControls.classList.add("quantity-controls");
    const decreaseBtn = document.createElement("button") as HTMLButtonElement;
    decreaseBtn.classList.add("quantity-controls__btn");
    decreaseBtn.id = "decreaseBtn";
    decreaseBtn.textContent = "-";
    const quantityValue = document.createElement("span") as HTMLSpanElement;
    quantityValue.classList.add("quantity-controls__value");
    quantityValue.id = "quantityValue";
    quantityValue.textContent = "1";
    const increaseBtn = document.createElement("button") as HTMLButtonElement;
    increaseBtn.classList.add("quantity-controls__btn");
    increaseBtn.id = "increaseBtn";
    increaseBtn.textContent = "+";
    const productDetailActions = document.createElement("div") as HTMLDivElement;
    productDetailActions.classList.add("product-detail__actions");
    const addToCartBtn = document.createElement("button") as HTMLButtonElement;
    addToCartBtn.classList.add("product-detail__add-btn");
    addToCartBtn.id = "addToCartBtn";
    addToCartBtn.textContent = "🛒 Agregar al Carrito";
    const backButton = document.createElement("button") as HTMLButtonElement;
    backButton.classList.add("product-detail__back-btn");
    backButton.id = "backButton";
    backButton.textContent = "← Volver";


    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get("id") || "0");

    container.appendChild(productDetailMedia);
    productDetailMedia.appendChild(productImg);
    container.appendChild(productDetailInfo);
    productDetailInfo.appendChild(productDetailTitle);
    productDetailInfo.appendChild(productDetailDescription);
    productDetailInfo.appendChild(productDetailBadge);
    productDetailInfo.appendChild(productDetailPrice);
    productDetailInfo.appendChild(productDetailQuantityWrapper);
    productDetailQuantityWrapper.appendChild(productDetailQuantityLabel);
    productDetailQuantityWrapper.appendChild(quantityControls);
    quantityControls.appendChild(decreaseBtn);
    quantityControls.appendChild(quantityValue);
    quantityControls.appendChild(increaseBtn);
    productDetailInfo.appendChild(productDetailActions);
    productDetailActions.appendChild(addToCartBtn);
    productDetailActions.appendChild(backButton);

    if (!productId) {
        console.error("No se encontró ningún ID en la URL");
        // window.location.href = "../home/home.html"; // Descomentá esto después
        return; // Corta la ejecución acá
    }

    try {

        const findProduct = await productService.getById(productId) as Product;
        console.log("El producto es: ", findProduct)

        if (!findProduct) {
            console.error("Producto no encontrado");
            window.location.href = "../home/home.html";
            return;
        }

        productImg.src = findProduct.image;
        productDetailTitle.textContent = findProduct.name;
        productDetailDescription.textContent = findProduct.description;
        productDetailBadge.textContent = findProduct.stock > 0 ? "Disponible" : "Agotado";
        productDetailPrice.textContent = `$${findProduct.price}`;

        addToCartBtn.addEventListener("click", () => {
            const quantity = parseInt(quantityValue.textContent || "0");
            addToCart(findProduct, quantity);
        });

        decreaseBtn.addEventListener("click", () => {
            const currentValue = parseInt(quantityValue.textContent || "0");
            if (currentValue > 1) {
                quantityValue.textContent = (currentValue - 1).toString();
            }
        });

        increaseBtn.addEventListener("click", () => {
            const currentValue = parseInt(quantityValue.textContent || "0");
            if (currentValue < findProduct.stock) {
                quantityValue.textContent = (currentValue + 1).toString();
            }
        });

        backButton.addEventListener("click", () => {
            window.location.href = "../home/home.html";
        });


    } catch (error) {
        console.error("Error al cargar los detalles: ", error)
        //window.location.href = "../home/home.html";
    }

    updateCartCount();

});


