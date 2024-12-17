import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator";
import { CirclePlus, Trash2 } from "lucide-react";
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
import { FieldsProductsCreate, MeasurementModel } from "@/types/products.types";


const productCreateSch = z.object({
  name: z.string()
    .min(2, { message: "Insira pelo menos 2 caracteres" })
    .max(24, { message: "Insira menos de 24 caracteres" }),
  status: z.enum(["active", "disabled"],
    { message: "Selecione um estado" }),
  category: z.string()
    .min(2, { message: "Insira pelo menos 2 caracteres" })
    .max(24, { message: "Insira menos de 24 caracteres" }),
  measurement_unit: z.string()
    .min(1, { message: "Insira no mínimo um caractere" })
    .max(24, { message: "Insira menos de 24 caracteres" }),
  stock_threshold: z.preprocess((val) => parseFloat(val as string),
    z.number()
      .nonnegative({ message: "Preço de venda deve ser um número não-negativo" })),
  expiration_day_limit: z.string(),
  expiration_date: z.string()
    .refine((val) => new Date(val) > new Date(), {
      message: "Data de validade deve ser futura",
    })
    .optional(),
  measure_models: z
    .array(
      z.object({
        name: z.string()
          .min(1, { message: "Insira no mínimo um caractere" })
          .max(24, { message: "Insira menos de 24 caracteres" }),
        active: z.boolean(),
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
      measurement_unit: "",
      stock_threshold: 0,
      expiration_day_limit: '',
      expiration_date: "",
      measure_models: [
        {
          name: "",
          active: true,
          is_default: true,
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

    let measurementModel: MeasurementModel[] = [];

    values.measure_models.forEach((element, index) => {
      measurementModel[index] = {
        name: element.name,
        active: element.active == true ? "1" : "0",
        is_default: element.is_default == true ? "1" : "0",
        quantitative: element.quantitative,
        sale_price: element.sale_price,
        cost_price: element.cost_price,
      }
    });

    // const body: FieldsProductsCreate = {
    //   name: values.name,
    //   active: values.status === 'active' ? "1" : "0",
    //   category: values.category,
    //   measurement_unit: values.measurement_unit,
    //   stock_threshold: values.stock_threshold,
    //   expiration_day_limit: values.expiration_day_limit,
    //   measurement_models: measurementModel,
    // };

    fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: import.meta.env.VITE_API_TOKEN,
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          toast({
            variant: "created",
            title: "Produto adicionado",
            description: "Disponível na lista de produtos",
          });
          form.reset();
        } else {
          toast({
            variant: "destructive",
            title: "Erro",
            description: "Ocorreu um erro ao adicionar o produto.",
          });
        }
      })
      .catch((error) => {
        console.error("Erro ao enviar o produto:", error);
        toast({
          variant: "destructive",
          title: "Erro de Rede",
          description: "Verifique a conexão e tente novamente.",
        });
      });
  }

  return (

    <Sheet>
      <SheetTrigger asChild>
        <Button className="h-full bg-purple-500 cursor-pointer">
          <CirclePlus className="mr-1 flex" />
          Adicionar novo produto
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[500px] overflow-auto">
        <SheetHeader>
          <SheetTitle className="pb-4">Novo produto</SheetTitle>
          <Separator />
        </SheetHeader>
        <div className="overflow-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-6 overflow-auto">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-5 items-center gap-4">
                      <FormLabel className="text-right col-span-2">Nome</FormLabel>
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
                name="measurement_unit"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-5 items-center gap-4">
                      <FormLabel className="text-right col-span-2">Unidade de medida</FormLabel>
                      <FormControl>
                        <Input placeholder="Unidade de medida" {...field} className="col-span-3" />
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
                    <div className="grid grid-cols-5 items-center gap-4">
                      <FormLabel className="text-right col-span-2">Estado</FormLabel>
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
                    <div className="grid grid-cols-5 items-center gap-4">
                      <FormLabel className="text-right col-span-2">Categoria</FormLabel>
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
                    <div className="grid grid-cols-5 items-center gap-4">
                      <FormLabel className="text-right col-span-2">Quantidade mínima</FormLabel>
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
                    <div className="grid grid-cols-5 items-center gap-4">
                      <FormLabel className="text-right col-span-2">Data de validade antecipada (Dias)</FormLabel>
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
                    <div className="grid grid-cols-5 items-center gap-4">
                      <FormLabel className="text-right col-span-2">Data de validade</FormLabel>
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
                          <Trash2 />
                        </Button>
                      )}
                    </div>
                    <FormField
                      control={form.control}
                      name={`measure_models.${index}.name`}
                      render={({ field }) => (
                        <FormItem >
                          <div className="grid grid-cols-5 items-center gap-4">
                            <FormLabel className="text-right col-span-2">Nome do Modelo de Medida</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: UN" {...field} className="col-span-3" />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`measure_models.${index}.active`}
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-5 items-center gap-4">
                          <FormLabel className="text-right col-span-2">Ativo</FormLabel>
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
                        <FormItem className="grid grid-cols-5 items-center gap-4">
                          <FormLabel className="text-right col-span-2">Modelo Padrão</FormLabel>
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              className="col-span-3"
                              onCheckedChange={(checked) => {
                                form.setValue(
                                  "measure_models",
                                  form.getValues("measure_models").map((model, idx) => ({
                                    ...model,
                                    is_default: idx === index ? !!checked : false,
                                  }))
                                );
                              }}
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
                        <FormItem className="grid grid-cols-5 items-center gap-4">
                          <FormLabel className="text-right col-span-2">Quantitativo</FormLabel>
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
                        <FormItem className="grid grid-cols-5 items-center gap-4">
                          <FormLabel className="text-right col-span-2">Preço de Venda</FormLabel>
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
                        <FormItem className="grid grid-cols-5 items-center gap-4">
                          <FormLabel className="text-right col-span-2">Preço de Custo</FormLabel>
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
                      quantitative: 0,
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
      </SheetContent>
    </Sheet>

  )
}

export default CreateProduct