console.log("¡El archivo registro.ts ha despertado!");

import type { IUser } from "../../../types/IUser";
import { navigate } from "../../../utils/navigate";



const users : IUser[] = JSON.parse(localStorage.getItem("users") || "[]");


const form = document.getElementById("form") as HTMLFormElement;

form?.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    if (!email || !password) {
      showError("Por favor, completa todos los campos");
      return;
    }
    
     if (emailExists(email)) {
       showError("El correo ya está registrado");
       return;
     }

     if (!isPasswordValid(password)) {
       showError("La contraseña debe tener al menos 6 caracteres");
       return;
     }

     users.push({ email, password, loggedIn: false, role: "client" });
     localStorage.setItem("users", JSON.stringify(users));
     showError("Registro exitoso");
     form.reset();
     navigate("/src/pages/auth/login/login.html");
 });

const emailExists = (email: string): boolean => {
  const currentUsers: IUser[] = JSON.parse(localStorage.getItem("users") || "[]");
  return currentUsers.some(user => user.email === email);
}

const isPasswordValid = (password: string): boolean => password.length >= 6;

function showError(message: string) {
  const errorMessage = document.getElementById("error-message") as HTMLParagraphElement;
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}