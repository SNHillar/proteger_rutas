import type { Order } from "../types/product.ts";

const API_URL = "http://localhost:8080/api/orders";


export async function getOrders(): Promise<Order[]> {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) {
        throw new Error("Error al obtener los pedidos");
    }
    return response.json();
}

export async function getOrderById(orderId: number): Promise<Order> {
    const response = await fetch(`${API_URL}/${orderId}`);
    if (!response.ok) {
        throw new Error("Error al obtener el pedido");
    }
    return response.json();
}

export async function saveOrder(order: Order): Promise<Order> {
    const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
    });
    if (!response.ok) {
        throw new Error("Error al guardar el pedido");
    }
    return response.json();
}
