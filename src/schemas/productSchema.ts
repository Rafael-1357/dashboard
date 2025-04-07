import { z } from 'zod';

export const productSchema = z.object({
  name: z.string({message: "É esperado texto"}).min(1, "Mínimo de 1 caractere").max(256, "Máximo de 256 caracteres"),
  category: z.string({message: "É esperado texto"}).min(1, "Mínimo de 1 caractere").max(256, "Máximo de 256 caracteres"),
  absolute_unit: z.string({message: "É esperado texto"}).min(1, "Mínimo de 1 caractere").max(256, "Máximo de 256 caracteres"),
  stock_threshold: z.number({message: "É esperado um número"}).min(0, "O número deve ser 0 ou maior").max(9999999, "Limite máximo de 7 dígitos"),
  expiration_day_limit: z.number({message: "É esperado um número"}).min(0, "O número deve ser 0 ou maior").max(9999999, "Limite máximo de 7 dígitos"),
});

export default productSchema;