import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './styles.module.css'

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: string;
}

const ProductsPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;

  return (
   <div className={styles.categoryList}> 
    <div>
      <h1>Listado de Productos</h1>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <p>Precio: ${product.price}</p>
            <img src={product.images[0]} alt={product.title} />
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default ProductsPage;

