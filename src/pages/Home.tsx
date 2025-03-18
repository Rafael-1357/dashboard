import Layout from "../components/helpers/layout";
import Header from "@/components/helpers/header";

function Home() {

  const data = [
    { label: "Home", href: "" },
  ]

  return (
    <Layout>
      <Header data={data} />
      <div className="p-4">
        <h1 className="text-2xl font-bold">Home</h1>
        <p>Bem vindo a página inicial</p>
      </div>
    </Layout>
  )
}

export default Home