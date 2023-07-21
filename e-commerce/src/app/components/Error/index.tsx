import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Error</h2>
      <p className={styles.message}>{message}</p>
      <Link to="/" className={styles.button}>Back to Home</Link>
    </div>
  );
};

export default ErrorMessage;
