import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProductStore } from '@/store/product';
import { LoaderCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { toast } from 'sonner';
import { preferencieEdit } from '@/schemas/productDetails';

function ProductDetailsPreferences() {
  const { productDetails, editUnitModelsPreferences } = useProductStore();
  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleEditMode = () => {
    setIsEditable((prev) => !prev);
    reset({
      listing_table: preferences.listing_table,
      stock_entry_selection: preferences.stock_entry_selection,
      sale_selection: preferences.sale_selection,
      loss_selection: preferences.loss_selection,
      stock_threshold: preferences.stock_threshold
    })
  };

  const methods = useForm<z.infer<typeof preferencieEdit>>({
    resolver: zodResolver(preferencieEdit),
    defaultValues: {
      listing_table: "",
      stock_entry_selection: "",
      sale_selection: "",
      loss_selection: "",
      stock_threshold: ""
    },
  });

  const { reset } = methods;

  if (!productDetails) {
    return <div className="flex justify-center p-8"><LoaderCircle className="animate-spin" /></div>;
  }

  const { unit_models } = productDetails;
  const preferences = productDetails.unit_models.preferences;
  const models = unit_models.all;

  if (preferences.listing_table && methods.getValues('listing_table') === "") {
    methods.reset({
      listing_table: preferences.listing_table,
      stock_entry_selection: preferences.stock_entry_selection,
      sale_selection: preferences.sale_selection,
      loss_selection: preferences.loss_selection,
      stock_threshold: preferences.stock_threshold
    });
  }

  function onSubmit(data: z.infer<typeof preferencieEdit>) {
    setIsLoading(true);
    editUnitModelsPreferences(data)
      .then(() => {
        toast.success("Preferências atualizadas com sucesso!");
        setIsEditable(false);
      })
      .catch((error) => {
        toast.error("Erro ao atualizar preferências", { description: error.message });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle className="text-2xl">Preferências</CardTitle>
          <CardDescription>Visualize e edite as preferência dos modelos de unidade</CardDescription>
        </div>
        <div className="flex gap-2 h-6 items-center">
          <Label htmlFor="edit">Edição</Label>
          <Switch type="button" id="edit" onClick={toggleEditMode} checked={isEditable} />
        </div>
      </CardHeader>
      <CardContent>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Listagem em tabela
              </label>
              <Select
                disabled={!isEditable}
                value={methods.watch('listing_table') || ''}
                onValueChange={(value) => methods.setValue('listing_table', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Nenhum" />
                </SelectTrigger>
                <SelectContent>
                  {models.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {methods.formState.errors.listing_table && (
                <p className="text-sm font-medium text-destructive">
                  {methods.formState.errors.listing_table.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Entrada de estoque
              </label>
              <Select
                disabled={!isEditable}
                value={methods.watch('stock_entry_selection') || ''}
                onValueChange={(value) => methods.setValue('stock_entry_selection', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Nenhum" />
                </SelectTrigger>
                <SelectContent>
                  {models.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {methods.formState.errors.stock_entry_selection && (
                <p className="text-sm font-medium text-destructive">
                  {methods.formState.errors.stock_entry_selection.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Seleção de venda
              </label>
              <Select
                disabled={!isEditable}
                value={methods.watch('sale_selection') || ''}
                onValueChange={(value) => methods.setValue('sale_selection', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Nenhum" />
                </SelectTrigger>
                <SelectContent>
                  {models.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {methods.formState.errors.sale_selection && (
                <p className="text-sm font-medium text-destructive">
                  {methods.formState.errors.sale_selection.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Seleção de perda
              </label>
              <Select
                disabled={!isEditable}
                value={methods.watch('loss_selection') || ''}
                onValueChange={(value) => methods.setValue('loss_selection', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Nenhum" />
                </SelectTrigger>
                <SelectContent>
                  {models.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {methods.formState.errors.loss_selection && (
                <p className="text-sm font-medium text-destructive">
                  {methods.formState.errors.loss_selection.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Limite de estoque
              </label>
              <Select
                disabled={!isEditable}
                value={methods.watch('stock_threshold') || ''}
                onValueChange={(value) => methods.setValue('stock_threshold', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Nenhum" />
                </SelectTrigger>
                <SelectContent>
                  {models.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {methods.formState.errors.stock_threshold && (
                <p className="text-sm font-medium text-destructive">
                  {methods.formState.errors.stock_threshold.message}
                </p>
              )}
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
        </FormProvider>
      </CardContent>
    </Card >
  );
}

export default ProductDetailsPreferences;