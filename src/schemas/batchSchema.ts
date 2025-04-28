import { z } from 'zod';

const batchFormSchema = z.object({
  barcode: z.string().min(1, "Código de barras é obrigatório").max(256, "Limite máximo de 256 números"),
  expiration_date: z.string().min(1, "Data de expiração é obrigatória"),
  sold_out: z.boolean().default(false),
});

export default batchFormSchema;