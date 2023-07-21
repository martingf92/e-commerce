import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

interface LogoutModalProps {
  handleLogout: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ handleLogout }) => {
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    handleLogout();
    navigate("/");
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Estas seguro de cerrar sesion?</h3>       
        <div className={styles.modalButtons}>
          <button className={styles.cancelButton} onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button className={styles.logoutConfirmButton} onClick={handleConfirmLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
