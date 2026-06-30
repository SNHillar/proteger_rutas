export interface Order {
    id: number;
    date: string;
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    items: OrderDetail[];
    userId: number;
}

export interface OrderDetail {
    productId: number;
    userId: number;
    quantity: number;
}

export type PaymentMethod = "CARD" | "CASH" | "TRANSFER";

export type OrderStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELED";