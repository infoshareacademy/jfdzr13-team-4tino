import React from "react";
import styles from "./Basket.module.css";

const Basket = () => {
  return (
    <div className={styles.basket}>
      <h3 className={styles.head}>Moje zamówienie</h3>
      <div className={styles.content}>
        <h4>Gatunek drzewa :</h4>
        <p className={styles.extra}>Brzoza</p>
        <h4>Rodzaj tabliczki :</h4>
        <p className={styles.extra}>Granit</p>
        <h4>Twoja dedykacja :</h4>
        <p className={styles.extra}>"Dla Jarka"</p>
        <h4>Miejsce zasadzenia :</h4>
        <p className={styles.extra}>Warszawa</p>
      </div>
      <button>Potwierdź z obowiązkiem zapłaty</button>
      {/* ^ tutaj przekierowanie do płatności */}
    </div>
  );
};

export default Basket;
