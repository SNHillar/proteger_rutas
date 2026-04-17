import type { CartItem } from "../../../types/product";

const cartContainer = document.querySelector(".cart-items") as HTMLDivElement;
const cartTotal = document.querySelector(".cart-total") as HTMLParagraphElement;
const logoutButton = document.getElementById("logout-btn") as HTMLButtonElement;

logoutButton?.addEventListener("click", () => {
    window.location.href = "/src/pages/auth/login/login.html";
});

function renderCart() {

    const cartItems: CartItem [] = JSON.parse(localStorage.getItem("cart") || "[]") as CartItem[];

    if(cartItems.length === 0) {
        cartContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
        cartTotal.textContent = "Total: $0";
        return;
    }

    cartContainer.innerHTML = "";

    let total: number = 0;
    cartItems.forEach((item: CartItem, index: number) => {
        const cartItemDiv = document.createElement("div") as HTMLDivElement;
        cartItemDiv.classList.add("cart-item");

        const itemName = document.createElement("h4") as HTMLHeadingElement;
        itemName.textContent = item.nombre;

        const itemsControlsDiv = document.createElement("div") as HTMLDivElement;
        itemsControlsDiv.classList.add("item-controls");

        const decreaseButton = document.createElement("button") as HTMLButtonElement;
        decreaseButton.textContent = "-";

        const quantitySpan = document.createElement("span") as HTMLSpanElement;
        quantitySpan.textContent = item.cantidad.toString();

        const increaseButton = document.createElement("button") as HTMLButtonElement;
        increaseButton.textContent = "+";

        
        const itemPrice = document.createElement("p") as HTMLParagraphElement;
        itemPrice.textContent = `Precio: $${item.precio} x ${item.cantidad}`;

        itemsControlsDiv.append(decreaseButton, quantitySpan, increaseButton);
        cartItemDiv.append(itemName, itemPrice, itemsControlsDiv);
        cartContainer.appendChild(cartItemDiv);
        total += item.precio * item.cantidad;
    });

    cartTotal.textContent = `Total: $${total}`;
    setupCartButtons(cartItems);
}



function setupCartButtons( cartItems: CartItem[]) {

    const decreaseButtons = document.querySelectorAll(".item-controls button:first-child") as NodeListOf<HTMLButtonElement>;
    const increaseButtons = document.querySelectorAll(".item-controls button:last-child") as NodeListOf<HTMLButtonElement>;
    const clearCartButton = document.getElementById("clear-cart-btn") as HTMLButtonElement;

    decreaseButtons.forEach((button: HTMLButtonElement, index: number) => {
        button.onclick = () => {
            cartItems[index].cantidad--;
            if (cartItems[index].cantidad <= 0) {
                cartItems.splice(index, 1);
            }
            localStorage.setItem("cart", JSON.stringify(cartItems));
            renderCart();
        };
    });

    increaseButtons.forEach((button: HTMLButtonElement, index: number) => {
        button.onclick = () => {
            cartItems[index].cantidad++;
            localStorage.setItem("cart", JSON.stringify(cartItems));
            renderCart();
        };
    });

    if (clearCartButton) {
        clearCartButton.onclick = () => {
            setupClearCartButton(cartItems);
        };
    }


}

function setupClearCartButton(cartItems: CartItem[]) {
    localStorage.setItem("cart", JSON.stringify([]));
    renderCart();
}

renderCart();
