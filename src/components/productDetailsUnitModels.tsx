import { useState, useEffect } from "react";
import { useProductStore } from "@/store/product";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { productDetails as ProductDetailsType } from "@/types/productDetails.types.tsx";

type ProductDetailsUnitModelsProps = {
  isEditable: boolean;
};

function ProductDetailsUnitModels({ isEditable }: ProductDetailsUnitModelsProps) {
  // Obtém os detalhes do produto do store
  const { productDetails, setProductDetails } = useProductStore() as {
    productDetails: ProductDetailsType | null;
    setProductDetails: (data: ProductDetailsType) => void;
  };

  // Chama o Hook useState incondicionalmente, inicializando com um array vazio se não houver dados
  const [unitModels, setUnitModels] = useState(
    productDetails?.unit_models?.all || []
  );

  // Atualiza o estado local sempre que os detalhes do produto forem atualizados
  useEffect(() => {
    if (productDetails && productDetails.unit_models && productDetails.unit_models.all) {
      setUnitModels(productDetails.unit_models.all);
    }
  }, [productDetails]);

  // Se os detalhes do produto ou as unidades não estiverem disponíveis, renderiza uma mensagem de carregamento
  if (!productDetails || !productDetails.unit_models || !productDetails.unit_models.all) {
    return <div>Carregando...</div>;
  }

  // Função para atualizar um campo específico de uma unidade de medida
  const handleUnitModelChange = (index: number, field: string, value: string | number) => {
    const updated = [...unitModels];
    updated[index] = { ...updated[index], [field]: value };
    setUnitModels(updated);
  };

  // Salva as alterações atualizando os detalhes do produto no store
  const handleSaveUnitModels = () => {
    setProductDetails({
      ...productDetails,
      unit_models: {
        ...productDetails.unit_models,
        all: unitModels,
      },
    });
  };

  // Restaura os valores originais das unidades de medida
  const handleCancelUnitModels = () => {
    setUnitModels(productDetails.unit_models.all);
  };

  return (
    <div className="space-y-12">
      {unitModels.map((unitModel, index) => (
        <div className="space-y-4" key={unitModel.id}>
          <div className="grid gap-2">
            <Label htmlFor={`unit_name_${unitModel.id}`}>Nome</Label>
            <Input
              id={`unit_name_${unitModel.id}`}
              type="text"
              disabled={!isEditable}
              value={unitModel.name}
              onChange={(e) => handleUnitModelChange(index, "name", e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`unit_stock_${unitModel.id}`}>Total em estoque</Label>
            <Input
              id={`unit_stock_${unitModel.id}`}
              type="number"
              disabled={!isEditable}
              value={unitModel.stock_quantitative}
              onChange={(e) =>
                handleUnitModelChange(index, "stock_quantitative", Number(e.target.value))
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`unit_sale_price_${unitModel.id}`}>Preço de venda</Label>
            <Input
              id={`unit_sale_price_${unitModel.id}`}
              type="number"
              disabled={!isEditable}
              value={unitModel.sale_price}
              onChange={(e) =>
                handleUnitModelChange(index, "sale_price", Number(e.target.value))
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`unit_cost_price_${unitModel.id}`}>Preço de custo</Label>
            <Input
              id={`unit_cost_price_${unitModel.id}`}
              type="number"
              disabled={!isEditable}
              value={unitModel.cost_price}
              onChange={(e) =>
                handleUnitModelChange(index, "cost_price", Number(e.target.value))
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`unit_net_profit_${unitModel.id}`}>Lucro líquido</Label>
            <Input
              id={`unit_net_profit_${unitModel.id}`}
              type="number"
              disabled={!isEditable}
              value={unitModel.net_profit}
              onChange={(e) =>
                handleUnitModelChange(index, "net_profit", Number(e.target.value))
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`unit_profit_margin_${unitModel.id}`}>Margem de lucro</Label>
            <Input
              id={`unit_profit_margin_${unitModel.id}`}
              type="number"
              disabled={!isEditable}
              value={unitModel.profit_margin}
              onChange={(e) =>
                handleUnitModelChange(index, "profit_margin", Number(e.target.value))
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`unit_roi_${unitModel.id}`}>Retorno sobre investimento</Label>
            <Input
              id={`unit_roi_${unitModel.id}`}
              type="number"
              disabled
              value={unitModel.return_on_investment}
            />
          </div>
          {index < unitModels.length - 1 && <Separator />}
        </div>
      ))}
      {isEditable && (
        <div className="flex gap-2">
          <Button onClick={handleSaveUnitModels}>Salvar Unidades</Button>
          <Button variant="secondary" onClick={handleCancelUnitModels}>Cancelar</Button>
        </div>
      )}
    </div>
  );
}

export default ProductDetailsUnitModels;
