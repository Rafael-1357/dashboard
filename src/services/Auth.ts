import localforage from "localforage";
import { toast } from "sonner";
import loginSchema from "@/schemas/loginSchema";
import { z } from "zod";

const URL = import.meta.env.VITE_API_URL

export function logout(navigate: (path: string) => void) {
  fetch(URL + "/api/auth/login", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localforage.getItem("access_token"),
    },
  })
    .then(() => {
      localforage.removeItem("access_token");
      toast.success("Desconectado com sucesso!");
      navigate("/");
    })
    .catch(() => {
      toast.error("Erro ao desconectar!");
    });
}


export function logon(data: z.infer<typeof loginSchema>) {

  return fetch(URL + "/api/auth/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}