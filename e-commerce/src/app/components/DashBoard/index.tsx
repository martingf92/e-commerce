import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css"; // Importar el archivo CSS que creamos

const AdminDashboard: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2>Admin Dashboard</h2>
      <div className={styles.navigation}>
        <Link to="/products/add" className={styles.link}>
          Add Product
        </Link>
        {/* Si tienes una lista de productos, puedes agregar un enlace para editar cada producto aquí:
        <Link to={`/products/${productId}/edit`} className={styles.link}>
          Edit Product
        </Link> */}
      </div>
      {/* Aquí vamos a utilizar el componente AddProductForm para crear un nuevo producto
      y el componente EditProductForm para editar un producto existente.
      Dependiendo de la ruta, mostraremos el formulario correspondiente. */}
      <div className={styles.content}>
        {/* Ruta para crear un nuevo producto */}
        <Link to="/products/add" className={styles.link}>
          Go to Add Product Form
        </Link>
        {/* Ruta para editar un producto existente */}
        {/* <Link to="/products/edit/:productId" className={styles.link}>
          Go to Edit Product Form
        </Link> */}
      </div>
    </div>
  );
};

export default AdminDashboard;

