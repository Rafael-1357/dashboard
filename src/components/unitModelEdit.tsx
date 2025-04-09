import { unitModelEdit } from "@/schemas/productDetails";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useEffect, useState } from "react";
import { Ellipsis, LoaderCircle, Percent } from "lucide-react";
import { Switch } from "./ui/switch";
import { UnitModel, unitModelFormEditType } from "@/types/productDetails.types";
import { toast } from "sonner";
import { useProductStore } from "@/store/product";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";



function UnitModelEdit(model: UnitModel) {
  const { productDetails, updateUnitModels, deleteModel } = useProductStore()
  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UnitModel>({
    resolver: zodResolver(unitModelEdit),
    defaultValues: {},
  });

  useEffect(() => {
    if (productDetails) {
      reset(productDetails.unit_models?.all.find((item) => item.id === model.id) as UnitModel);
    }
  }, [productDetails])

  const toggleEditMode = () => {
    setIsEditable((prev) => !prev);
    reset()
  };

  async function handleDelete() {
    deleteModel(model.id)
      .then(() => {
        toast.success("Modelo deletado com sucesso!");
      })
      .catch((error) => {
        toast.error("Erro ao tentar deletar produto", { description: error.message });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }


  async function onSubmit(data: unitModelFormEditType) {
    setIsLoading(true);
    updateUnitModels(model.id, data)
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
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4 p-4 border rounded-lg space-y-4">
      <div className="flex justify-end items-center space-x-2">
        <Label htmlFor="edit">Edição</Label>
        <Switch type="button" id="edit" onClick={toggleEditMode} checked={isEditable} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="h-auto">
            <Button variant="outline"><Ellipsis /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" asChild>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer"
              disabled={!model.can_be_deleted}
              onClick={() => handleDelete()}
            >
              Deletar
            </DropdownMenuItem>
            <DropdownMenuItem>
              Desativar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex gap-2 flex-wrap flex-row">
        <div className="w-full">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            type="text"
            placeholder="Refrigerante 2L"
            disabled={!isEditable}
            {...register("name")}
          />
          {errors.name?.message && typeof errors.name.message === "string" && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className="flex-1 basis-[calc(50%-0.25rem)]">
          <Label htmlFor="stock_quantitative">
            Total em estoque
          </Label>
          <div className="flex">
            <Input
              id="stock_quantitative"
              disabled={!isEditable}
              type="number"
              step={0.01}
              className="rounded-e-none"
              {...register("stock_quantitative", {
                valueAsNumber: true,
              })}
            />
            <Badge className={`rounded-none rounded-e-sm text-sm font-normal bg-slate-700 ${isEditable ? "bg-purple-500" : ""}`}>
              {model.name}
            </Badge>
          </div>
          {errors.stock_quantitative?.message && typeof errors.stock_quantitative.message === "string" && (
            <p className="text-red-500 text-sm mt-1">{errors.stock_quantitative.message}</p>
          )}
        </div>
        <div className="flex-1 basis-[calc(50%-0.25rem)]">
          <Label htmlFor="cost_price">Preço de custo</Label>
          <div className="flex">
            <Badge className={`rounded-none rounded-s-sm text-sm font-normal bg-slate-700 ${isEditable ? "bg-purple-500" : ""}`}>
              R$
            </Badge>
            <Input
              id="cost_price"
              type="number"
              disabled={!isEditable}
              className="rounded-s-none"
              step="0.01"
              {...register("cost_price", {
                valueAsNumber: true,
              })}
            />
          </div>
          {errors.cost_price?.message && typeof errors.cost_price.message === "string" && (
            <p className="text-red-500 text-sm mt-1">{errors.cost_price.message}</p>
          )}
        </div>
        <div className="flex-1 basis-[calc(50%-0.25rem)]">
          <Label htmlFor="net_profit">Retorno sobre investimento</Label>
          <div className="flex">
            <Input
              value={`${model.return_on_investment?.toFixed(2) || "0.00"}`}
              type="number"
              className="rounded-e-none"
              disabled
            />
            <Badge className={'rounded-none rounded-e-sm text-sm font-normal bg-slate-700'}>
              <Percent size={15} />
            </Badge>
          </div>
        </div>
        <div className="flex-1 basis-[calc(50%-0.25rem)]">
          <Label htmlFor="sale_price">Preço de venda</Label>
          <div className="flex">
            <Badge className={`rounded-none rounded-s-sm text-sm font-normal bg-slate-700 ${isEditable ? "bg-purple-500" : ""}`}>
              R$
            </Badge>
            <Input
              id="sale_price"
              type="number"
              disabled={!isEditable}
              className="rounded-s-none"
              step="0.01"
              {...register("sale_price", {
                valueAsNumber: true,
              })}
            />
          </div>
          {errors.sale_price?.message && typeof errors.sale_price.message === "string" && (
            <p className="text-red-500 text-sm mt-1">{errors.sale_price.message}</p>
          )}
        </div>
        <div className="flex-1 basis-[calc(50%-0.25rem)]">
          <Label htmlFor="net_profit">Margem de lucro</Label>
          <div className="flex">
            <Input
              value={`${model.profit_margin?.toFixed(2) || "0.00"}`}
              type="number"
              className="rounded-e-none"
              disabled
            />
            <Badge className={'rounded-none rounded-e-sm text-sm font-normal bg-slate-700'}>
              <Percent size={15} />
            </Badge>
          </div>
        </div>
        <div className="flex-1 basis-[calc(50%-0.25rem)]">
          <Label htmlFor="net_profit">Lucro líquido</Label>
          <div className="flex">
            <Badge className={'rounded-none rounded-s-sm text-sm font-normal bg-slate-700'}>
              R$
            </Badge>
            <Input
              value={`${model.net_profit?.toFixed(2) || "0.00"}`}
              type="number"
              disabled
              className="rounded-s-none"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-2 justify-end items-center">
        {isEditable && (
          <div className="flex gap-2 justify-end items-center">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <LoaderCircle className="animate-spin" /> : "Salvar alterações"}
            </Button>
          </div>
        )}
      </div>
    </form>
  )
}

export default UnitModelEdit