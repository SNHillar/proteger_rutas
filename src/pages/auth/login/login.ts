import type { IUser } from "../../../types/IUser";
import type { Rol } from "../../../types/Rol";
import { navigate } from "../../../utils/navigate";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;
const selectRol = document.getElementById("rol") as HTMLSelectElement;
const registerBtn = document.getElementById("registerBtn") as HTMLButtonElement;

registerBtn.addEventListener("click", () => {
  navigate("/src/pages/auth/registro/registro.html");
});


form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  const valueEmail = inputEmail.value;
  const valuePassword = inputPassword.value;
  const valueRol = selectRol.value as Rol;
  const usersData: IUser[] = JSON.parse(localStorage.getItem("users") || "[]");
  const userFound = usersData.find(user => user.email === valueEmail && user.password === valuePassword);

  if (!userFound) {
    alert("Correo o contraseña incorrectos");
    return;
  }
  if (userFound.role === valueRol) {
    userFound.loggedIn = true;
    if (userFound.role === "admin") {
      navigate("/src/pages/admin/dashboard/dashboard.html");
    } else if (userFound.role === "client") {
      navigate("/src/pages/store/home/home.html");
    }
  } else {
    alert(`El rol seleccionado "${valueRol}", no coincide con el registrado "${userFound.role}"`);
    return;
  }

  // const user: IUser = {
  //   email: valueEmail,
  //   password: valuePassword,
  //   role: valueRol,
  //   loggedIn: true,
  // };

  const parseUser = JSON.stringify(userFound);
  localStorage.setItem("userData", parseUser);
});