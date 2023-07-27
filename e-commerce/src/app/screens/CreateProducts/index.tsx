import React, { useState } from "react";
import ErrorMessage from "../../components/Error";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const AddProductForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Aquí debes realizar la llamada a la API para crear el producto
      // Utiliza los valores de los estados title, description, price e image
      // Puedes utilizar el método POST y la URL correspondiente a la creación de productos de la API

      // Ejemplo de cómo sería la llamada a la API utilizando fetch:
      const response = await fetch("https://api.escuelajs.co/api/v1/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          price,
          image,
        }),
      });

      if (!response.ok) {
        const errorMessage = "Failed to add product";
        throw new Error(errorMessage);
      }

      // Si la creación del producto fue exitosa, redirige a la página de productos
      navigate("/products");
    } catch (error) {
      setError(error.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  // Resto del código permanece igual
  // ...

  return (
    <div className={styles.container}>
      <h2>Add Product</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {error && <ErrorMessage message={error} />}
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
              <label className={styles.inputLabel}>Title</label>
              <input className={styles.input} type="text" value={title} onChange={handleTitleChange} />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.inputLabel}>Description</label>
              <input className={styles.input} type="text" value={description} onChange={handleDescriptionChange} />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.inputLabel}>Price</label>
              <input className={styles.input} type="number" value={price} onChange={handlePriceChange} />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.inputLabel}>Image URL</label>
              <input className={styles.input} type="text" value={image} onChange={handleImageChange} />
            </div>
            <button className={styles.button} type="submit">Add Product</button>
          </form>
        </>
      )}
    </div>
  );
};

export default AddProductForm;
