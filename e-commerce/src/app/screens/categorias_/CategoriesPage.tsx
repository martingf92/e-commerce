import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css'

import { useQuery } from 'react-query';
import Loader from '../../components/Loader';
import Error from '../../components/Error';

interface Category {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

const App: React.FC = () => {
  const { data, isLoading, error } = useQuery<Category[]>('categories', async () => {
    const response = await fetch('https://api.escuelajs.co/api/v1/categories');
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const data = await response.json();
    return data;
  });

  const [categorias, setCategorias] = useState<Category[]>([]);

  useEffect(() => {
    if (data) {
      setCategorias(data);
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <div>
      <div className={styles.selectContainer}>
        <select>
          {categorias.map(categoria => (
            <option key={categoria.id} value={categoria.name}>
              {categoria.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.categoryList}>
        <h2>Categories</h2>
        <div className={styles.categoryCards}>
          {categorias.map(category => (
            <div key={category.id} className={styles.categoryCard}>
              <Link to={`/category/${category.id}/products`}>
                <img src={category.image} alt={category.name} />
                <h3>{category.name}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;




// const CategoriesPage: React.FC = () => {
//   const [categories, setCategories] = useState<any[]>([]);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch('https://api.escuelajs.co/api/v1/categories');
//       const data = await response.json();
//       setCategories(data);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };

//   return (
//     <div>
//       <div className={styles.categoryList}>
//         <div className={styles.categoryCard}>
//       <h1>Categorías</h1>
//       <ul>
//         {categories.map((category) => (
//           <li key={category.id}>
//             <Link to={`/products?category=${category.id}`}>{category.name}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   </div>
//   </div>
//   );
// };

// export default CategoriesPage;


  