import type { IUser } from "../../../types/IUser";
import { navigate } from "../../../utils/navigate";
import { registerService } from "../../../services/registerService";

const users: IUser[] = JSON.parse(localStorage.getItem("users") || "[]");
const form = document.getElementById("form") as HTMLFormElement;

form?.addEventListener("submit", async (e: SubmitEvent) => {
  e.preventDefault();

  const formData = new FormData(form);
  const name = formData.get("name") as string;
  const lastName = formData.get("lastName") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

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

  try {
    const user = await registerService.register(email, password, phone, name, lastName);
    console.log(user);

    users.push({ email, password, phone, loggedIn: true, role: "client", name, lastName });
    localStorage.setItem("users", JSON.stringify(users));
    form.reset();

    sessionStorage.setItem("flashMessage", "¡Bienvenido!");
    sessionStorage.setItem("flashType", "Success");

    navigate("/src/pages/store/home/home.html");
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    showError("Error al registrar el usuario");
  }
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

  setTimeout(() => {
    errorMessage.style.display = "none";
  }, 3000);
}