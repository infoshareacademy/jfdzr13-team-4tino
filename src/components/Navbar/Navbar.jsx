import React from "react";
import { HashLink as Link } from 'react-router-hash-link';
import tinoName from "../../assets/4tino-name.png";
import styles from "./Navbar.module.css";



const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Link to="/">
        <img className={styles.bigIcon} src={tinoName} alt="icon" />
      </Link>
      <div className={styles.navMenu}>
      <Link smooth to="/#howItWorks">
        <button className={styles.item}>Jak to działa?</button>
      </Link>
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