import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useUser } from "../../../context/UserContext/UserContext";
import { addOrderToFirestore } from "../utils/orderUtils";
import styles from "./Summary.module.css";

const Summary = ({ clearSelections }) => {
  const { state } = useLocation();
  const { selectedTree, selectedTablet, selectedLocation, selectedDedication } =
    state || {};
  const { user } = useUser();

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
    } catch (error) {
      console.error("Błąd podczas składania zamówienia", error);
    }
  };

  return (
    <div className={styles.summary}>
      <div className={styles.details}>
        <h3>Podsumowanie zamówienia</h3>
        <p>Drzewo: {selectedTree?.name || "Brak wybranego drzewa"}</p>
        <p>Tabliczka: {selectedTablet?.name || "Brak wybranej tabliczki"}</p>
        <p>Dedykacja: {selectedDedication || "Brak dedykacji"}</p>
        <p>Lokalizacja: {selectedLocation || "Brak lokalizacji"}</p>
        <p>
          Do zapłaty: <b>{selectedTree?.price || "0"} zł</b>
        </p>
      </div>
      <div className={styles.controls}>
        <Link to="/order">
          <button className={styles.cancel}>Powrót</button>
        </Link>
        <button className={styles.confirm} onClick={handleOrder}>
          Zamów
        </button>
      </div>
    </div>
  );
};

export default Summary;
