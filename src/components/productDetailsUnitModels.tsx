import { useProductStore } from "@/store/product";
import {useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import UnitModelEdit from "./unitModelEdit";
import { LoaderCircle } from "lucide-react";
import { Button } from "./ui/button";
import NewModel from "./newModel";


function ProductDetailsUnitModels() {
  const { productDetails } = useProductStore()
  const [showNewModel, setShowNewModel] = useState(false);

  if (!productDetails) {
    return <div className="flex justify-center p-8"><LoaderCircle className="animate-spin" /></div>
  }

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle className="text-2xl">Modelos de Unidade</CardTitle>
          <CardDescription>Gerencie as variações de unidades deste produto</CardDescription>
        </div>
        <Button
          className="flex items-center gap-2"
          onClick={() => setShowNewModel(true)}
          disabled={showNewModel}
        >
          Novo modelo
        </Button>
      </CardHeader>
      <CardContent>
        {showNewModel && (
          <NewModel
            onCancel={() => setShowNewModel(false)}
            onSubmitSuccess={() => setShowNewModel(false)}
          />
        )}
        {
          productDetails &&
          productDetails.unit_models?.all.map((modelo) => (
            <UnitModelEdit key={modelo.id} {...modelo} />
          ))
        }
      </CardContent>
    </Card>
  );
}

export default ProductDetailsUnitModels;