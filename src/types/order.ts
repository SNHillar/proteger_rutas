export interface Order {
    id: number;
    date: string;
    status: string;
    paymentMethod: PaymentMethod;
    userId: number;
    items: OrderDetail[];
}

export interface OrderDetail {
    quantity: number;
    subtotal: number;
    productId: number;
}

export type PaymentMethod = "CARD" | "CASH" | "TRANSFER";

export type OrderStatus = "PENDING" | "DELIVERED" | "CANCELLED";