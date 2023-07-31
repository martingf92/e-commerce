import React, { useState, useEffect } from "react";
import ErrorMessage from "../../components/Error";
import styles from "./styles.module.css";
import { useParams, useNavigate } from "react-router-dom";
import EditModal from "../../components/EditModal"; // Modal de edición
import DeleteModal from "../../components/DeleteModal"; // Modal de eliminación

interface RouteParams {
  productId: string;
  [key: string]: string | undefined;
}

interface ProductData {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

const EditDeleteProducts: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useParams<RouteParams>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts(); // Llamar a la función para obtener los productos al montar el componente
  }, [currentPage]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const limit = 10; // Número de productos por página
      const offset = (currentPage - 1) * limit;

      const response = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`);
      if (!response.ok) {
        const errorMessage = "Failed to fetch products";
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setProducts(data);
      setTotalPages(Math.ceil(data.total / limit));
    } catch (error) {
      setError(error.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEditModal = (product: ProductData) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleUpdateProduct = async (updatedProduct: ProductData) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/products/${updatedProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        const errorMessage = "Failed to update product";
        throw new Error(errorMessage);
      }

      // Actualizamos los productos en la lista
      setProducts((prevProducts) =>
        prevProducts.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
      );

      // Cerramos el modal de edición
      handleCloseEditModal();
    } catch (error) {
      setError(error.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDeleteModal = (product: ProductData) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/products/${selectedProduct!.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorMessage = "Failed to delete product";
        throw new Error(errorMessage);
      }

      // Eliminamos el producto de la lista
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== selectedProduct!.id));

      // Si la eliminación del producto fue exitosa, redirige a la página de productos
      navigate("/products");
    } catch (error) {
      setError(error.message || "Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>All Products</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {error && <ErrorMessage message={error} />}
          <div className={styles.cardsContainer}>
            {products.map((product) => (
              <div key={product.id} className={styles.card}>
                <img src={product.image} alt={product.title} className={styles.cardImage} />
                <h3 className={styles.cardTitle}>{product.title}</h3>
                <p className={styles.cardDescription}>{product.description}</p>
                <p className={styles.cardPrice}>Price: ${product.price}</p>
                <button className={styles.cardButton} onClick={() => handleOpenEditModal(product)}>
                  Edit
                </button>
                <button className={styles.cardButton} onClick={() => handleOpenDeleteModal(product)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modales */}
      {showEditModal && (
        <EditModal
          productData={selectedProduct!}
          closeModal={handleCloseEditModal}
          updateProduct={handleUpdateProduct}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          closeModal={handleCloseDeleteModal}
          deleteProduct={handleDeleteProduct}
        />
      )}

      {/* Paginación */}
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            className={currentPage === pageNumber ? styles.activePageButton : styles.pageButton}
            onClick={() => setCurrentPage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EditDeleteProducts;
