import type { Rol } from "./Rol";

export interface IUser {
  email: string;
  password: string;
  phone?: string;
  name?: string;
  lastName?: string;
  loggedIn: boolean;
  role: Rol;
}
