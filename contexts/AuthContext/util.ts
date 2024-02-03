import { api } from "../../services/api";
import { IUser } from "./types";

export function setUserLocalStorage(user: IUser | null) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUserLocalStorage() : IUser | null{
  const json = localStorage.getItem("user");
  if (!json) {
    return null;
  }

  const user = JSON.parse(json);

  const token= user?.token;
  if (token) {
    const parsedJWT = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    const now = new Date();
    const exp = new Date(parsedJWT.exp * 1000);
    if (now > exp) {
      setUserLocalStorage(null);
      return null;
    }
  }

  return user ?? null;
}

export async function LoginRequest(email: string, password: string) {
  try {
    const request = await api.post("/entrar", { email, senha: password });
    return { ...request.data };
  } catch (error) {
    console.error(error);
    return null;
  }
}
