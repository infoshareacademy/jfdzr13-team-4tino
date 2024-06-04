import React from "react";
import styles from "./Introduction.module.css";

const Introduction = () => {
  return (
    <div className={styles.introduction}>
      <div className={styles.hero}>
        <h1 className={styles.entryTitle}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h1>
        <p className={styles.entry}>
          " Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
          similique rem consectetur voluptas assumenda necessitatibus cupiditate
          quasi numquam impedit, sequi veritatis vitae quos debitis
          reprehenderit fuga labore reiciendis aliquid fugit? "
        </p>
        <button>Chcę zasadzić swoje drzewo!</button>
      </div>
      <div className={styles.map}>mapka here</div>
    </div>
  );
};

export default Introduction;
