import Header from "@/components/helpers/header";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useProductStore } from "@/store/product";
import ProductDetailsInfo from "@/components/productDetailsInfo";
import ProductDetailsUnitModels from "@/components/productDetailsUnitModels";
import ProductDetailsPreferences from "@/components/productDetailsPreferences";

function ProductDetails() {
  const { id } = useParams();
  const { getProductDetails } = useProductStore();

  useEffect(() => {
    if (id) {
      getProductDetails(id)
    }
  }, [id, getProductDetails])

  
  return (
    <div>
      <Header data={[{ label: "Produtos", href: "/produtos" }, { label: "Detalhes", href: "" }]} />
      <div className="p-4 flex flex-col gap-4">
        {id && <ProductDetailsInfo id={id} />}
        {id && <ProductDetailsUnitModels />}
        {id && <ProductDetailsPreferences />}
      </div>
    </div>
  );
}

export default ProductDetails;