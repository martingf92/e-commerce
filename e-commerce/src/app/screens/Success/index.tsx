import React from 'react';

const CompraExitosa: React.FC = () => {
  return (
    <div>
      <h2>Compra Exitosa</h2>
      <p>¡Gracias por tu compra!</p>
      <p>Tu pedido ha sido procesado con éxito.</p>
      <p>Esperamos que disfrutes de tus productos.</p>
      <img
        src="/pexels-karolina-grabowska-5632379.jpg"
        alt="Compra Exitosa"
        style={{ maxWidth: '50%', height: 'auto' }}
      />
    </div>
  );
};

export default CompraExitosa;
