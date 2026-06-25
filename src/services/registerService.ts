import type { IUser } from "../types/IUser";

const BASE_URL = "http://localhost:8080/api/auth/register";


export const registerService = {

    async register(email: string, password: string, phone?: string, name?: string, lastName?: string) {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, phone, name, lastName })
        })
        if (!response.ok) throw new Error("Failed to register.")
        return await response.json() as IUser;
    }
} 