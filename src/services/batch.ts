import { BatchFormType } from "@/types/batch.types";
import localforage from "localforage";

const URL = import.meta.env.VITE_API_URL
const token = (await localforage.getItem<string>('access_token'));

export async function getProductsForBatch(searchQuery: string) {

  const response = await fetch(`${URL}/api/products/search?q=${searchQuery}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch product details');
  }

  const data = await response.json();
  return data;
}

export async function getProductBatch(id: string, pageURL: string | null = null) {

  let newURL = `${URL}/api/products/${id}/batches`

  if(pageURL != null) {
    newURL = pageURL;
  }

  const response = await fetch(`${newURL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch product details');
  }

  const data = await response.json();
  return data;
}

export async function createBatch(idProduct: string, data: BatchFormType) {
  const response = await fetch(`${URL}/api/products/${idProduct}/batches`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update product details');
  }

  return response.ok
}

export async function updateBatch(idBatch: string, data: BatchFormType) {
  const response = await fetch(`${URL}/api/products/batches/${idBatch}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log(errorData);
    throw new Error(errorData.message || 'Failed to update product details');
  }

  return response.ok
}

export async function deleteBatch(idBatch: string) {
  const response = await fetch(`${URL}/api/products/batches/${idBatch}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update product details');
  }

  return response.ok
}