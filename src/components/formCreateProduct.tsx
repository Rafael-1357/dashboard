import { useForm } from "react-hook-form";
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import productSchema from "@/schemas/productSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProductCreate } from "@/types/products.types";
import localforage from "localforage";
import { toast } from "sonner";
import { CircleCheck, LoaderCircle, TriangleAlert } from "lucide-react";
import { useState } from "react";

function FormCreateProduct() {

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      category: '',
      absolute_unit: '',
      stock_threshold: undefined,
      expiration_day_limit: undefined
    }
  });

  async function onSubmit(data: FormProductCreate) {
    setIsLoading(true);
    const token = (await localforage.getItem<string>('access_token')) || '';
    const url = `${import.meta.env.VITE_API_URL}/api/products`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch products");
        return response.json();
      })
      .then(() => {
        setIsLoading(false);
        toast('Produto criado com sucesso', { icon: <CircleCheck />})
        reset()
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching products:", error);
        toast('Falha ao criar produto', { icon: <TriangleAlert /> })
      });
  }

  return (
    <div className="min-h-full w-full flex items-center justify-center">
      <Card className="flex flex-col gap-6 max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Criar produto</CardTitle>
          <CardDescription>
            Insira o conteúdo dos campos para criar o produto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Refrigerante 2L"
                  {...register("name")}
                />
                {errors.name && (<span className="text-red-500">{errors.name.message}</span>)}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="category">Categoria *</Label>
                </div>
                <Input
                  id="category"
                  type="text"
                  placeholder="Bebidas"
                  {...register("category")}
                />
                {errors.category && (<span className="text-red-500">{errors.category.message}</span>)}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="absolute_unit">Unidade</Label>
                </div>
                <Input
                  id="absolute_unit"
                  type="text"
                  placeholder="ML"
                  {...register("absolute_unit")}
                />
                {errors.absolute_unit && (<span className="text-red-500">{errors.absolute_unit.message}</span>)}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="stock_threshold">Quantidade limite</Label>
                </div>
                <Input
                  id="stock_threshold"
                  type="number"
                  placeholder="40000"
                  {...register("stock_threshold", { valueAsNumber: true })}
                />
                {errors.stock_threshold && (<span className="text-red-500">{errors.stock_threshold.message}</span>)}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="expiration_day_limit">Aviso de expiração</Label>
                </div>
                <Input
                  id="expiration_day_limit"
                  type="number"
                  placeholder="25 (dias)"
                  {...register("expiration_day_limit", { valueAsNumber: true })}
                />
                {errors.expiration_day_limit && (<span className="text-red-500">{errors.expiration_day_limit.message}</span>)}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <LoaderCircle className="animate-spin" /> : "Entrar"}
                </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default FormCreateProduct