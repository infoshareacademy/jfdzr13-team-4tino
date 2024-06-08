import React from "react";
import styles from "./Introduction.module.css";

const Introduction = () => {
  return (
    <div className={styles.introduction}>
      <div className={styles.hero}>
        <h1 className={styles.entryTitle}>
        Twój prezent dla bliskich i dla przyszłości!
        </h1>
        <p className={styles.entry}>
        Podaruj wyjątkowy prezent, który ma znaczenie - zasadź drzewo w jednym z dostępnych miejsc, wybierz spośród pięciu różnych gatunków drzew i spersonalizuj tabliczkę z dedykacją. Każde drzewo to nowe życie, które pomaga w walce ze zmianami klimatu. Pomóż nam poprawiać jakość powietrza i stworzyć nowy wspaniały zielony zakątek. Wybierz lokalizację i zobacz, jak Twoje drzewo rośnie i przynosi korzyści dla wszystkich! Twój prezent to więcej niż drzewo - to przyszłość dla nas wszystkich!
        </p>
        <button>Chcę zasadzić swoje drzewo!</button>
      </div>
      <div className={styles.map}>mapka here</div>
    </div>
  );
};

export default Introduction;
