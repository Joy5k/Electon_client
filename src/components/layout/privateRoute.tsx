import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component }:any) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Store the intended path
      localStorage.setItem('redirectPath', window.location.pathname);
      navigate('/login');
    }
  }, [navigate]);

  return <Component />;
};

export default PrivateRoute;
