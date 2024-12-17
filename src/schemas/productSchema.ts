import { z } from "zod";

const stringFieldSchema = z
  .string(
    {
      required_error: "Campo obrigatório",
      invalid_type_error: "Insira um valor válido"
    })
  .nonempty("O campo é obrigatório.")
  .min(2, { message: "O campo deve ter pelo menos 2 caracteres." })
  .max(30, { message: "O campo deve ter no máximo 30 caracteres." })
  .regex(
    /^[a-zA-ZÀ-ÿ0-9\s'-]+$/,
    "O campo deve conter apenas letras, números, espaços, hífens ou apóstrofos."
  )
  .trim();

export const productSchema = z.object({
  name: stringFieldSchema,
  measurement_unit: stringFieldSchema,
  category: stringFieldSchema,
  state: z.enum(["true", "false"],
    { message: "Selecione um estado" }),
  stock_threshold: z
    .preprocess(
      (val) => {
        return val != undefined ? Number(val) : val
      }, z
        .number(
          {
            required_error: "Campo obrigatório",
            invalid_type_error: "Insira um valor válido"
          })
        .min(0, { message: "Insira um valor positivo" })),
  expiration_date: z.coerce.string(),
  expiration_day_limit: z
    .preprocess(
      (val) => {
        return val != undefined ? Number(val) : val
      }, z
        .number(
          {
            required_error: "Campo obrigatório",
            invalid_type_error: "Insira um valor válido"
          })
        .min(0, { message: "Insira um valor" })),
  measurement_models: z.array(z.object({
    name: stringFieldSchema,
    state: z.string().refine((val) => val !== '', {
      message: "Selecione um estado",
    }),
    is_default: z.boolean(),
    quantitative:
      z.preprocess((val) => parseInt(val as string),
        z.number().nonnegative({ message: "Quantidade deve ser um número não-negativo" })),
    sale_price:
      z.preprocess((val) => (isNaN(parseFloat(val as string)) ? 0 : parseFloat(val as string)),
        z.number()
          .nonnegative({ message: "Preço de venda deve ser um número não-negativo" })
          .min(1, "O valor deve ser no mínimo 1")),
    cost_price: z.preprocess((val) => (isNaN(parseFloat(val as string)) ? 0 : parseFloat(val as string)),
      z.number()
        .nonnegative({ message: "Preço de custo deve ser um número não-negativo" })
        .min(1, "O valor deve ser no mínimo 1")),
  })).refine((models) => models.some(model => model.is_default), {
    message: "Pelo menos um modelo deve ser o padrão",
  }),
});