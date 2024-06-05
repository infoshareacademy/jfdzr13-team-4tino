import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import tinoName from "../../assets/4tino-name.png";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Link to="/">
        <img className={styles.bigIcon} src={tinoName} alt="icon" />
      </Link>
      <div className={styles.navMenu}>
        <p>Jak to działa?</p>
        <p>O nas</p>
        <div className={styles.loginPanel}>
          <Link to="/login">
            {" "}
            <p>Zaloguj się</p>
          </Link>
          <Link to="/register">
            <button>Rejestracja </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
