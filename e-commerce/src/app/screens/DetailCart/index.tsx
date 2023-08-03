import React from 'react';
import { useCartContext } from '../../hooks/CreateContext';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import styles from './styles.module.css';

const Cart: React.FC = () => {
  const { cartItems, clearCart } = useCartContext();

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handlePurchase = async () => {
    // Simulate a successful purchase
    // You would normally handle the purchase logic with an API call here
    // For the sake of this example, I'm just clearing the cart
    await clearCart();
  };

  const purchaseMutation = useMutation(handlePurchase);

  if (purchaseMutation.isSuccess) {
    return (
      <div>
        <h2>Compra realizada con éxito</h2>
        <p>¡Gracias por tu compra!</p>
        <Link to="/">Volver a la página principal</Link>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.cart}>
        <div className={styles.cartDetails}>
          <div className={styles.cartTotal}>
            Total $ {totalAmount}
          </div>
          <div className={styles.cartIcon}>
            <span className={styles.cartItemsCount}>Items {totalItems}</span>
          </div>
        </div>
        <img src="/camion.png" alt="Camion" />
      </div>
      <button className={styles.purchaseButton} onClick={() => purchaseMutation.mutate()}>
        Finalizar compra
      </button>
    </div>
  );
};

export default Cart;
