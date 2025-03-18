import Layout from "../components/helpers/layout";
import { useProductStore } from "@/store/product"
import { useEffect } from "react";
import ProductTable from "@/components/productsTable";
import Header from "@/components/helpers/header";

function Products() {

  const { requestProducts } = useProductStore();
  const data = [
    { label: "Produtos", href: "/produtos" },
  ]

  useEffect(() => {
    requestProducts(null);
  }, []);

  return (
    <Layout>
      <Header data={data} />
      <div className="p-4">
        <ProductTable />
      </div>
    </Layout>
  )
}

export default Products