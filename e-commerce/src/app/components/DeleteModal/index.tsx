// DeleteModal.tsx
import React from "react";
import styles from "./styles.module.css";

interface DeleteModalProps {
  closeModal: () => void;
  deleteProduct: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ closeModal, deleteProduct }) => {
  const handleDelete = () => {
    // Lógica para eliminar el producto
    deleteProduct();
    closeModal();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this product?</p>
        <div className={styles.modalButtons}>
          <button className={styles.button} onClick={handleDelete}>Delete</button>
          <button className={styles.button} onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
