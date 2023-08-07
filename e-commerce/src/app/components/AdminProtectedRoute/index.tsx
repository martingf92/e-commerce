import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface UserData {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface AdminProtectedRouteProps {
  children: ReactNode;
}

export const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps) => {
  const loggedIn = localStorage.getItem('loggedIn') === 'true';
  
  const storedUserData = localStorage.getItem("userData");
  const userData: UserData | null = storedUserData ? JSON.parse(storedUserData) : null;
  const isAdmin = userData?.role === 'admin';

  if (isAdmin && loggedIn) {
    return <>{children}</>; // Devuelve el contenido del children si el usuario es administrador y ha iniciado sesión
  } else {
    return <Navigate to="/" replace />; // Redirige si el usuario no cumple con los requisitos
  }
};
