import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

interface Category {
  id: number;
  name: string;
  image: string;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = React.useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className={styles.categoriesContainer}>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id} className={styles.categoryCard}>
            <Link to={`/products/${category.id}`}>
              <h3>{category.name}</h3>
              <img src={category.image} alt={category.name} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
        }  

export default Categories;











