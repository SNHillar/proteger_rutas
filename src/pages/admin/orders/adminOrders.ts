import { getOrders } from "../../../services/orderService";
import type { Order } from "../../../types/order";

const ordersList = document.getElementById('orders-list');


function renderOrders(orders: Order[]) {
    if (!ordersList) return;
}