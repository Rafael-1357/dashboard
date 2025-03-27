import Header from "@/components/helpers/header";
import { useParams } from "react-router-dom";
import { getProduct } from "@/services/Details";
import { useEffect } from "react";
import { useProductStore } from "@/store/product";
import ProductDetailsInfo from "@/components/productDetailsInfo";

function ProductDetails() {
  const { id } = useParams();
  const { setProductDetails } = useProductStore();


  useEffect(() => {
    if (id) {
      getProduct(id)
        .then((product) => setProductDetails(product))
        .catch((error) => console.error("Error fetching product:", error));
    }
  }, [id, setProductDetails]);


  return (
    <div>
      <Header data={[{ label: "Produtos", href: "/produtos" }, { label: "Detalhes", href: "" }]} />
      <div className="p-4">
            {id && <ProductDetailsInfo id={id}  />}
          {/* <CardHeader>
            <CardTitle className="text-2xl">Unidades de medida</CardTitle>
            <CardDescription>Visualize e edite as unidades de medida</CardDescription>
          </CardHeader>
          <CardContent>
            <ProductDetailsUnitModels isEditable={isEditable} />
          </CardContent> */}
      </div>
    </div>
  );
}

export default ProductDetails;
