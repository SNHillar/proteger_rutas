import type { ICategory } from "./category";

export interface Product {
    id: number;
    deleted: boolean;
    createdAt: string;
    name: string;
    price: number;
    description: string;
    stock: number;
    image: string;
    available: boolean;
    categories: ICategory[];
}


export interface CartItem extends Product {
    quantity: number;
}