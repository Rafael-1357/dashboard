import { create } from "zustand";
import { ProductList, PaginationMeta } from "@/types/products.types";

type ProductStore = {
  products: ProductList[];
  meta: PaginationMeta;
  searchTerm: string;
  requestProducts: () => void;
  setCurrentPage: (page: number) => void;
  setSearchTerm: (term: string) => void;
};

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  meta: {
    current_page: 1,
    from: 0,
    last_page: 0,
    links: [],
    path: "",
    per_page: 0,
    to: 0,
    total: 0
  },
  searchTerm: '',
  requestProducts: () => {
    const { meta, searchTerm } = get()
    const baseUrl = `${import.meta.env.VITE_API_URL}/api/products?page=${meta.current_page}`;
    const searchParam = searchTerm ? `&filters[name][$startsWith]=${searchTerm}` : "";
    const url = baseUrl + searchParam;

    fetch(url, {
      headers: {
        "Content-type": "application/json",
        Authorization: import.meta.env.VITE_API_TOKEN,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch products");
        return response.json();
      })
      .then((result) => {
        set({
          products: result.data,
          meta: result.meta
        });
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  },
  setCurrentPage: (page) => {
    const { requestProducts } = get();
    set((state) => ({
      meta: {
        ...state.meta,
        current_page: page,
      },
    }));
    requestProducts()
  },
  setSearchTerm: (term) => {
    const { meta, requestProducts } = get();
    set((state) => ({
      meta: {
        ...state.meta,
        current_page: 1
      },
      searchTerm: term,
    }));
    requestProducts()
  }
}));
