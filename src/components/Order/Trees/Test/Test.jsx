import React from "react";
import styles from "./Test.module.css";

const Test = () => {
  return (
    <div className={styles.slide}>
      <div className={styles.mock}>Image 1</div>
      <div className={styles.place2}>
        <div className={styles.mock2}>Description for slide 1</div>
        <button className={styles.mock3}>Click Me 1</button>
      </div>
    </div>
  );
};

export default Test;
