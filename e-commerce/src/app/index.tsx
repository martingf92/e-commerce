import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";
import Layout from "./components/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductsPage from "./screens/productos/ProductsPage";
import LoginUser from "./screens/LoginUser";
import RegisterUser from './screens/RegisterUser';
import { PrivateRoute } from './components/PrivateRoute';
import Categories from "./screens/categorias";
import ProductsByCategory from "./screens/categoriesByProducts";
const queryClient = new QueryClient();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}>
            <Route path="/" element={<Home />} />        
            <Route path="/categories" element={<Categories/>} />
            <Route path="/category/:categoryId/products" element={<ProductsByCategory/> } />
            <Route path="/products" element={<ProductsPage />} />
            <Route
              path="/login"
              element={
                <PrivateRoute>
                  <LoginUser setLoggedIn={setLoggedIn} />
                </PrivateRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PrivateRoute>
                  <RegisterUser setLoggedIn={setLoggedIn} />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

