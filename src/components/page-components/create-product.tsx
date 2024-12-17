import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { productSchema } from "@/schemas/productSchema";
import { useProductStore } from "@/store/product";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CirclePlus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "../ui/checkbox";
import { TextInputField } from "./text-input-field";


function CreateProduct() {

  const { createNewProduct } = useProductStore()

  const productForm = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      measurement_unit: '',
      category: '',
      state: undefined,
      stock_threshold: undefined,
      expiration_date: undefined,
      expiration_day_limit: undefined,
      measurement_models: [{
        name: '',
        state: '',
        is_default: false,
        quantitative: 0,
        sale_price: 0,
        cost_price: 0
      }],
    },
  });

  const { formState: { errors } } = productForm;

  const { fields, append, remove } = useFieldArray({
    control: productForm.control,
    name: "measurement_models",
  })

  function addNewMeasureModel() {
    append({
      name: '',
      state: '',
      is_default: false,
      quantitative: 0,
      sale_price: 0,
      cost_price: 0
    })
  }

  function onSubmit(values: z.infer<typeof productSchema>) {
    createNewProduct(values);
  }

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Button className="h-full bg-purple-500 cursor-pointer">
            <CirclePlus className="mr-1 flex" />
            Adicionar novo produto
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col h-full">
          <SheetHeader>
            <SheetTitle>
              Criando novo produto
            </SheetTitle>
          </SheetHeader>
          <Separator className="my-4" />
          <Form {...productForm} >
            <div className="flex-1 overflow-y-auto">
              <form onSubmit={productForm.handleSubmit(onSubmit)} className="space-y-6">
                <TextInputField
                  control={productForm.control}
                  name="name"
                  label="Nome do produto"
                  placeholder="Pastilha"
                />
                <TextInputField
                  control={productForm.control}
                  name="measurement_unit"
                  label="Unidade de medida"
                  placeholder="Cartela"
                />
                <TextInputField
                  control={productForm.control}
                  name="category"
                  label="Categoria do produto"
                  placeholder="Doces"
                />
                <FormField
                  control={productForm.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-right">Estado</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Estado" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent >
                          <SelectItem value="true">Ativo</SelectItem>
                          <SelectItem value="false">Desativado</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-left" />
                    </FormItem>
                  )}
                />
                <TextInputField
                  control={productForm.control}
                  name="stock_threshold"
                  label="Quantidade em estoque"
                  placeholder="15"
                  type="number"
                />
                <TextInputField
                  control={productForm.control}
                  name="expiration_date"
                  label="Data de validade"
                  placeholder="XX/XX/XXXX"
                  type="date"
                />
                <TextInputField
                  control={productForm.control}
                  name="expiration_day_limit"
                  label="Dias antes do vencimento"
                  placeholder="15"
                  type="number"
                />
                <div className="flex justify-between">
                  <p className="flex items-center">Unidade(s) de medida</p>
                  <Button
                    type="button"
                    variant={"link"}
                    className="p-0"
                    onClick={addNewMeasureModel}
                  >
                    Adicionar
                  </Button>
                </div>
                {
                  fields.map((field, index) => {
                    return (
                      <div key={field.id} className="space-y-6">
                        <FormField
                          control={productForm.control}
                          name={`measurement_models.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex justify-between">
                                <FormLabel>Unidade de medida</FormLabel>
                                {
                                  fields.length > 1 && (
                                    <p
                                      className="text-sm cursor-pointer hover:underline"
                                      onClick={() => remove(index)}
                                    >
                                      Remover
                                    </p>
                                  )
                                }
                              </div>
                              <FormControl>
                                <Input placeholder="UN, ML, Cartela. Copo..." {...field} />
                              </FormControl>
                              <FormMessage className="text-left" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={productForm.control}
                          name={`measurement_models.${index}.state`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-right col-span-2">Estado</FormLabel>
                              <Select onValueChange={field.onChange}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Estado" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="true">Ativo</SelectItem>
                                  <SelectItem value="false">Desativado</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-left" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={productForm.control}
                          name={`measurement_models.${index}.is_default`}
                          render={({ field }) => (
                            <FormItem className="flex flex-col space-y-2">
                              <div className="flex items-center space-x-2">
                                <FormControl className="flex items-center">
                                  <Checkbox
                                    checked={field.value}
                                    className="col-span-3"
                                    onCheckedChange={(checked) => {
                                      productForm.setValue(
                                        "measurement_models",
                                        productForm.getValues("measurement_models").map((model, idx) => ({
                                          ...model,
                                          is_default: idx === index ? !!checked : false,
                                        }))
                                      );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-right flex-shrink-0">Modelo Padrão</FormLabel>
                              </div>
                              <FormMessage className="text-left mt-1">{errors.measurement_models?.root?.message}</FormMessage>
                            </FormItem>
                          )}
                        />
                        <TextInputField
                          control={productForm.control}
                          name={`measurement_models.${index}.quantitative`}
                          label="Quantitativo"
                          placeholder="15"
                          type="number"
                        />
                        <TextInputField
                          control={productForm.control}
                          name={`measurement_models.${index}.sale_price`}
                          label="Preço de venda"
                          placeholder="15"
                          type="number"
                        />
                        <TextInputField
                          control={productForm.control}
                          name={`measurement_models.${index}.cost_price`}
                          label="Preço de custo"
                          placeholder="15"
                          type="number"
                        />
                      </div>
                    )
                  })
                }
                <Button type="submit" className="w-full text-white bg-purple-500">
                  Finalizar
                </Button>
              </form>
            </div>
          </Form>
        </SheetContent>
      </Sheet >
    </>
  )
}

export default CreateProduct