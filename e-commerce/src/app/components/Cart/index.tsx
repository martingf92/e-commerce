import React from 'react';
import { useCartContext } from '../../hooks/CreateContext';
 import styles from './styles.module.css';

import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cartItems } = useCartContext();

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link to="cart/detail">
      <div className={styles.cart}>
        <div className={styles.cartDetails}>
          <div className={styles.cartTotal}>
            Total $ {totalAmount}
          </div>
          <div className={styles.cartIcon}>
            <span className={styles.cartItemsCount}>Items {totalItems}</span>
          </div>
        </div>
        <img src="/shop.png" alt="shop" />
      </div>
    </Link>

  );
};

export default Cart;