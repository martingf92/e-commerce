import React, { useState } from "react";
import ErrorMessage from "../../components/Error";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const CreateProduct: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

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
      const productData = {
        title,
        description,
        price,
        categoryId: 1, // Cambiar 1 por el ID de la categoría deseada
        images: [image],
      };

      const response = await fetch("https://api.escuelajs.co/api/v1/products/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorMessage = "Failed to add product";
        throw new Error(errorMessage);
      }

      setSuccess("Product created successfully");
      setError("");
      setTitle("");
      setDescription("");
      setPrice(0);
      setImage("");

      setLoading(false);
    } catch (error: unknown) { 
      setError((error as Error).message || "Failed to add product"); 
      
      setSuccess("");
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Add Product</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {error && <ErrorMessage message={error} />}
          {success && <p>{success}</p>}
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
              <label className={styles.inputLabel}>Title</label>
              <input className={styles.input} type="text" value={title} onChange={handleTitleChange} required />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.inputLabel}>Description</label>
              <input className={styles.input} type="text" value={description} onChange={handleDescriptionChange} required />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.inputLabel}>Price</label>
              <input className={styles.input} type="number" value={price} onChange={handlePriceChange} required />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.inputLabel}>Image URL</label>
              <input className={styles.input} type="text" value={image} onChange={handleImageChange} required />
            </div>
            <button className={styles.button} type="submit">Add Product</button>
          </form>
          <div className={styles.buttonContainer}>
            <button className={styles.navButton} onClick={() => navigate("/adminpage")}>
              Go to Admin Page
            </button>
            <button className={styles.navButton} onClick={() => navigate("/products")}>
              Go to Products Page
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateProduct;
