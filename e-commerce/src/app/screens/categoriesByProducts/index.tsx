// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import { useQuery } from "react-query";
// import Loader from "../../components/Loader";
// import ErrorMessage from "../../components/Error";
// import styles from "./styles.module.css";

// interface RouteParams {
//   categoryId: string;
//   [key: string]: string | undefined;
// }

// interface Category {
//   id: number;
//   name: string;
//   image: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   description: string;
//   images: string[];
//   createdAt: string;
//   updatedAt: string;
//   category: Category;
// }

// const fetchProductsByCategory = async (categoryId: string) => {
//   const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`);
//   if (!response.ok) {
//     const errorMessage = "Failed to fetch categories";
//     throw { message: errorMessage };
//   }
//   const data = await response.json();
//   return data as Product[];
// };

// const ProductsByCategory: React.FC = () => {
//   const { categoryId } = useParams<RouteParams>();
//   const { data, isLoading, error } = useQuery<Product[]>(["products", categoryId], () =>
//     fetchProductsByCategory(categoryId || "")
//   );

//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 8;

//   if (isLoading) {
//     return <Loader />;
//   }

//   if (error) {
//     return <ErrorMessage message={(error as Error).message} />;
//   }

  
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = data?.slice(indexOfFirstProduct, indexOfLastProduct);

  
//   const handlePageChange = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <div className={styles.categoryList}>
//       <h2>Products by Category: {categoryId}</h2>
//       {currentProducts && currentProducts.length > 0 ? (
//         <>
//           <div className={styles.categoryCards}>
//             {currentProducts.map((product) => (
//               <div key={product.id} className={styles.categoryCard}>
//                 <img src={product.images[0]} alt={product.title} className={styles.productImage} />
//                 <h3 className={styles.productTitle}>{product.title}</h3>
//                 <p className={styles.productPrice}>Price: {product.price}</p>
//                 <p className={styles.productDescription}>Description: {product.description}</p>
//               </div>
//             ))}
//           </div>

//           <div className={styles.pagination}>
//             {/* Pagination */}
//             <button
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//               className={styles.paginationButton}
//             >
//               {"<"}
//             </button>
//             <span className={styles.paginationPage}>Page: {currentPage}</span>
//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={indexOfLastProduct >= (data?.length || 0)}
//               className={styles.paginationButton}
//             >
//               {">"}
//             </button>
//           </div>
//         </>
//       ) : (
//         <h1 className={styles.noProductsMessage}>
//           Sorry, we are out of stock for the selected category.
//         </h1>
//       )}
//     </div>
//   );
// };

// export default ProductsByCategory;


import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/Error";
import styles from "./styles.module.css";
import { useCartContext } from '../../hooks/CreateContext'; // Importamos el contexto del carrito

interface RouteParams {
  categoryId: string;
  [key: string]: string | undefined;
}

interface Category {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  category: Category;
}

const fetchProductsByCategory = async (categoryId: string) => {
  const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`);
  if (!response.ok) {
    const errorMessage = "Failed to fetch categories";
    throw { message: errorMessage };
  }
  const data = await response.json();
  return data as Product[];
};

const ProductsByCategory: React.FC = () => {
  const { categoryId } = useParams<RouteParams>();
  const { data, isLoading, error } = useQuery<Product[]>(["products", categoryId], () =>
    fetchProductsByCategory(categoryId || "")
  );

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Context del carrito
  const { addToCart } = useCartContext();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={(error as Error).message} />;
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data?.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleAddToCart = (product) => {
    if (product) {
      addToCart({ ...product, quantity: 1 }); 
    }
  };

  return (
    <div className={styles.categoryList}>
      <h2>Products by Category: {categoryId}</h2>
      {currentProducts && currentProducts.length > 0 ? (
        <>
          <div className={styles.categoryCards}>
            {currentProducts.map((product) => (
              <div key={product.id} className={styles.categoryCard}>
                <img src={product.images[0]} alt={product.title} className={styles.productImage} />
                <h3 className={styles.productTitle}>{product.title}</h3>
                <p className={styles.productPrice}>Price: {product.price}</p>
                <p className={styles.productDescription}>Description: {product.description}</p>
                {/* Agregar botón "Agregar al carrito" */}
                <button onClick={() => handleAddToCart(product)} className={styles.addToCartButton}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          <div className={styles.pagination}>
            {/* Pagination */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={styles.paginationButton}
            >
              {"<"}
            </button>
            <span className={styles.paginationPage}>Page: {currentPage}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={indexOfLastProduct >= (data?.length || 0)}
              className={styles.paginationButton}
            >
              {">"}
            </button>
          </div>
        </>
      ) : (
        <h1 className={styles.noProductsMessage}>
          Sorry, we are out of stock for the selected category.
        </h1>
      )}
    </div>
  );
};

export default ProductsByCategory;
