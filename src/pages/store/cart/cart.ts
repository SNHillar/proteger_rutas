import type { CartItem } from "../../../types/product";

const cartContainer = document.querySelector(".cart-container") as HTMLDivElement;
const cartTotal = document.querySelector(".cart-total") as HTMLParagraphElement;

function renderCart() {

    const cartItems: CartItem [] = JSON.parse(localStorage.getItem("cart") || "[]") as CartItem[];

    if(cartItems.length === 0) {
        cartContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
        cartTotal.textContent = "Total: $0";
        return;
    }

    cartContainer.innerHTML = "";

    let total = 0;
    cartItems.forEach((item) => {
        const cartItemDiv = document.createElement("div") as HTMLDivElement;
        cartItemDiv.classList.add("cart-item");

        const itemName = document.createElement("h4") as HTMLHeadingElement;
        itemName.textContent = item.nombre;

        const itemPrice = document.createElement("p") as HTMLParagraphElement;
        itemPrice.textContent = `Precio: $${item.precio} x ${item.cantidad}`;
        cartItemDiv.appendChild(itemName);
        cartItemDiv.appendChild(itemPrice);
        cartContainer.appendChild(cartItemDiv);
        total += item.precio * item.cantidad;
    });
    cartTotal.textContent = `Total: $${total}`;
}

renderCart();