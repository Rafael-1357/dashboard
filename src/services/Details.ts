import { productDetail, unitModelFormEditType } from "@/types/productDetails.types";
import localforage from "localforage";

const URL = import.meta.env.VITE_API_URL;
const token = (await localforage.getItem<string>('access_token')) || ''

export async function getProduct(id: string) {
  const response = await fetch(`${URL}/api/products/${id}/details?type=id`, {
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

export async function updateProduct(id: string, newDetails: productDetail) {
  const response = await fetch(`${URL}/api/products/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(newDetails)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update product details');
  }

  return response.ok
}

export async function updateUnitModel(idModel: string, unitModel: unitModelFormEditType) {
  const response = await fetch(`${URL}/api/products/unit-models/${idModel}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(unitModel)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update product details');
  }

  return response.ok
}

export async function createUnitModel(idProduct: string, unitModel: unitModelFormEditType) {
  const response = await fetch(`${URL}/api/products/${idProduct}/unit-models`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(unitModel)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update product details');
  }

  return response.ok
}

export async function deleteUnitModel(idModel: string) {
  const response = await fetch(`${URL}/api/products/unit-models/${idModel}/force`, {
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

export async function updatePreferences(idProduct: string, data: any) {
  const response = await fetch(`${URL}/api/products/${idProduct}/unit-models/preferences`, {
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



