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
  const { categoryId } = useParams<{ categoryId: string }>();
  const parsedCategoryId = parseInt(categoryId, 10);
  const apiUrl = `https://api.escuelajs.co/api/v1/categories/${parsedCategoryId}`;

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const categoriesData: Category[] = await response.json();
      setCategories(categoriesData);
    } catch (error) {
      setError(error.message || "Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    // Fetch category data when the component mounts
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch category data");
        }
        const categoryData: Category = await response.json();
        setEditedName(categoryData.name);
        setEditedImage(categoryData.image);
        setSuccess(""); // Clear the success state
        setError(""); // Clear the error state on successful fetch
      } catch (error) {
        setError(error.message || "Failed to fetch category data");
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
        const errorMessage = "Failed to update category";
        throw new Error(errorMessage);
      }

      setSuccess("Category updated successfully");
      setError("");
      setLoading(false);
      setSelectedCategory(null); // Clear the selected category after successful update
      setEditedName("");
      setEditedImage("");
      // Fetch the updated category data
      fetchCategories();
    } catch (error) {
      setError(error.message || "Failed to update category");
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
      const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${categoryIdToDelete}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorMessage = "Failed to delete category";
        throw new Error(errorMessage);
      }

      // Filter out the deleted category from the categories state
      setCategories((prevCategories) => prevCategories.filter((category) => category.id !== categoryIdToDelete));
      setLoading(false);
      setSelectedCategory(null); // Clear the selected category after successful deletion
      setShowDeleteConfirmation(false); // Close the delete confirmation modal
    } catch (error) {
      setError(error.message || "Failed to delete category");
      setLoading(false);
      setShowDeleteConfirmation(false); // Close the delete confirmation modal on error
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false); // Close the delete confirmation modal
  };

  const handleEditModal = (category: Category) => {
    setSelectedCategory(category);
    // Set the values of the category being edited to the states
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
          {error && <ErrorMessage message={error} />}
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
