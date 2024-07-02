import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useUser } from "../../../context/UserContext/UserContext";
import { addOrderToFirestore } from "../utils/orderUtils";
import styles from "./Summary.module.css";
import Blik from "../../../assets/blik.png";

const Summary = ({ clearSelections }) => {
  const { state } = useLocation();
  const { selectedTree, selectedTablet, selectedLocation, selectedDedication } =
    state || {};
  const { user } = useUser();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleOrder = async () => {
    try {
      await addOrderToFirestore(
        user,
        selectedTree,
        selectedTablet,
        selectedLocation,
        selectedDedication
      );
      clearSelections();
      setOrderPlaced(true);
    } catch (error) {
      console.error("Błąd podczas składania zamówienia", error);
    }
  };

  return (
    <div className={styles.summary}>
      <div className={styles.details}>
        <div className={styles.container}>
          <div className={styles.main}>
            <h1 className={styles.header}>Podsumowanie zamówienia</h1>
            <div className={styles.content}>
              <div className={styles.item}>
                Drzewo :&nbsp;
                <b>{selectedTree?.name || "Brak wybranego drzewa"}</b>
              </div>
              <div className={styles.item}>
                Tabliczka :&nbsp;
                <b>{selectedTablet?.name || "Brak wybranej tabliczki"}</b>
              </div>
              <div className={styles.item}>
                Dedykacja :&nbsp;<b>{selectedDedication || "Brak dedykacji"}</b>
              </div>
              <div className={styles.item}>
                Lokalizacja :&nbsp;
                <b>{selectedLocation || "Brak lokalizacji"}</b>
              </div>
            </div>
            <div className={styles.money}>
              Do zapłaty :&nbsp;<b>{selectedTree?.price || "0"} zł</b>
            </div>
          </div>
          <div className={styles.payment}>
            <h1 className={styles.header}>Opłać zamówienie</h1>
            <div className={styles.blik}>
              <img src={Blik} alt="Blik" />
              <input className={styles.code} />
            </div>
            <p className={styles.info}>
              Potwierdzenie złożenia zamówienia zostanie wysłane na twojego
              maila po zaksięgowaniu wpłaty.
            </p>
            <div className={styles.controls}>
              <Link to="/order">
                <button className={styles.cancel}>Powrót</button>
              </Link>
              <button
                onClick={handleOrder}
                className={`${styles.confirm} ${
                  orderPlaced && styles.disabled
                }`}
                // powinno zablokować przycisk :/
              >
                Zamów
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
