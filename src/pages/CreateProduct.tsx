import FormCreateProduct from "@/components/formCreateProduct";
import Header from "@/components/helpers/header";


function CreateProduct() {

  const data = [
    { label: "Produtos", href: "/produtos" },
    { label: "Criar", href: "/produtos/criar" },
  ]

  return (
    <div>
      <Header data={data} />
      <div className="p-4  h-full">
        <FormCreateProduct />
      </div>
    </div>
  )
}

export default CreateProduct