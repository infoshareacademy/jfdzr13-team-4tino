import React from "react";
import styles from "./Summary.module.css";
import { Link } from "react-router-dom";

const Summary = ({ addOrder }) => {
  return (
    <div className={styles.summary}>
      <div className={styles.details}>test2</div>
      <div className={styles.controls}>
        <Link to="/order">
          <button className={styles.cancel}>Powrót</button>
        </Link>
        <button className={styles.confirm} onClick={addOrder}>
          Zamów
        </button>
      </div>
    </div>
  );
};

export default Summary;
