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
          <p><span className={styles.highlight}>Wybierz drzewo:</span> skorzystaj z&nbsp;naszej ofert i&nbsp;zdecyduj, które drzewo najlepiej Tobie pasuje.</p>
          <p><span className={styles.highlight}>Wybierz tabliczkę:</span> posiadamy szeroki asortyment różnych tabliczek, na&nbsp;pewno znajdziesz coś dla siebie.</p>
          <p><span className={styles.highlight}>Napisz dedykację:</span> wybierz jedną z&nbsp;naszych propozycji lub&nbsp;napisz coś od&nbsp;serca.</p>
          <p><span className={styles.highlight}>Wybierz lokalizację:</span> posiadamy różne lokalizacje w&nbsp;całym kraju.</p>
          <p><span className={styles.highlight}>Kup drzewo:</span> My zasadzimy je za Ciebie w wybranej lokalizacji.</p>
          <p><span className={styles.highlight}>Gotowe,</span> zielona przyszłość zaczyna się tutaj! </p>
          <p><span className={styles.highlight}>Uwaga!</span> Kolejne drzewko możesz nabyć dopiero za 3&nbsp;miesiące, więc dobrze przemyśl kogo chcesz obdarować&nbsp;😉</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;

