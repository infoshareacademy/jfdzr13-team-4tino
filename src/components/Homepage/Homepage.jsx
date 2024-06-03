import React from "react";
import styles from "./Homepage.module.css";
import bigLogo from "../../assets/4tino-logo.png";

const Homepage = () => {
  return (
    <div className={styles.homepage}>
      <div className={styles.page}>
        <img className={styles.bigLogo} src={bigLogo} alt="logo" />
        <h1 className={styles.callToAction}>DLA BLISKICH - DLA OTOCZENIA</h1>
        <div className={styles.actionPanel}>
          <button>
            Posadź drzewo <br /> Zarejestruj się
          </button>
          <button>Zaloguj się</button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
