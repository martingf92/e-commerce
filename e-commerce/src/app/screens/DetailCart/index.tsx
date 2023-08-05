// import React from 'react';
// import { useCartContext } from '../../hooks/CreateContext';
// import { Link } from 'react-router-dom';
// import { useMutation } from 'react-query';
// import styles from './styles.module.css';

// const Cart: React.FC = () => {
//   const { cartItems, clearCart, removeFromCart, decreaseQuantity } = useCartContext();

//   const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

//   const handlePurchase = async () => {
//     // Simulate a successful purchase
//     // You would normally handle the purchase logic with an API call here
//     // For the sake of this example, I'm just clearing the cart
//     await clearCart();
//   };

//   const purchaseMutation = useMutation(handlePurchase);

//   if (purchaseMutation.isSuccess) {
//     return (
//       <div>
//         <h2>Compra realizada con éxito</h2>
//         <p>¡Gracias por tu compra!</p>
//         <Link to="/">Volver a la página principal</Link>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className={styles.cart}>
//         <div className={styles.cartDetails}>
//           <div className={styles.cartTotal}>
//             Total $ {totalAmount}
//           </div>
//           <div className={styles.cartIcon}>
//             <span className={styles.cartItemsCount}>Items {totalItems}</span>
//           </div>
//         </div>
//         <img src="/shop.png" alt="shop" />
//       </div>

//       {/* Renderiza los productos en el carrito */}
//       {cartItems.map((item) => (
//         <div key={item.id} className={styles.productCard}>
//           <img src={item.image} alt={item.name} />
//           <div>{item.name}</div>
//           <div>Precio: ${item.price}</div>
//           <div>Cantidad: {item.quantity}</div>
//           <button onClick={() => removeFromCart(item.id)}>Remover</button>
//           <button onClick={() => decreaseQuantity(item.id)}>Disminuir</button>
//         </div>
//       ))}

//       <button className={styles.purchaseButton} onClick={() => purchaseMutation.mutate()}>
//         Finalizar compra
//       </button>
//     </div>
//   );
// };

// export default Cart;


import React, { useState, useEffect } from 'react';
import { useCartContext } from '../../hooks/CreateContext';
import { useMutation } from 'react-query';
import styles from './styles.module.css';
import { Link, useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
}

const Cart: React.FC = () => {
  const { cartItems, clearCart, removeFromCart, decreaseQuantity } = useCartContext();

  const navigate = useNavigate(); // Usar useNavigate para redireccionar

  const [productInfoCache, setProductInfoCache] = useState<{ [key: number]: Product }>({});
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Fetch product information for items in the cart
    cartItems.forEach((item) => {
      if (!productInfoCache[item.id]) {
        fetchProductInfo(item.id);
      }
    });
  }, [cartItems, productInfoCache]);

  const fetchProductInfo = async (productId: number) => {
    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`);
      const data: Product = await response.json();
      setProductInfoCache((prevCache) => ({ ...prevCache, [productId]: data }));
    } catch (error) {
      console.error('Error fetching product information:', error);
    }
  };

  const handleOpenModal = (productId: number) => {
    const product = productInfoCache[productId];
    if (product) {
      setModalProduct(product);
    }
  };

  const handleCloseModal = () => {
    setModalProduct(null);
  };

  const handleFinalizePurchase = async () => {
    await clearCart();
    navigate('/success'); // Redireccionar a la vista de compra exitosa
  };

  const purchaseMutation = useMutation(handleFinalizePurchase);

  return (
    <div>
      <div className={styles.cardContainer}>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.productCard}>
            <img src={productInfoCache[item.id]?.images[0]} alt={productInfoCache[item.id]?.title} />
            <div className={styles.productInfo}>
              <div>{productInfoCache[item.id]?.title}</div>
              <div>Precio: ${productInfoCache[item.id]?.price}</div>
              <div>Cantidad: {item.quantity}</div>
              <button onClick={() => removeFromCart(item.id)}>Remover</button>
              <button onClick={() => decreaseQuantity(item.id)}>Disminuir</button>
              <button onClick={() => handleOpenModal(item.id)}>Ver Detalles</button>
            </div>
          </div>
        ))}
      </div>

      {modalProduct && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
           <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>{modalProduct.title}</h2>
              <img src={modalProduct.images[0]} alt={modalProduct.title} />
              <p>{modalProduct.description}</p>
              <p>Precio: ${modalProduct.price}</p>
              {modalProduct.images.slice(1).map((image, index) => (
                <img key={index} src={image} alt={`${modalProduct.title} - Imagen ${index + 2}`} />
              ))}
              <button onClick={handleCloseModal}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
      

      <div className={styles.cart}>
        <div className={styles.cartDetails}>
        <div className={styles.cartTotal}>
            Total $ {cartItems.reduce((total, item) => total + (productInfoCache[item.id]?.price || 0) * item.quantity, 0)}
          </div>
          <div className={styles.cartIcon}>
            <span className={styles.cartItemsCount}>Items {cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
          </div>
        </div>
        <img src="/shop.png" alt="shop" />
      </div>

      <button className={styles.purchaseButton} onClick={() => purchaseMutation.mutate()}>
        Finalizar compra
      </button>

      {purchaseMutation.isSuccess && (
        <div>
          <h2>Compra realizada con éxito</h2>
          <p>¡Gracias por tu compra!</p>
          <Link to="/">Volver a la página principal</Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
