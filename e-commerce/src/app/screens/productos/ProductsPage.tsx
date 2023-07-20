import React, { useState } from "react";
import { useQuery } from "react-query";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/Error";
import styles from "./styles.module.css";


interface Category {
  id: number;
  name: string;
  image: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  category: Category;
}

const fetchCategories = async () => {
  const response = await fetch("https://api.escuelajs.co/api/v1/categories");
  if (!response.ok) {
    const errorMessage = "Failed to fetch categories";
    throw new Error(errorMessage);
  }
  const data = await response.json();
  return data as Category[];
};

const fetchProducts = async (query: string) => {
  const response = await fetch(`https://api.escuelajs.co/api/v1/products${query}`);
  if (!response.ok) {
    const errorMessage = "Failed to fetch products";
    throw new Error(errorMessage);
  }
  const data = await response.json();
  return data as Product[];
};


const ProductListView: React.FC = (): React.ReactElement => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handlePriceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceMin(e.target.value);
  };

  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceMax(e.target.value);
  };

  const handleFilterClick = () => {
    const queryParams = `?title=${title}&categoryId=${category}&price_min=${priceMin}&price_max=${priceMax}`;
    setFilteredProductsQuery(queryParams);
  };

  const { isLoading: isLoadingCategories, error: categoriesError } = useQuery<Category[]>(
    "categories",
    fetchCategories,
    {
      onSuccess: (data) => {
        setCategories(data);
      }
    }
  );

  const [filteredProductsQuery, setFilteredProductsQuery] = useState("");

  const { data: productsData, isLoading: isLoadingProducts, error: productsError } = useQuery<Product[]>(
    ["products", filteredProductsQuery],
    () => fetchProducts(filteredProductsQuery)
  );

  if (isLoadingCategories || isLoadingProducts) {
    return <Loader />;
  }


  if (categoriesError || productsError) {
    const errorMessage = (categoriesError as Error | undefined)?.message ?? (productsError as Error | undefined)?.message ?? "";
    return <ErrorMessage message={errorMessage} />;
  }
  


  const filteredProducts = productsData || [];




return (
    <div className={styles.productList}>
      <h2>Product List</h2>
     
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
          className={styles.filterInput}
        />
        <select
          value={category}
          onChange={handleCategoryChange}
          className={styles.filterSelect}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id.toString()}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Min Price"
          value={priceMin}
          onChange={handlePriceMinChange}
          className={styles.filterInput}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={priceMax}
          onChange={handlePriceMaxChange}
          className={styles.filterInput}
        />
        <button onClick={handleFilterClick} className={styles.filterButton}>
          Filtrar
        </button>
      </div>
  
      {filteredProducts.length > 0 ? (
        <div>
          {filteredProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <img src={product.images[0]} alt={product.title} />
              <h3>{product.title}</h3>
              <p>{product.price}</p>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <h1 className={styles.noProductsMessage}>No products found.</h1>
      )}
    </div>
  );
  
      }
export default ProductListView;