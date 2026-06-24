import type { IUser } from "../../../types/IUser";
import { navigate } from "../../../utils/navigate";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;


form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  const valueEmail = inputEmail.value;
  const valuePassword = inputPassword.value;
  const usersData: IUser[] = JSON.parse(localStorage.getItem("users") || "[]");
  const userFound = usersData.find(user => user.email === valueEmail && user.password === valuePassword);

  if (!userFound) {
    showError("Correo o contraseña incorrectos");
    return;
  }
  if (userFound.role === "admin") {
    userFound.loggedIn = true;
    navigate("/src/pages/admin/home/admin-home.html");
  } else {
    userFound.loggedIn = true;
    navigate("/src/pages/store/home/home.html");
  };

  const parseUser = JSON.stringify(userFound);
  localStorage.setItem("userData", parseUser);
});

function showError(message: string) {
  const errorMessage = document.getElementById("error-message") as HTMLParagraphElement;
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}