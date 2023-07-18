import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import LogoutModal from "../LogoutModal";

interface NavProps {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
}

const Nav: React.FC<NavProps> = ({ loggedIn, setLoggedIn }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleOpenLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setLoggedIn(false);
    setShowLogoutModal(false);
  };

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
          <Link to="/categories">Categories</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>

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

      {showLogoutModal && (
        <LogoutModal handleLogout={handleLogout} />
      )}
    </nav>
  );
};

export default Nav;

