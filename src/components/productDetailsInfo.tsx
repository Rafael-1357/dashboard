import { useProductStore } from "@/store/product";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { productDetails as ProductDetailsType } from "@/types/productDetails.types.tsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import productSchema from "@/schemas/productSchema";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { updateProduct } from "@/services/Details";
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

  const { productDetails, setProductDetails } = useProductStore() as {
    productDetails: ProductDetailsType;
    setProductDetails: (data: ProductDetailsType) => void;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductDetailsType>({
    resolver: zodResolver(productSchema),
    defaultValues: productDetails,
  });

  useEffect(() => {
    reset(productDetails);
  }, [productDetails, reset]);

  const onSubmit = async (data: ProductDetailsType) => {
    setIsLoading(true);
    try {
      const success = await updateProduct(id, data);

      if (success) {
        setProductDetails(data)
        toast.success("Produto atualizado com sucesso!");
        toggleEditMode()
        setIsLoading(false);
      } else {
        toast.error("Falha ao atualizar o produto.");
      }
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  };

  const toggleEditMode = () => {
    setIsEditable((prev: any) => !prev);
    reset(productDetails)
  };

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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-2">
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
          <div className="grid gap-2">
            <Label htmlFor="category">Categoria</Label>
            <Input
              id="category"
              type="text"
              disabled={!isEditable}
              {...register("category")}
            />
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="absolute_unit">Unidade</Label>
            <Input
              id="absolute_unit"
              type="text"
              disabled={!isEditable}
              {...register("absolute_unit")}
            />
            {errors.absolute_unit && <p className="text-red-500 text-sm">{errors.absolute_unit.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="stock_threshold">Quantidade limite</Label>
            <div className="flex">
              <Badge className={`rounded-none rounded-s-sm text-sm font-normal bg-slate-700 ${isEditable ? "bg-purple-500" : ""}`} >{productDetails.absolute_unit}</Badge>
              <Input
                id="stock_threshold"
                type="number"
                disabled={!isEditable}
                {...register("stock_threshold", { valueAsNumber: true })}
              />
            </div>
            {errors.stock_threshold && <p className="text-red-500 text-sm">{errors.stock_threshold.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="expiration_day_limit">Aviso de expiração (dias)</Label>
            <Input
              id="expiration_day_limit"
              type="number"
              disabled={!isEditable}
              {...register("expiration_day_limit", { valueAsNumber: true })}
            />
            {errors.expiration_day_limit && <p className="text-red-500 text-sm">{errors.expiration_day_limit.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="total_in_stock">Total em estoque</Label>
            <div className="flex">
              <Badge className="rounded-none rounded-s-sm text-sm font-normal bg-slate-700" >R$</Badge>
              <Input id="total_in_stock" type="number" className="rounded-s-none" disabled value={productDetails.total_in_stock} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="currently_monthly_revenue">Total em vendas/mês</Label>
            <div className="flex">
              <Badge className="rounded-none rounded-s-sm text-sm font-normal bg-slate-700" >R$</Badge>
              <Input id="currently_monthly_revenue" className="rounded-s-none" type="number" disabled value={productDetails.currently_monthly_revenue} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="created_at">Criado em</Label>
            <Input 
              id="created_at"
              type="text"
              className="rounded-s-none"
              disabled
              value={productDetails.created_at ? format(parseISO(productDetails.created_at), 'dd/MM/yyyy HH:mm:ss') : 'Data inválida'}
            />
          </div>
          {isEditable && (
            <div className="flex gap-2 justify-end">
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
  );
}

export default ProductDetailsInfo;
