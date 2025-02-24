import { create } from "zustand";
import { ProductList, ProductMeta } from "@/types/products.types";
import localforage from "localforage";

type ProductStore = {
  products: ProductList[];
  meta: ProductMeta;
  requestProducts: (urlpage: string | null) => void;
  setChangePage: (page: string | null) => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  meta: {
    current_page: 1,
    from: 0,
    last_page: 1,
    links: [],
    path: import.meta.env.VITE_API_URL,
    per_page: 0,
    to: 0,
    total: 0
  },
  requestProducts: async (urlPage: string | null) => {
    const token = (await localforage.getItem<string>('access_token')) || '';

    let url;
    let perPage = "per_page=10"

    urlPage != null ? url = urlPage : url = `${import.meta.env.VITE_API_URL}/api/products`;
    urlPage != null ? url = url + `&${perPage}` : url = url + `?${perPage}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch products");
        return response.json();
      })
      .then((result) => {
        set({
          products: result.data,
          meta: result.meta,
        });
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  },
  setChangePage: (page: string | null) => {
    const { requestProducts } = get();
    requestProducts(page);
  },
}));
