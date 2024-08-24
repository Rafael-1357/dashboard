import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import Products from "./pages/products"
import Sales from "./pages/sales"
import Statistics from "./pages/statistics"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={Home()} />
        <Route path="/produtos" element={Products()} />
        <Route path="/vendas" element={Sales()} />
        <Route path="/estatisticas" element={Statistics()} />
        <Route path="*" element={<h1>Not found</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App