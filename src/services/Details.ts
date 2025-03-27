import { productDetail } from "@/types/productDetails.types";
import { parseJSON } from "date-fns";
import localforage from "localforage";
import { toast } from "sonner";

const URL = import.meta.env.VITE_API_URL;

export async function getProduct(id: string) {
  try {
    const token = await localforage.getItem("access_token");
    const response = await fetch(`${URL}/api/products/${id}/details?type=id`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar detalhes do produto");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    toast.error("Erro ao buscar detalhes do produto!");
    throw error;
  }
}

export async function updateProduct(id: string, newDetails: productDetail) {
  try {
    const token = await localforage.getItem("access_token");
    const response = await fetch(`${URL}/api/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(newDetails)
    })

    if (!response.ok) {
      throw new Error("Erro ao buscar detalhes do produto");
    }

    return response.ok
  } catch(error) {
    toast.error("Erro ao atualizar detalhes do produto!");
    throw error;
  }
}


