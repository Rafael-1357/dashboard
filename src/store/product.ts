import { create } from "zustand";
import { ProductList } from "@/types/products.types";

type ProductStore = {
  products: ProductList[];
  requestProducts: () => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  requestProducts: () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
      headers: {
        "Content-type": "application/json",
        Authorization: import.meta.env.VITE_API_TOKEN!,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch products");
        return response.json();
      })
      .then((result) => {
        set({ products: result.data });
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  },
}));
