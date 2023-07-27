// import React from 'react';
// import { Navigate } from 'react-router-dom';

// interface AdminProtectedRouteProps {
//   children: React.ReactNode;
// }

// const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
//   // Obtener el estado de inicio de sesión del usuario desde el localStorage
//   const loggedIn = localStorage.getItem('loggedIn') === 'true';

//   // Obtener la información del usuario almacenada en el localStorage, si existe
//   const storedUserData = localStorage.getItem('userData');
//   const userData: any | null = storedUserData ? JSON.parse(storedUserData) : null;

//   // Verificar si el usuario es un administrador
//   const isAdmin = userData?.role === 'admin';

//   // Si el usuario es un administrador y ha iniciado sesión, permitir el acceso al contenido protegido
//   if (isAdmin && loggedIn) {
//     return <>{children}</>;
//   }

//   // Si el usuario no es un administrador o no ha iniciado sesión, redirigir a la página "/adminpage"
//   return <Navigate to="/adminpage" replace />;
// };

// export default AdminProtectedRoute;


import { Navigate } from 'react-router-dom';

interface UserData {
  id: number;
  email: string;
  name: string;
  role: string;
}



export const AdminRoute = ({ children }) => {
  const loggedIn = localStorage.getItem('loggedIn') === 'true';
  
  const storedUserData = localStorage.getItem("userData");
  const userData: UserData | null = storedUserData ? JSON.parse(storedUserData) : null;
  const isAdmin = userData?.role === 'admin'

  return isAdmin && loggedIn ? children : <Navigate to="/" replace />;
};