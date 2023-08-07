// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import styles from "./styles.module.css";
// import LogoutModal from "../LogoutModal";
// import Cart from "../Cart";

// const Nav: React.FC = () => {
//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const navigate = useNavigate();

//   const handleOpenLogoutModal = () => {
//     setShowLogoutModal(true);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("loggedIn");
//     localStorage.removeItem("userData");
//     setShowLogoutModal(false);
//   };

//   // Retrieve user data from localStorage
//   const userData = JSON.parse(localStorage.getItem("userData") || "{}");
//   const loggedIn = localStorage.getItem("loggedIn") === "true";
//   const isAdmin = userData.role === "admin"; // Assuming the role key is stored in "userData"

//   return (
//     <nav className={styles.navbar}>
//       <Link to="/">
//         <div className={styles.logo}>
//           <img src="/logo.png" alt="Logo" className={styles.logoImg} />
//         </div>
//       </Link>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/categorias">Categorias</Link>
//         </li>
//         <li>
//           <Link to="/products">Productos</Link>
//         </li>
// <li>
//   <Cart></Cart>
// </li>
//         {loggedIn && isAdmin && (
//           <li>
//             <Link to="/adminpage">Dashboard</Link>
//           </li>
//         )}

//         <li className={styles.dropdown}>
//           <span>Account</span>
//           <ul className={styles.dropdownContent}>
//             {loggedIn ? (
//               <li className={styles.button} onClick={handleOpenLogoutModal}>
//                 Logout
//               </li>
//             ) : (
//               <>
//                 <li>
//                   <Link to="/login">Login</Link>
//                 </li>
//                 <li>
//                   <Link to="/register">Register</Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </li>
//       </ul>

//       {showLogoutModal && <LogoutModal handleLogout={handleLogout} />}
//     </nav>
//   );
// };

// export default Nav;



import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import LogoutModal from "../LogoutModal";
import Cart from "../Cart";

const Nav: React.FC = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleOpenLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userData");
    setShowLogoutModal(false);
  };

  // Retrieve user data from localStorage
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const loggedIn = localStorage.getItem("loggedIn") === "true";
  const isAdmin = userData.role === "admin"; // Assuming the role key is stored in "userData"

  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <div className={styles.logo}>
          <img src="/logo.png" alt="Logo" className={styles.logoImg} />
        </div>
      </Link>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/categorias">Categorias</Link>
        </li>
        <li>
          <Link to="/products">Productos</Link>
        </li>
        <li><Cart></Cart></li>
        {loggedIn && isAdmin && (
          <li>
            <Link to="/adminpage">Dashboard</Link>
          </li>
        )}

        <li className={styles.dropdown}>
          <span>Account</span>
          <ul className={styles.dropdownContent}>
            {loggedIn ? (
              <li className={styles.button} onClick={handleOpenLogoutModal}>
                Logout
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </li>
      </ul>

      {showLogoutModal && <LogoutModal handleLogout={handleLogout} />}
    </nav>
  );
};

export default Nav;
