import type { Product } from "../types/product";

const API_URL = 'http://localhost:8080/api/products';

export const productService = {

    async getAll(): Promise<Product[]> {
        const response = await fetch(API_URL);
        if(!response.ok) throw new Error("Failed to fetch products.")
        return await response.json();    
    },

    async getById(id: number) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'GET'
    });
    if (!response.ok) throw new Error('Failed to get product');
    return await response.json();
    },


    async update(id: number, name: string, price: number, description: string, stock: number, image: string, categoryId: number ){
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id, name, price, description, stock, image, categoryId})
        })
        if(response.status == 403 || response.status == 401){
            throw new Error("Unauthorized access.")
        }
        if(!response.ok) throw new Error("Failed to update product.")
        return await response.json();    
    },

    async create(id: number, name: string, price: number, description: string, stock: number, image: string, categoryId: number ){
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id, name, price, description, stock, image, categoryId})
        })
        if(response.status === 403 || response.status === 401){
            throw new Error("Unauthorized access.")
        }
        if(!response.ok) throw new Error("Failed to create product.")
        return await response.json();    
    },


    async delete(id: number) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT'
    });
    if (response.status === 403 || response.status === 401) {
      throw new Error('Unauthorized access');
    }
    if (!response.ok) throw new Error('Failed to delete category');
  }
}