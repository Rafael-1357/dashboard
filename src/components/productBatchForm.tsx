import { Dialog } from "@radix-ui/react-dialog"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { Edit, LoaderCircle, Plus } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import batchFormSchema from "@/schemas/batchSchema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from "./ui/input"
import { Switch } from "./ui/switch"
import { Badge } from "./ui/badge"
import { BatchFormType } from "@/types/batch.types"
import { createBatch, updateBatch } from "@/services/batch"
import { toast } from "sonner"
import { useState } from "react"

function ProductBatchForm({ formType = null, editingBatch, selectedProduct, updateBatchList }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(batchFormSchema),
    defaultValues: {
      barcode: '',
      expiration_date: '',
      sold_out: false,
    }
  });

  function onSubmit(data: BatchFormType) {
    setIsLoading(true);
    if (formType == null) {
      createBatch(selectedProduct, data)
        .then(() => {
          toast.success("Lote criado com sucesso!");
          setOpen(false)
          updateBatchList()
        })
        .catch((error) => {
          toast.error("Erro ao criar lote", { description: error.message });
        })
    } else {
      updateBatch(editingBatch.id, data)
        .then(() => {
          toast.success("Lote atualizada com sucesso!");
          setOpen(false)
          updateBatchList()
        })
        .catch((error) => {
          toast.error("Erro ao atualizar lote", { description: error.message });
        })
    }
    setIsLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {
          formType === "edit" ? (
            <Button variant="outline" className="border-none size-8" onClick={() => {
              form.setValue('barcode', editingBatch.barcode);
              form.setValue('expiration_date', editingBatch.expiration_date.split('T')[0]);
              form.setValue('sold_out', editingBatch.sold_out);
            }}>
              <Edit  />
            </Button>
          ) : (
            <Button disabled={selectedProduct == null} onClick={() => { form.reset() }}>
              <Plus className="mr-2 h-4 w-4" /> Adicionar Lote
            </Button>
          )
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Lote</DialogTitle>
          <DialogDescription>
            Adicione um novo lote de produtos.
          </DialogDescription>
          {
            selectedProduct?.name ?
              <Badge variant="outline" className="mt-2 bg-violet-50 text-violet-700 border-violet-200">
                Product: {selectedProduct.name}
              </Badge>
              :
              null
          }
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="barcode"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-2">
                    <FormLabel className="text-right">Código de barras</FormLabel>
                    <FormControl className="col-span-3">
                      <Input type="number" {...field} className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                    </FormControl>
                    <FormMessage className="col-span-4 text-right mt-0" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expiration_date"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Data de expiração</FormLabel>
                    <FormControl className="col-span-3">
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage className="col-span-4 text-right" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sold_out"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Esgotado</FormLabel>
                    <FormControl className="col-span-3">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <div className="flex gap-2 justify-end items-center">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <LoaderCircle className="animate-spin" /> : "Salvar alterações"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ProductBatchForm