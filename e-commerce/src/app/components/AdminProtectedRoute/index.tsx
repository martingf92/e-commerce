// import { Navigate } from 'react-router-dom';

// interface UserData {
//   id: number;
//   email: string;
//   name: string;
//   role: string;
// }

// export const AdminProtectedRoute = ({ children }) => {
//   const loggedIn = localStorage.getItem('loggedIn') === 'true';
  
//   const storedUserData = localStorage.getItem("userData");
//   const userData: UserData | null = storedUserData ? JSON.parse(storedUserData) : null;
//   const isAdmin = userData?.role === 'admin' 

//   return isAdmin && loggedIn ? children : <Navigate to="/" replace />;
// };



import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface UserData {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface AdminProtectedRouteProps {
  children: ReactNode; // Utiliza ReactNode para permitir cualquier tipo de componente como hijo
}

export const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps) => {
  const loggedIn = localStorage.getItem('loggedIn') === 'true';
  
  const storedUserData = localStorage.getItem("userData");
  const userData: UserData | null = storedUserData ? JSON.parse(storedUserData) : null;
  const isAdmin = userData?.role === 'admin';

  return isAdmin && loggedIn ? children : <Navigate to="/" replace />;
};
