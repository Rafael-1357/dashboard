import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import localforage from 'localforage';

function ProtectedRoute() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const token = await localforage.getItem('access_token');
      if (!token) {
        navigate('/');
      } else {
        setIsLoading(false);
      }
    };

    checkToken();
  }, [navigate]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return <Outlet />;
}

export default ProtectedRoute;