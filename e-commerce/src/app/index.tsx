import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";
import Layout from "./components/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductsPage from "./screens/productos/ProductsPage";
import LoginUser from "./screens/LoginUser";
import RegisterUser from './screens/RegisterUser';
import PrivateRoute from './components/PrivateRoute';
import Categories from "./screens/categorias";
import ProductsByCategory from "./screens/categoriesByProducts";
import { AdminProtectedRoute } from "./components/AdminProtectedRoute";
import AdminPage from "./screens/Adminview";
import CreateProduct from "./screens/CreateProducts";
import CreateCategory from "./screens/CreateCategories";
import EditDeleteCategory from "./screens/EditDeleteCategories"
import EditDeleteProducts from "./screens/EditDeleteProducts";


const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />        
            <Route path="/categorias" element={<Categories/>} />
            <Route path="/category/:categoryId/products" element={<ProductsByCategory/> } />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/login" element={
                <PrivateRoute>
                  <LoginUser />
                </PrivateRoute>
              }/>
            <Route path="/register" element={
                <PrivateRoute>
                  <RegisterUser />
                </PrivateRoute>
              }/>
            <Route path="/adminpage" element ={
              <AdminProtectedRoute>
                <AdminPage />
              </AdminProtectedRoute>
            }/>
            <Route path="/create/product" element ={
              <AdminProtectedRoute>
                <CreateProduct />
              </AdminProtectedRoute>
            }/>
            <Route path="/edit/product" element ={
              <AdminProtectedRoute>
                <EditDeleteProducts />
                {/* <EditProduct /> */}
                </AdminProtectedRoute>
            }/>
              
            <Route path="/create/category" element ={
              <AdminProtectedRoute>
                <CreateCategory />
              </AdminProtectedRoute>
            }/>
            <Route path="/edit/category" element ={
              <AdminProtectedRoute>
                <EditDeleteCategory />
                {/* <EditCategory /> */}
              </AdminProtectedRoute>
            }/>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
