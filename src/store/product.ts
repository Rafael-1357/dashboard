import { create } from "zustand";
import { ProductList, PaginationMeta, SortOptions, FieldsProductsCreate } from "@/types/products.types";
import { toast } from "@/hooks/use-toast";

type ProductStore = {
  products: ProductList[];
  meta: PaginationMeta;
  searchTerm: string;
  stateFilter: number | null;
  sortOptions: SortOptions;
  requestProducts: () => void;
  setCurrentPage: (page: number) => void;
  setSearchTerm: (term: string) => void;
  setStateFilter(): void;
  setSortOptions: (field: string) => void;
  createNewProduct: (fields: FieldsProductsCreate) => void;
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
  stateFilter: null,
  sortOptions: {
    field: null,
    direction: null,
  },
  requestProducts: () => {
    const { meta, searchTerm, stateFilter, sortOptions } = get()
    const baseUrl = `${import.meta.env.VITE_API_URL}/api/products?page=${meta.current_page}`;
    const sortParam = sortOptions.field
      ? `&sort[0]=${sortOptions.field}${sortOptions.direction === "desc" ? ":desc" : ""}`
      : "";
    const activeParam = stateFilter !== null ? `&filters[active][$eq]=${stateFilter}` : "";
    const searchParam = searchTerm ? `&filters[name][$startsWith]=${searchTerm}` : "";
    const url = baseUrl + sortParam + activeParam + searchParam;

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
    const { requestProducts } = get();
    set((state) => ({
      meta: {
        ...state.meta,
        current_page: 1
      },
      searchTerm: term,
    }));
    requestProducts()
  },
  setStateFilter: () => {
    const { stateFilter, requestProducts } = get();
    set((state) => ({
      meta: {
        ...state.meta,
        current_page: 1
      },
      stateFilter: stateFilter === null ? 1 : stateFilter === 1 ? 0 : null,
    }));
    requestProducts()
  },
  setSortOptions: (field) => {
    const { sortOptions, requestProducts } = get();

    const newSortOptions: SortOptions =
      sortOptions.field === field
        ? {
          field: sortOptions.direction === "asc" ? field : null,
          direction:
            sortOptions.direction === "asc"
              ? "desc"
              : sortOptions.direction === "desc"
                ? null
                : "asc",
        }
        : {
          field,
          direction: "asc",
        };

    set({ sortOptions: newSortOptions });
    
    requestProducts();
  },
  createNewProduct: (fields) => {
    console.log(fields)

    fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: import.meta.env.VITE_API_TOKEN,
      },
      body: JSON.stringify(fields)
    })
      .then(response => {
        if (response.ok) {
          toast({
            variant: "created",
            title: "Produto adicionado",
            description: "Disponível na lista de produtos",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Erro",
            description: "Ocorreu um erro ao adicionar o produto.",
          });
        }
      })
      .catch((error) => {
        console.error("Erro ao enviar o produto:", error);
        toast({
          variant: "destructive",
          title: "Erro de Rede",
          description: "Verifique a conexão e tente novamente.",
        });
      });
  }
}));
