import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";
import Layout from "./components/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import CategoriesPage from "./screens/categorias_/CategoriesPage";
import ProductsPage from "./screens/productos/ProductsPage";
import CategoriesByProducts from "./screens/categorias/CategoriesByProducts";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/category/:categoryId/products" element={<CategoriesByProducts/>} />
            <Route path="/products" element={<ProductsPage />} />
            {/* <Route path="/products/:id" element={<ProductsId />} />
            <Route path="/products/create" element={<CreateProducts/>} />
            <Route path="/products/:productId/edit" element={<EditProducts/>} />
            <Route path="/cart-detail" element={<DetailCart/>} /> */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
