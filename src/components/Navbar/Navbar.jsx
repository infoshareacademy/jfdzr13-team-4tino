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

      <Link smooth to="/#about">
        <button className={styles.item}>O nas</button>
      </Link>

        <div className={styles.loginPanel}>
          
          <Link to="/login">
              <button className={styles.login}>Zaloguj się</button>
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