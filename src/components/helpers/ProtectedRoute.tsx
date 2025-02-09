import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import localforage from 'localforage';

function ProtectedRoute() {
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o carregamento
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const token = await localforage.getItem('access_token'); // Verifica se o token existe
      if (!token) {
        navigate('/'); // Redireciona para o login se o token não existir
      } else {
        setIsLoading(false); // Permite o acesso à rota
      }
    };

    checkToken();
  }, [navigate]);

  if (isLoading) {
    return <div>Carregando...</div>; // Exibe um loading enquanto verifica o token
  }

  return <Outlet />; // Renderiza o componente da rota protegida
}

export default ProtectedRoute;