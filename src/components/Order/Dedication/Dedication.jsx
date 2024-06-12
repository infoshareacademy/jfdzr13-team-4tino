import React from "react";
import styles from "./Dedication.module.css";

const Dedication = () => {
  return (
    <div className={styles.dedication}>
      <h2>Twoja dedykacja</h2>
      <div className={styles.dedicationArea}>
        <input type="text" className={styles.dedicationText} />
        <button>Potwierdź dedykację</button>
      </div>
    </div>
  );
};

export default Dedication;
