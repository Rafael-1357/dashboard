export type UnitModel = {
  preferences: any;
  created_at: any;
  updated_at: any;
  id: string;
  name: string;
  stock_quantitative: number;
  sale_price: number;
  cost_price: number;
  net_profit: number;
  profit_margin: number;
  return_on_investment: number;
  can_be_deleted: boolean;
};

export type UnitModelPreferences = {
  listing_table: string;
  stock_entry_selection: string;
  sale_selection: string;
  loss_selection: string;
  stock_threshold: string;
};

export type unitModelFormEditType = {
  name: string;
  stock_quantitative: number;
  sale_price: number;
  cost_price: number;
};

export type productDetail = {
  name: string;
  category: string;
  absolute_unit: string;
  stock_threshold: number;
  expiration_day_limit: number;
};

export type productDetails = {
  id: string;
  name: string;
  category: string;
  absolute_unit: string;
  stock_threshold: number;
  expiration_day_limit: number;
  total_in_stock: number;
  currently_monthly_revenue: number;
  created_at: string;
  can_be_deleted: boolean;
  unit_models: {
    all: UnitModel[];
    preferences: UnitModelPreferences;
  };
};