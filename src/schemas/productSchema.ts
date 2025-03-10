import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }),
  category: z.string().min(1, { message: "A categoria é obrigatória" }),
  absolute_unit: z.string().min(1, { message: "A unidade é obrigatória" }),
  stock_threshold: z.number({invalid_type_error: "O número deve ser positivo ou igual a zero"}).int().nonnegative({ message: "O número deve ser positivo ou igual zero" }),
  expiration_day_limit: z.number({invalid_type_error: "O número deve ser positivo ou igual a zero"}).int().nonnegative({ message: "O número deve ser positivo ou igual a zero" }),
});

export default productSchema;