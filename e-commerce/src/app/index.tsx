// import { useState } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./screens/Home";
// import NotFound from "./screens/NotFound";
// import Layout from "./components/Layout";
// import { QueryClient, QueryClientProvider } from "react-query";
// import ProductsPage from "./screens/productos/ProductsPage";
// import LoginUser from "./screens/LoginUser";
// import RegisterUser from './screens/RegisterUser';
// import { PrivateRoute } from './components/PrivateRoute';
// import Categories from "./screens/categorias";
// import ProductsByCategory from "./screens/categoriesByProducts";
// const queryClient = new QueryClient();

// function App() {
//   const [loggedIn, setLoggedIn] = useState(false);

//   return (
//     <QueryClientProvider client={queryClient}>
//       <BrowserRouter>
//         <Routes>
//           <Route element={<Layout loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}>
//             <Route path="/" element={<Home />} />        
//             <Route path="/categorias" element={<Categories/>} />
//             <Route path="/category/:categoryId/products" element={<ProductsByCategory/> } />
//             <Route path="/products" element={<ProductsPage />} />
//             <Route
//               path="/login"
//               element={
//                 <PrivateRoute>
//                   <LoginUser setLoggedIn={setLoggedIn} />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/register"
//               element={
//                 <PrivateRoute>
//                   <RegisterUser setLoggedIn={setLoggedIn} />
//                 </PrivateRoute>
//               }
//             />
//           </Route>
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </QueryClientProvider>
//   );
// }

// export default App;


import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "./components/Layout";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";
import Categories from "./screens/categorias";
import ProductsByCategory from "./screens/categoriesByProducts";
import ProductsPage from "./screens/productos/ProductsPage";
import LoginUser from "./screens/LoginUser";
import RegisterUser from './screens/RegisterUser';
import AdminDashboardPage from "./screens/Adminview";
import AddProductForm from "./screens/CreateProducts/index";
import EditProductForm from "./screens/EditProducts/index";
import PrivateRoute from './components/PrivateRoute';

interface AppProps {
  // Agrega las props si las tienes en el componente
}

const App: React.FC<AppProps> = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkUserRole = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const response = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setIsAdmin(userData.role === "admin");
          setLoggedIn(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkUserRole();
  }, []);

  return (
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <Layout
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                isAdmin={isAdmin}
              />
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/categorias" element={<Categories />} />
            <Route path="/category/:categoryId/products" element={<ProductsByCategory />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/login" element={<LoginUser setLoggedIn={setLoggedIn} />} />
            <Route path="/register" element={<RegisterUser setLoggedIn={setLoggedIn} />} />
            {isAdmin && (
              <Route path="/Adminview" element={<AdminDashboardPage />} />
            )}
            
            <Route path="/screens/CreateProducts" element={
            <PrivateRoute  loggedIn={loggedIn} >
            <AdminDashboardPage />
            </PrivateRoute>} />
            
            
            <Route path="/screens/EditProducts" element={
            <PrivateRoute  loggedIn={loggedIn} >
            <AdminDashboardPage />
            </PrivateRoute>} />
            
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;


