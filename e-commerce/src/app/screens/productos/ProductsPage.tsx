import React, { useState } from "react";
import { useQuery } from "react-query";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/Error";
import styles from "./styles.module.css";
import { useCartContext } from "../../hooks/CreateContext";

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
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

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
      },
    }
  );

  const [filteredProductsQuery, setFilteredProductsQuery] = useState("");

  const { data: productsData, isLoading: isLoadingProducts, error: productsError } = useQuery<Product[]>(
    ["products", filteredProductsQuery],
    () => fetchProducts(filteredProductsQuery)
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (isLoadingCategories || isLoadingProducts) {
    return <Loader />;
  }

  if (categoriesError || productsError) {
    const errorMessage = (categoriesError as Error | undefined)?.message ?? (productsError as Error | undefined)?.message ?? "";
    return <ErrorMessage message={errorMessage} />;
  }

  const filteredProducts = productsData || [];
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const productsToDisplay = filteredProducts.slice(startIndex, endIndex);
  const { addToCart } = useCartContext();
  
  const handleAddToCart = (product:Product) => {
    if (product) {
      addToCart({
        ...product, quantity: 1,
        product: undefined,
        image: undefined,
        name: undefined
      }); 
    }
  };

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
          {categories?.map((category) => (
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

      <div className={styles.productListGrid}>
        {productsToDisplay.length > 0 ? (
          productsToDisplay.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.productImageContainer}>
                <img src={product.images[0]} alt="" className={styles.productImage} />
              </div>
              <div className={styles.productCardDetails}>
                <h3>{product.title}</h3>
                <p>{product.price}</p>
                <p>{product.description}</p>
                <button onClick={() => handleAddToCart(product)} className={styles.addToCartButton}>
                  Add to Cart</button>
              </div>
            </div>
          ))
        ) : (
          <h1 className={styles.noProductsMessage}>No products found.</h1>
        )}
      </div>

      <div className={styles.pagination}>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          {"<"}
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          {">"}
        </button>
      </div>
    </div>
  );
};

export default ProductListView;
