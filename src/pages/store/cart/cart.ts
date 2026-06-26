import type { CartItem } from "../../../types/product";
import { getCart, removeFromCart, incrementQuantity, clearCart, updateCartCount } from "../../../services/cartService.ts";

const cartContainer = document.getElementById("cart-items") as HTMLDivElement;
const cartTotal = document.getElementById("total-amount") as HTMLSpanElement;
const logoutButton = document.getElementById("logout-btn") as HTMLButtonElement;

logoutButton.addEventListener("click", () => {
    window.location.href = "/src/pages/auth/login/login.html";
});

function renderCart() {

    const cartItems: CartItem[] = getCart();

    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
        cartTotal.textContent = "Total: $0";
        return;
    }

    cartContainer.innerHTML = "";

    let total: number = 0;
    cartItems.forEach((item: CartItem) => {
        const cartItemDiv = document.createElement("div") as HTMLDivElement;
        cartItemDiv.classList.add("cart-item");

        const itemName = document.createElement("h4") as HTMLHeadingElement;
        itemName.textContent = item.name;
        itemName.classList.add("cart-item__name");

        const itemsControlsDiv = document.createElement("div") as HTMLDivElement;
        itemsControlsDiv.classList.add("item__controls");

        const decreaseButton = document.createElement("button") as HTMLButtonElement;
        decreaseButton.textContent = "-";
        decreaseButton.classList.add("item-controls__btn", "decrease-btn");

        const quantitySpan = document.createElement("span") as HTMLSpanElement;
        quantitySpan.textContent = item.quantity.toString();
        quantitySpan.classList.add("item-controls__quantity");

        const increaseButton = document.createElement("button") as HTMLButtonElement;
        increaseButton.textContent = "+";
        increaseButton.classList.add("item-controls__btn", "increase-btn");

        const itemPrice = document.createElement("p") as HTMLParagraphElement;
        itemPrice.textContent = `Precio: $${item.price} x ${item.quantity}`;
        itemPrice.classList.add("cart-item__price");


        itemsControlsDiv.append(decreaseButton, quantitySpan, increaseButton);
        cartItemDiv.append(itemName, itemPrice, itemsControlsDiv);
        cartContainer.appendChild(cartItemDiv);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = `Total: $${total}`;
    setupCartButtons(cartItems);
}



function setupCartButtons(cartItems: CartItem[]) {

    const decreaseButtons = document.querySelectorAll(".decrease-btn") as NodeListOf<HTMLButtonElement>;
    const increaseButtons = document.querySelectorAll(".increase-btn") as NodeListOf<HTMLButtonElement>;
    const clearCartButton = document.getElementById("clear-cart-btn") as HTMLButtonElement;

    decreaseButtons.forEach((button: HTMLButtonElement, index: number) => {
        button.onclick = () => {
            removeFromCart(cartItems[index].id);
            renderCart();
        };
    });

    increaseButtons.forEach((button: HTMLButtonElement, index: number) => {
        button.onclick = () => {
            incrementQuantity(cartItems[index].id);
            renderCart();
        };
    });

    if (clearCartButton) {
        clearCartButton.onclick = () => {
            clearCart();
            renderCart();
        };
    }


}

renderCart();
updateCartCount();

