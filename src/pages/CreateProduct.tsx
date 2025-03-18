import Layout from "@/components/helpers/layout";
import FormCreateProduct from "@/components/formCreateProduct";
import Header from "@/components/helpers/header";


function CreateProduct() {

  const data = [
    { label: "Produtos", href: "/produtos" },
    { label: "Criar", href: "/produtos/criar" },
  ]

  return (
    <Layout>
      <Header data={data} />
      <div className="p-4  h-full">
        <FormCreateProduct />
      </div>
    </Layout>
  )
}

export default CreateProduct