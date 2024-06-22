import React from "react";
import styles from "./Basket.module.css";

const Basket = ({ selectedTablet }) => {
  return (
    <div className={styles.basket}>
      <h3 className={styles.head}>Moje zamówienie</h3>
      <div className={styles.content}>
        <h4>Gatunek drzewa :</h4>
        <div className={styles.item}></div>
        <h4>Rodzaj tabliczki :</h4>
        <div className={styles.item}>
          {selectedTablet ? (
            <p>{selectedTablet.name}</p>
          ) : (
            <p>Wybierz tabliczkę</p>
          )}
        </div>
        <h4>Twoja dedykacja :</h4>
        <div className={styles.item}></div>
        <h4>Miejsce zasadzenia :</h4>
        <div className={styles.item}></div>
      </div>
      <button>Potwierdź z obowiązkiem zapłaty</button>
      {/* ^ tutaj przekierowanie do płatności */}
    </div>
  );
};

export default Basket;
