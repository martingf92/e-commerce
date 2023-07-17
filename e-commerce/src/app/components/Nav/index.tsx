// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import './styles.module.css'; // Importar el archivo CSS

// function Navbar(): React.FC { return () => {
//   return (
//     <nav className="navbar">
//       <div className="logo">E-commerce</div>
//       <ul>
//         <li>
//           <NavLink exact to="/" activeClassName="active">
//             Inicio
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/categories" activeClassName="active">
//             Categorías
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/products" activeClassName="active">
//             Productos
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/cart-detail" activeClassName="active">
//             Detalle del carrito
//           </NavLink>
//         </li>
//       </ul>
//     </nav>
//   );
// };
// }
// export default Navbar;

import { Link } from "react-router-dom";
import styles from "./styles.module.css";

function Nav() {
 
return (
  <nav className={styles.navbar}>
    <Link to="/">
      <div className={styles.logo}>
        <img src="logo.png" alt="Logo" className={styles.logoImg} />
      </div>
    </Link>
    <ul>
      <li>
          <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/categories">Categorias</Link>
      </li>
      <li>
        <Link to="/products">Productos</Link>
      </li>
      <li>
        <Link to="/Cart">Carrito</Link>
      </li>
    </ul>
  </nav>
);
};


export default Nav;