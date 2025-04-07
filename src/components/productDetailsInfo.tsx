import { useProductStore } from "@/store/product";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { productDetails as ProductDetailsType } from "@/types/productDetails.types.tsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import productSchema from "@/schemas/productSchema";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { LoaderCircle } from "lucide-react";
import { format, parseISO } from "date-fns";

type ProductDetailsInfoProps = {
  id: string;
};

function ProductDetailsInfo({ id }: ProductDetailsInfoProps) {

  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { productDetails, updateProductDetails } = useProductStore()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductDetailsType>({
    resolver: zodResolver(productSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (productDetails) {
      reset(productDetails);
    }
  }, [productDetails])

  const toggleEditMode = () => {
    if (isEditable) {
      if (productDetails) {
        reset(productDetails);
      }
    }
    setIsEditable(!isEditable);
  };

  const onSubmit = async (formData: ProductDetailsType) => {
    setIsLoading(true);
    updateProductDetails(id, formData)
      .then(() => {
        toast.success("Produto atualizado com sucesso!");
        setIsEditable(false);
      })
      .catch((error) => {
        toast.error("Erro ao atualizar produto", { description: error.message });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (!productDetails) {
    return <div className="flex justify-center p-8"><LoaderCircle className="animate-spin" /></div>
  }

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle className="text-2xl">Detalhes do produto</CardTitle>
          <CardDescription>Visualize e edite o produto</CardDescription>
        </div>
        <Button onClick={toggleEditMode}>
          {isEditable ? "Desabilitar Edição" : "Habilitar Edição"}
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex gap-2 flex-wrap flex-row">
            <div className="flex-1 basis-[calc(50%-0.25rem)]">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                type="text"
                placeholder="Refrigerante 2L"
                disabled={!isEditable}
                {...register("name")}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div className="flex-1 basis-[calc(50%-0.25rem)]">
              <Label htmlFor="category">Categoria</Label>
              <Input
                id="category"
                type="text"
                disabled={!isEditable}
                {...register("category")}
              />
              {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
            </div>
            <div className="flex-1 basis-[calc(50%-0.25rem)]">
              <Label htmlFor="absolute_unit">Unidade</Label>
              <Input
                id="absolute_unit"
                type="text"
                disabled={!isEditable}
                {...register("absolute_unit")}
              />
              {errors.absolute_unit && <p className="text-red-500 text-sm">{errors.absolute_unit.message}</p>}
            </div>
            <div className="flex-1 basis-[calc(50%-0.25rem)]">
              <Label htmlFor="stock_threshold">Quantidade limite em estoque</Label>
              <div className="flex">
                <Input
                  id="stock_threshold"
                  type="number"
                  disabled={!isEditable}
                  className="rounded-e-none"
                  {...register("stock_threshold", { valueAsNumber: true })}
                />
                <Badge className={`rounded-none rounded-e-sm text-sm font-normal bg-slate-700 ${isEditable ? "bg-purple-500" : ""}`} >{productDetails.absolute_unit}</Badge>
              </div>
              {errors.stock_threshold && <p className="text-red-500 text-sm">{errors.stock_threshold.message}</p>}
            </div>
            <div className="flex-1 basis-[calc(50%-0.25rem)]">
              <Label htmlFor="total_in_stock">Total em estoque</Label>
              <div className="flex">
                <Input id="total_in_stock" type="number" className="rounded-e-none" disabled value={productDetails.total_in_stock} />
                <Badge className={`rounded-none rounded-e-sm text-sm font-normal bg-slate-700 ${isEditable ? "bg-purple-500" : ""}`} >{productDetails.absolute_unit}</Badge>
              </div>
            </div>
            <div className="flex-1 basis-[calc(50%-0.25rem)]">
              <Label htmlFor="expiration_day_limit">Aviso de expiração (dias)</Label>
              <Input
                id="expiration_day_limit"
                type="number"
                disabled={!isEditable}
                {...register("expiration_day_limit", { valueAsNumber: true })}
              />
              {errors.expiration_day_limit && <p className="text-red-500 text-sm">{errors.expiration_day_limit.message}</p>}
            </div>
            <div className="flex-1 basis-[calc(50%-0.25rem)]">
              <Label htmlFor="currently_monthly_revenue">Faturamento do mês</Label>
              <div className="flex">
                <Badge className="rounded-none rounded-s-sm text-sm font-normal bg-slate-700 hover:bg-slate-700" >R$</Badge>
                <Input id="currently_monthly_revenue" className="rounded-s-none" type="number" disabled value={productDetails.currently_monthly_revenue} />
              </div>
            </div>
            <div className="flex-1 basis-[calc(50%-0.25rem)]">
              <Label htmlFor="created_at">Criado em</Label>
              <Input
                id="created_at"
                type="text"
                disabled
                value={productDetails.created_at ? format(parseISO(productDetails.created_at), 'dd/MM/yyyy HH:mm:ss') : 'Data inválida'}
              />
            </div>
          </div>
          {isEditable && (
            <div className="flex gap-2 justify-end items-center">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <LoaderCircle className="animate-spin" /> : "Salvar alterações"}
              </Button>
              <Button type="button" variant="secondary" onClick={() => { reset(productDetails); toggleEditMode() }}>
                Cancelar
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

export default ProductDetailsInfo;
