import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const loggedIn = localStorage.getItem('loggedIn') === 'true';

  return loggedIn ? <Navigate to="/" replace /> : <>{children}</>;
};
