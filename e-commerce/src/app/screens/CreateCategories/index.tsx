import React, { useState } from "react";
import ErrorMessage from "../../components/Error";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const CreateCategory: React.FC = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<string>("");

  const navigate = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const categoryData = {
        name,
        image,
      };

      const response = await fetch("https://api.escuelajs.co/api/v1/categories/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        const errorMessage = "Failed to create category";
        throw new Error(errorMessage);
      }

      setSuccess("Category created successfully");
      setError("");
      setName("");
      setImage("");

      setLoading(false);
    } catch (error: unknown) { 
      setError((error as Error).message || "Failed to create category");
      setSuccess("");
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Add Category</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {error && <ErrorMessage message={error} />}
          {success && <p>{success}</p>}
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
              <label className={styles.inputLabel}>Name</label>
              <input className={styles.input} type="text" value={name} onChange={handleNameChange} required />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.inputLabel}>Image URL</label>
              <input className={styles.input} type="text" value={image} onChange={handleImageChange} required />
            </div>
            <button className={styles.button} type="submit">Add Category</button>
          </form>
          <div className={styles.buttonContainer}>
            <button className={styles.navButton} onClick={() => navigate("/adminpage")}>
              Go to Admin Page
            </button>
            <button className={styles.navButton} onClick={() => navigate("/categorias")}>
              Go to Categories Page
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateCategory;
