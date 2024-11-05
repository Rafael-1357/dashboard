import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Trash2 } from "lucide-react";

const productCreateSch = z.object({
  name: z.string().min(2, { message: "Insira pelo menos 2 caracteres" }),
  status: z.enum(["active", "disabled"], { message: "Selecione um estado" }),
  category: z.string().min(2, { message: "Insira pelo menos 2 caracteres" }),
  stock_threshold: z.preprocess((val) => parseFloat(val as string), z.number().nonnegative({ message: "Preço de venda deve ser um número não-negativo" })),
  expiration_day_limit: z.string().optional(),
  expiration_date: z
    .string()
    .refine((val) => new Date(val) > new Date(), {
      message: "Data de validade deve ser futura",
    })
    .optional(),
  measure_models: z
    .array(
      z.object({
        name: z.string().min(1, "Nome do modelo é obrigatório"),
        active: z.boolean(),
        is_default: z.boolean(),
        quantitative: z.preprocess((val) => parseFloat(val as string), z.number().nonnegative({ message: "Preço de venda deve ser um número não-negativo" })),
        sale_price: z.preprocess((val) => parseFloat(val as string), z.number().nonnegative({ message: "Preço de venda deve ser um número não-negativo" })),
        cost_price: z.preprocess((val) => parseFloat(val as string), z.number().nonnegative({ message: "Preço de custo deve ser um número não-negativo" })),
      })
    )
    .min(1, "Ao menos um modelo de medida é obrigatório"),
});

function CreateProduct() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof productCreateSch>>({
    resolver: zodResolver(productCreateSch),
    defaultValues: {
      name: "",
      status: undefined,
      category: "",
      stock_threshold: undefined,
      expiration_day_limit: '',
      expiration_date: "",
      measure_models: [
        {
          name: "",
          active: false,
          is_default: false,
          quantitative: 0,
          sale_price: 0,
          cost_price: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "measure_models",
  });

  function onSubmit(values: z.infer<typeof productCreateSch>) {
    const defaultCount = values.measure_models.filter(model => model.is_default).length;
    if (defaultCount > 1) {
      toast({
        variant: "destructive",
        title: "Erro de Validação",
        description: "Somente um modelo de medida pode ser o padrão.",
      });
      return;
    }
    console.log(values);
    toast({
      variant: "created",
      title: "Produto adicionado",
      description: "Disponível na lista de produtos",
    });
  }

  return (
    <div className="overflow-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-6 overflow-auto">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do produto" {...field} className="col-span-3" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Estado</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Estado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent >
                      <SelectItem value="active">Ativo</SelectItem>
                      <SelectItem value="disabled">Desativado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Categoria</FormLabel>
                  <FormControl>
                    <Input placeholder="Categoria" {...field} className="col-span-3" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock_threshold"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Quantidade mínima</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="10" {...field} className="col-span-3" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="expiration_day_limit"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right col-span-1">Data de validade antecipada (Dias)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="10" {...field} className="col-span-3" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="expiration_date"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Data de validade</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="XX/XX/XXXX" {...field} className="col-span-3" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            {fields.map((field, index) => (
              <div key={field.id} className="mt-4 space-y-6">
                <Separator />
                <div className="flex justify-between items-center">
                  <h3>Modelo de Medida {index + 1}</h3>
                  {index > 0 && (
                    <Button type="button" onClick={() => remove(index)} variant={"destructive"}>
                      <Trash2/>
                    </Button>
                  )}
                </div>
                <FormField
                  control={form.control}
                  name={`measure_models.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Nome do Modelo de Medida</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: UN" {...field} className="col-span-3" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`measure_models.${index}.active`}
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Ativo</FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="col-span-3"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`measure_models.${index}.is_default`}
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Modelo Padrão</FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`measure_models.${index}.quantitative`}
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Quantitativo</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 2000" {...field} className="col-span-3" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`measure_models.${index}.sale_price`}
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Preço de Venda</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="Ex: 9.29" {...field} className="col-span-3" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`measure_models.${index}.cost_price`}
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">Preço de Custo</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="Ex: 4.99" {...field} className="col-span-3" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {index == fields.length && (
                  <Separator />
                )
                }
              </div>
            ))}
            <Separator className="mt-6" />
          </div>
          <div className="flex justify-between">
            <Button
              type="button"
              variant={"outline"}
              onClick={() =>
                append({
                  name: "",
                  active: false,
                  is_default: false,
                  quantitative: 1,
                  sale_price: 0,
                  cost_price: 0,
                })
              }
            >
              Novo modelo de medida
            </Button>
            <Button type="submit" className="text-white bg-purple-500">
              Finalizar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CreateProduct