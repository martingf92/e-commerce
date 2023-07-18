import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/Error';

interface Category {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

const App = () => {
  const { data, isLoading, error } = useQuery<Category[]>('categories', async () => {
    const response = await fetch('https://api.escuelajs.co/api/v1/categories');
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const data = await response.json();
    return data;
  });

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <ErrorMessage message={(error as { message?: string }).message || 'Unknown error'} />;
  }

  return (
    <div className={styles.categoryList}>
      <h2>Categories</h2>
      <div className={styles.categoryCards}>
        {data?.map((category) => (
          <div key={category.id} className={styles.categoryCard}>
            <Link to={`/category/${category.id}/products`}>
              <img src={category.image} alt={category.name} />
              <h3>{category.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

