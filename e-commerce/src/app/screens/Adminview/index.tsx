

import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";


const AdminPage: React.FC = () => {
  return (
    <><h2>Dashboard</h2>
    <div className={styles.container}>
      
      <div className={styles.section}>
        <img
          src="1.png"
          alt="Crear Categorías"
          className={styles.cardImage}
        />
        <h3>Crear Categorías</h3>
        <Link to="/create/category" className={styles.button}>
          Crear Categorías
        </Link>
      </div>
      <div className={styles.section}>
        <img
          src="jake.gif"
          alt="Crear Productos"
          className={styles.cardImage}
        />
        <h3>Crear Productos</h3>
        <Link to="/create/product" className={styles.button}>
          Crear Productos
        </Link>
      </div>
      <div className={styles.section}>
        <img
          src="1.png"
          alt="Editar Categorías"
          className={styles.cardImage}
        />
        <h3>Editar Categorías</h3>
        <Link to="/edit/category" className={styles.button}>
          Editar Categorías
        </Link>
      </div>
      <div className={styles.section}>
        <img
          src="1.png"
          alt="Editar Productos"
          className={styles.cardImage}
        />
        <h3>Editar Productos</h3>
        <Link to="/edit/product" className={styles.button}>
          Editar Productos
        </Link>
      </div>
    </div>
    </>
  );
};

export default AdminPage;

