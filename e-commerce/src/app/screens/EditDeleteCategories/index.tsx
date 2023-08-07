import React, { useState, useEffect } from "react";
import ErrorMessage from "../../components/Error";
import styles from "./styles.module.css";
import { useNavigate, useParams } from "react-router-dom";

interface Category {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
  categoryId: string;
}

const EditDeleteCategory: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState<number | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedImage, setEditedImage] = useState("");

  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId?: string }>();
  const parsedCategoryId = parseInt(categoryId ?? "", 10);
  const apiUrl = isNaN(parsedCategoryId)
  ? "https://api.escuelajs.co/api/v1/categories" // Default URL when categoryId is undefined or not a valid number
  : `https://api.escuelajs.co/api/v1/categories/${parsedCategoryId}`;
  console.log("apiUrl:", apiUrl);
  
  console.log("apiUrl:", apiUrl);

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const categoriesData: Category[] = await response.json();
      setCategories(categoriesData);
    } catch (error: unknown) { 
      setError((error as Error).message|| "Failed to fetch categories");
       
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch category data");
        }
        const categoryData: Category = await response.json();
        setEditedName(categoryData.name);
        setEditedImage(categoryData.image);
        setSuccess("");
        setError("");
      } catch (error: unknown) { 
        setError((error as Error).message|| "Failed to fetch category data"); 
         
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryData();
  }, [apiUrl]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedImage(e.target.value);
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      if (!selectedCategory) {
        throw new Error("No category selected for update");
      }

      const categoryData = {
        name: editedName,
        image: editedImage,
      };

      const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${selectedCategory.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        throw new Error("Failed to update category");
      }

      setSuccess("Category updated successfully");
      setError("");
      setLoading(false);
      setSelectedCategory(null);
      setEditedName("");
      setEditedImage("");
      fetchCategories();
    } catch (error: unknown) { 
      setError((error as Error).message|| "Failed to update category"); 
       
      setSuccess("");
      setLoading(false);
    }
  };

  const handleDelete = (categoryId: number) => {
    setCategoryIdToDelete(categoryId);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      if (!categoryIdToDelete) {
        throw new Error("No category selected for deletion");
      }

      const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${categoryIdToDelete}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      setCategories((prevCategories) => prevCategories.filter((category) => category.id !== categoryIdToDelete));
      setSelectedCategory(null);
      setShowDeleteConfirmation(false);
    } catch (error: unknown) { 
      setError((error as Error).message || "Failed to delete category");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleEditModal = (category: Category) => {
    setSelectedCategory(category);
    setEditedName(category.name);
    setEditedImage(category.image);
  };

  const handleEditModalClose = () => {
    setSelectedCategory(null);
    setEditedName("");
    setEditedImage("");
  };

  return (
    <div className={styles.container}>
      <h2>Edit/Delete Category</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {error && <ErrorMessage message={error} />} {/* Display error message */}
          {success && <p>{success}</p>}
          <div className={styles.buttonContainer}>
            <button className={styles.navButton} onClick={() => navigate("/adminpage")}>
              Go to Admin Page
            </button>
            <button className={styles.navButton} onClick={() => navigate("/categorias")}>
              Go to Categories
            </button>
          </div>
          <div className={styles.categoryList}>
            <h3>Categories</h3>
            <div className={styles.categoryGrid}>
              {categories.map((category) => (
                <div key={category.id} className={styles.categoryCard}>
                  <img src={category.image} alt={category.name} />
                  <span>{category.name}</span>
                  <div>
                    <button type="button" onClick={() => handleEditModal(category)}>
                      Edit
                    </button>
                    <button type="button" onClick={() => handleDelete(category.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Modal for confirming delete action */}
      {showDeleteConfirmation && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this category?</p>
            <button onClick={handleConfirmDelete}>Yes, delete</button>
            <button onClick={handleCancelDelete}>Cancel</button>
          </div>
        </div>
      )}

      {/* Modal for editing a category */}
      {selectedCategory && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Edit Category</h2>
            <div className={styles.inputContainer}>
              <label className={styles.inputLabel}>Name</label>
              <input
                className={styles.input}
                type="text"
                value={editedName}
                onChange={handleNameChange}
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.inputLabel}>Image URL</label>
              <input
                className={styles.input}
                type="text"
                value={editedImage}
                onChange={handleImageChange}
                required
              />
            </div>
            <button type="button" onClick={handleUpdate}>
              Save Changes
            </button>
            <button type="button" onClick={handleEditModalClose}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditDeleteCategory;
