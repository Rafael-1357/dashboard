import { z } from "zod";

export const unitModelSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  stock_quantitative: z.number().int().min(0),
  sale_price: z.number().min(0),
  cost_price: z.number().min(0),
  net_profit: z.number(),
  profit_margin: z.number(),
  return_on_investment: z.number(),
  can_be_deleted: z.boolean(),
});

export const unitPreferencesSchema = z.object({
  listing_table: z.string().uuid(),
  stock_entry_selection: z.string().uuid(),
  sale_selection: z.string().uuid(),
  loss_selection: z.string().uuid(),
  stock_threshold: z.string().uuid(),
});

export const productDetail = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  category: z.string().min(1),
  absolute_unit: z.string().min(1),
  stock_threshold: z.number().int().min(0),
  expiration_day_limit: z.number().int().min(0),
})

export const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  category: z.string().min(1),
  absolute_unit: z.string().min(1),
  stock_threshold: z.number().int().min(0),
  expiration_day_limit: z.number().int().min(0),
  total_in_stock: z.number().int().min(0),
  currently_monthly_revenue: z.number().min(0),
  created_at: z.string().datetime(),
  can_be_deleted: z.boolean(),
  unit_models: z.object({
    all: z.array(unitModelSchema),
    preferences: unitPreferencesSchema,
  }),
});

