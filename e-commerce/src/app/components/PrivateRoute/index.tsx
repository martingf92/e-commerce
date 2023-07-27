// import { Navigate } from 'react-router-dom';

// interface PrivateRouteProps {
//   children: React.ReactNode;
// }

// export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
//   const loggedIn = localStorage.getItem('loggedIn') === 'true';

//   return loggedIn ? <Navigate to="/" replace /> : <>{children}</>;
// };
// components/PrivateRoute.tsx
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
  loggedIn: boolean;
  
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, loggedIn }) => {
  const navigate = useNavigate();

  return loggedIn ? <Navigate to="/" replace />   : <>{children}</>; // Devolvemos null si el usuario no está autenticado
};

export default PrivateRoute;



