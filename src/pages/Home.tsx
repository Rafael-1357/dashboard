import Header from "@/components/helpers/header";

function Home() {

  const data = [
    { label: "Home", href: "" },
  ]

  return (
    <div>

      <Header data={data} />
      <div className="p-4">
        <h1 className="text-2xl font-bold">Home</h1>
        <p>Bem vindo a página inicial</p>
      </div>
    </div>
  )
}

export default Home