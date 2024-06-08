import React from "react";
import obrazek from '../../../assets/HowItWorks/3.jpg';
import styles from "./HowItWorks.module.css";

const HowItWorks = () => {
  return (
    <div className={styles.howItWorksTitle}>
      <div>Jak to działa ?</div>
      <div className={styles.container}>
        <div>
            <img src={obrazek} alt="dziewczynka z sadzonką" className={styles.photo}/>
        </div>
        <div className={styles.paragraphs}>
          <p><span className={styles.highlight}>Wybierz drzewo:</span> skorzystaj z naszej ofert i zdecyduj, które drzewo najlepiej Tobie pasuje.</p>
          <p><span className={styles.highlight}>Wybierz tabliczkę:</span> posiadamy szeroki asortyment różnych tabliczek, na pewno znajdziesz coś dla siebie.</p>
          <p><span className={styles.highlight}>Napisz dedykację:</span> wybierz jedną z naszych propozycji lub napisz coś od serca.</p>
          <p><span className={styles.highlight}>Wybierz lokalizację:</span> posiadamy różne lokalizacje w całym kraju.</p>
          <p><span className={styles.highlight}>Kup drzewo:</span> My zasadzimy je za Ciebie w wybranej lokalizacji.</p>
          <p><span className={styles.highlight}>Gotowe,</span> zielona przyszłość zaczyna się tutaj! </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
