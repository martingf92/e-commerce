// EditModal.tsx
import React, { useState } from "react";
import styles from "./styles.module.css";

interface ProductData {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

interface EditModalProps {
  productData: ProductData;
  closeModal: () => void;
  updateProduct: (productData: ProductData) => void;
}

const EditModal: React.FC<EditModalProps> = ({ productData, closeModal, updateProduct }) => {
  const [title, setTitle] = useState(productData.title);
  const [description, setDescription] = useState(productData.description);
  const [price, setPrice] = useState(productData.price);
  const [image, setImage] = useState(productData.image);

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

  const handleUpdate = () => {
    // Lógica para actualizar el producto
    const updatedProduct: ProductData = {
      ...productData,
      title,
      description,
      price,
      image,
    };
    updateProduct(updatedProduct);
    closeModal();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Edit Product</h2>
        <form className={styles.form}>
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
            <input className={styles.input} type="text" value={image} onChange={handleImageChange} />
            <input className={styles.input} type="text" value={image} onChange={handleImageChange} />
          </div>
          <button className={styles.button} onClick={handleUpdate}>Update Product</button>
          <button className={styles.button} onClick={closeModal}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
