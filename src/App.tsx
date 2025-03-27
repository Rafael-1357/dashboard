import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Products from './pages/Products';
import CreateProduct from './pages/CreateProduct';
import ProtectedRoute from './components/helpers/ProtectedRoute';
import Layout from './components/helpers/layout';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/produtos" element={<Products />} />
            <Route path="/produtos/criar" element={<CreateProduct />} />
            <Route path='/produtos/detalhes/:id' element={<ProductDetails />} />
          </Route>
        </Route>
      </Routes>
  );
}

export default App;
