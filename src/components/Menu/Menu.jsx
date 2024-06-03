import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Menu.module.css";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.dropdown}>
      <button
        className={`${styles.dropdownButton} ${isOpen ? styles.active : ""}`}
        onClick={toggleDropdown}
      >
        Menu
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          <Link to="/trees">
            <button className={styles.item}>Trees</button>
          </Link>
          <Link to="/plates">
            <button className={styles.item}>Plates</button>
          </Link>
          <Link to="/dedications">
            <button className={styles.item}>Dedications</button>
          </Link>
          <Link to="/map">
            <button className={styles.item}>Map</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
