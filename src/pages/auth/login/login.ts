import { navigate } from "../../../utils/navigate";
import { loginService } from "../../../services/loginService";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;


async function login() {
  try {
    const user = await loginService.login(inputEmail.value, inputPassword.value);
    if (!user) {
      showError("Correo o contraseña incorrectos");
      return;
    }

    if (user.role === "admin") {
      user.loggedIn = true;
      const parseUser = JSON.stringify(user);
      localStorage.setItem("userData", parseUser);
      navigate("/src/pages/admin/home/admin-home.html");
    } else {
      user.loggedIn = true;
      const parseUser = JSON.stringify(user);
      localStorage.setItem("userData", parseUser);
      navigate("/src/pages/store/home/home.html");
    }
  } catch (error) {
    showError("Error al iniciar sesión");
  }
}



form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  login();
});

function showError(message: string) {
  const errorMessage = document.getElementById("error-message") as HTMLParagraphElement;
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}