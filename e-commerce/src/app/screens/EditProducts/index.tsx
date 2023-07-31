import React, { useState, useEffect } from "react";
import ErrorMessage from "../../components/Error";
import styles from "./styles.module.css";
import { useParams, useNavigate } from "react-router-dom";

interface RouteParams {
  productId: string;
  [key: string]: string | undefined;
}

const EditProductForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const { productId } = useParams<RouteParams>();
  const navigate = useNavigate(); // Reemplazar useHistory por useNavigate

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Aquí debes realizar la llamada a la API para obtener los detalles del producto a editar
        // Utiliza el productId para construir la URL correspondiente a la obtención de un solo producto

        // Ejemplo de cómo sería la llamada a la API utilizando fetch:
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`);

        if (!response.ok) {
          const errorMessage = "Failed to fetch product details";
          throw new Error(errorMessage);
        }

        const productData = await response.json();
        setTitle(productData.title);
        setDescription(productData.description);
        setPrice(productData.price);
        setImage(productData.image);
      } catch (error) {
        setError(error.message || "Failed to fetch product details");
      }
    };

    fetchProduct();
  }, [productId]);

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
      // Aquí debes realizar la llamada a la API para actualizar el producto
      // Utiliza los valores de los estados title, description, price e image
      // Puedes utilizar el método PUT y la URL correspondiente a la actualización de productos de la API

      // Ejemplo de cómo sería la llamada a la API utilizando fetch:
      const response = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`, {
        method: "PUT",
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
        const errorMessage = "Failed to update product";
        throw new Error(errorMessage);
      }

      // Si la actualización del producto fue exitosa, redirige a la página de detalles del producto
      navigate(`/products/${productId}`);
    } catch (error) {
      setError(error.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Edit Product</h2>
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
            <button className={styles.button} type="submit">Update Product</button>
          </form>
        </>
      )}
    </div>
  );
};

export default EditProductForm;
