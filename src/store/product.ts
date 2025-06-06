import { create } from "zustand";
import { FormProductCreate, ProductList, ProductMeta, sortOptionType } from "@/types/products.types";
import localforage from "localforage";
import { toast } from "sonner"
import { CircleCheck, TriangleAlert } from "lucide-react";
import { createElement } from "react";
import { productDetails, UnitModel } from "@/types/productDetails.types";
import { productDetails as ProductDetailsType } from "@/types/productDetails.types.tsx";
import { getProduct, updateProduct, updateUnitModel, createUnitModel, deleteUnitModel, updatePreferences } from "@/services/Details";

type ProductStore = {
  products: ProductList[];
  meta: ProductMeta;
  sortOptions: sortOptionType;
  stateProduct: number | null;
  searchFilter: string | null;
  productDetails: productDetails | null;
  setSearchFilter(search: string): void;
  requestProducts(urlpage: string | null): void;
  setChangePage(page: string | null): void;
  setSortOptions(option: sortOptionType): void;
  setStateProduct(): void;
  clearFilters(): void;
  createProduct(data: FormProductCreate): void;
  getProductDetails(id: string): void;
  updateProductDetails(id: string, formData: ProductDetailsType): Promise<any>;
  updateUnitModels(id: string, formData: any): Promise<any>;
  newModel(unitModel: UnitModel): Promise<any>;
  deleteModel(idModel: string): Promise<any>;
  editUnitModelsPreferences(preferences: any): Promise<any>;
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
  sortOptions: { label: null, direction: null },
  stateProduct: null,
  searchFilter: null,
  productDetails: null,
  requestProducts: async (urlPage: string | null) => {
    const token = (await localforage.getItem<string>('access_token')) || '';
    const { sortOptions, stateProduct, searchFilter } = get()

    const url = new URL(urlPage ?? `${import.meta.env.VITE_API_URL}/api/products`);
    url.searchParams.append('per_page', '10');

    if (sortOptions.label != null) {
      url.searchParams.append("sort[0]", `${sortOptions.label}${sortOptions.direction}`);
    }

    if (stateProduct != null) {
      url.searchParams.append("filters[active]", stateProduct.toString());
    }

    if (searchFilter) {
      url.searchParams.append("filters[name][$startsWith]", searchFilter);
    }

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
  setSortOptions: (options: sortOptionType) => {
    const { requestProducts } = get()

    set({
      sortOptions: {
        label: options.label,
        direction: options.direction
      }
    });

    requestProducts(null)
  },
  setStateProduct: () => {
    const { stateProduct, requestProducts } = get();

    stateProduct == null ? set({ stateProduct: 1 }) : stateProduct === 1 ? set({ stateProduct: 0 }) : set({ stateProduct: 1 });
    requestProducts(null)
  },
  setSearchFilter: (search: string) => {
    const { requestProducts } = get();

    set({ searchFilter: search });
    requestProducts(null);
  },
  clearFilters: () => {
    const { requestProducts } = get();

    set({
      sortOptions: { label: null, direction: null },
      stateProduct: null,
      searchFilter: null
    });

    requestProducts(null);
  },
  createProduct: async (data: FormProductCreate) => {

    const token = (await localforage.getItem<string>('access_token')) || '';
    const url = `${import.meta.env.VITE_API_URL}/api/products`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data)
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
        toast('Produto criado com sucesso', { icon: createElement(CircleCheck) })
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        toast('Falha ao criar produto', { icon: createElement(TriangleAlert) })
      });
  },
  getProductDetails: async (id: string) => {
    try {
      const data = await getProduct(id);
      set({ productDetails: data });
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  },
  updateProductDetails: (id: string, formData: ProductDetailsType): Promise<any> => {
    return updateProduct(id, formData)
      .then((response) => {
        const { getProductDetails, productDetails } = get();
        getProductDetails(productDetails?.id ?? '');
        return response
      })
      .catch((error) => Promise.reject(error));
  },
  updateUnitModels: (idModel: string, unitModel: any): Promise<any> => {
    return updateUnitModel(idModel, unitModel)
      .then((response) => {
        const { getProductDetails, productDetails } = get();
        getProductDetails(productDetails?.id ?? '');
        return response
      })
      .catch((error) => Promise.reject(error));
  },
  newModel: (unitModel: UnitModel): Promise<any> => {
    const { productDetails, getProductDetails } = get();
    if (productDetails?.id) {
      return createUnitModel(productDetails.id, unitModel)
        .then((response) => {
          getProductDetails(productDetails?.id ?? '');
          return response
        })
        .catch((error) => Promise.reject(error));
    } else {
      console.error("Product ID is undefined");
      return Promise.reject(new Error("Product ID is undefined"));
    }
  },
  deleteModel: (idModel: string) => {
    return deleteUnitModel(idModel)
      .then((response) => {
        const { getProductDetails, productDetails } = get();
        getProductDetails(productDetails?.id ?? '');
        return response
      })
      .catch((error) => Promise.reject(error))
  },
  editUnitModelsPreferences: (preferences: any): Promise<any> => {
    const { productDetails } = get();
    if (productDetails?.id) {
      return updatePreferences(productDetails.id, preferences)
        .then((response) => {
          const { getProductDetails } = get();
          getProductDetails(productDetails.id);
          return response;
        })
        .catch((error) => Promise.reject(error));
    }
    return Promise.reject(new Error("Product ID is undefined"));
  }
}));
