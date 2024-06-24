import React from "react";
import { Timestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useUser } from "../../../context/UserContext/UserContext";
import styles from "./Basket.module.css";

const Basket = ({
  selectedTree,
  selectedTablet,
  selectedLocation,
  selectedDedication,
  clearSelections,
}) => {
  const { user } = useUser();

  const addOrder = async () => {
    if (!user || !user.email) {
      console.error("nie może pobrać emaila");
      return;
    }

    if (
      !selectedTree ||
      !selectedTablet ||
      !selectedDedication ||
      !selectedLocation
    ) {
      console.error("Wymagane są wszystkie elementy zamówienia");
      return;
    }

    try {
      const collectionRef = collection(db, "orders2");
      const time = Timestamp.now();
      const docRef = await addDoc(collectionRef, {
        email: user.email,
        date: time,
        status: "przyjęto do realizacji",
        price: selectedTree.price,
        tree: selectedTree.name,
        tablet: selectedTablet.name,
        dedication: selectedDedication,
        location: selectedLocation,
      });
      clearSelections();
      return docRef.id;
    } catch (error) {
      console.log("Błąd podczas dodawania:", error);
      throw error;
    }
  };

  return (
    <div className={styles.basket}>
      <h3 className={styles.head}>Moje zamówienie</h3>
      <div className={styles.content}>
        <h4>Gatunek drzewa :</h4>
        <div className={styles.item}>
          {selectedTree ? <p>{selectedTree.name}</p> : <p>Wybierz drzewo</p>}
        </div>
        <h4>Rodzaj tabliczki :</h4>
        <div className={styles.item}>
          {selectedTablet ? (
            <p>{selectedTablet.name}</p>
          ) : (
            <p>Wybierz tabliczkę</p>
          )}
        </div>
        <h4>Twoja dedykacja :</h4>
        <div className={styles.item}>
          {selectedDedication ? (
            <p>{selectedDedication}</p>
          ) : (
            <p>Wybierz lub napisz dedykację</p>
          )}
        </div>
        <h4>Miejsce zasadzenia :</h4>
        <div className={styles.item}>
          {selectedLocation ? (
            <p>{selectedLocation}</p>
          ) : (
            <p>Wybierz lokalizację</p>
          )}
        </div>
      </div>
      <div className={styles.price}>
        Do zapłaty : <b>{selectedTree ? selectedTree.price : "0"}</b> zł
      </div>
      <button onClick={addOrder}>Potwierdź z obowiązkiem zapłaty</button>
    </div>
  );
};

export default Basket;
