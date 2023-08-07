import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;  
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children}) => {
  const loggedIn = localStorage.getItem('loggedIn') === 'true';

  return loggedIn ? <Navigate to="/" replace />   : <>{children}</>; // Devolvemos null si el usuario no está autenticado
};

export default PrivateRoute;



