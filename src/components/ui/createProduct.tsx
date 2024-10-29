import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"
import {
  Form,
  FormControl,
  FormDescription,
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

const productCreateSch = z.object({
  name: z.string().min(2, {
    message: "Insira pelo menos 2 caracteres",
  }),
  status: z.string().min(1, "Selecione um estado"),
  category: z.string().min(2, {
    message: "Insira pelo menos 2 caracteres"
  }),
  stock_threshold: z.string(),
  expiration_day_limit: z.string(),
  expiration_date: z.string(),
})

function CreateProduct() {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof productCreateSch>>({
    resolver: zodResolver(productCreateSch),
    defaultValues: {
      name: "",
      status: "",
      category: "",
      stock_threshold: "",
      expiration_day_limit: "",
      expiration_date: "",
    },
  })

  function onSubmit(values: z.infer<typeof productCreateSch>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-6">
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
        <div className="flex justify-end">
          <Button
            type="submit"
            className="text-white bg-purple-500"
            onClick={() => {
              toast({
                variant: "created",
                title: "Produto adicionado",
                description: "Disponível na lista de produtos",
              })
            }}
            >
              Adicionar produto
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CreateProduct