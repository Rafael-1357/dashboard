export type TableHeaders = {
  title: string,
  Action: Function,
}

export type ProductList = {
  id: string,
  active: string,
  name: string,
  category: string,
  created_at: string,
  total_revenue: number,
  total_in_stock: {
    value: number,
    unit_name: string,
  },
};

export type PaginationMeta = {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
  links: Link[];
};

export type Link = {
  url: string | null;
  label: string;
  active: boolean;
};



























export type FieldsProductsCreate = {
  name: string,
  active: string,
  category: string,
  measurement_unit: string,
  stock_threshold: number,
  expiration_day_limit: string,
  measurement_models: MeasurementModel[]
}

export type MeasurementModel = {
  name: string,
  active: string,
  is_default: string,
  quantitative: number,
  sale_price: number,
  cost_price: number,
}