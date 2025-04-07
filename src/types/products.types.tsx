export type ProductList = {
  id: string,
  active: string,
  name: string,
  category: string,
  created_at: string, 
  currently_monthly_revenue: number,
  total_in_stock: {
    value: number,
    unit_name: string,
  },
};

export type MetaLinks = {
  url: string | null,
  label: string,
  active: boolean
};

export type ProductMeta = {
  current_page: number,
  from: number,
  last_page: number,
  links: MetaLinks[],
  path: string,
  per_page: number,
  to: number,
  total: number
};

export type sortOptionType = {
  label: string | null,
  direction: string | null
}

export type FormProductCreate = {
  name: string,
  category: string,
  absolute_unit: string,
  stock_threshold: number,
  expiration_day_limit: number
};

