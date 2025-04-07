import { useForm } from 'react-hook-form';
import { UnitModel } from '@/types/productDetails.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { unitModelEdit } from '@/schemas/productDetails';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useProductStore } from '@/store/product';
import { toast } from 'sonner';
import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';


interface NewModelProps {
  onCancel: () => void;
  onSubmitSuccess: () => void;
}

function NewModel({ onCancel, onSubmitSuccess }: NewModelProps) {

  const { newModel } = useProductStore()
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

  function handleCancel() {
    reset();
    onCancel();
  }

  function onSubmit(data: UnitModel) {
    setIsLoading(true);
    newModel(data)
      .then(() => {
        toast.success("Produto atualizado com sucesso!");
        onSubmitSuccess();
        reset();
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
      <div className="flex gap-2 flex-wrap flex-row">
        <div className="flex-1 basis-[calc(50%-0.25rem)]">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            type="text"
            placeholder="KG"
            // disabled={!isEditable}
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
              placeholder='876'
              type="number"
              step={0.01}
              {...register("stock_quantitative", {
                valueAsNumber: true,
              })}
            />
          </div>
          {errors.stock_quantitative?.message && typeof errors.stock_quantitative.message === "string" && (
            <p className="text-red-500 text-sm mt-1">{errors.stock_quantitative.message}</p>
          )}
        </div>
        <div className="flex-1 basis-[calc(50%-0.25rem)]">
          <Label htmlFor="cost_price">Preço de custo</Label>
          <div className="flex">
            <Badge className={`rounded-none rounded-s-sm text-sm font-normal `}>
              R$
            </Badge>
            <Input
              id="cost_price"
              placeholder='1.99'
              type="number"
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
          <Label htmlFor="sale_price">Preço de venda</Label>
          <div className="flex">
            <Badge className={`rounded-none rounded-s-sm text-sm font-norma`}>
              R$
            </Badge>
            <Input
              id="sale_price"
              type="number"
              className="rounded-s-none"
              placeholder='2.99'
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
      </div>
      <div className='flex gap-2 flex-wrap flex-row justify-end'>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <LoaderCircle className="animate-spin" /> : "Adicionar modelo"}
        </Button>
        <Button type="button" className='bg-red-500 hover:bg-red-600' onClick={handleCancel} >
          Cancelar
        </Button>
      </div>
    </form>
  )
}

export default NewModel