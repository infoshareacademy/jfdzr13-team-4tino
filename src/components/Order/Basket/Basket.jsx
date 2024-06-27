import React from "react";
import { Timestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useUser } from "../../../context/UserContext/UserContext";
import { toast } from "react-toastify";
import styles from "./Basket.module.css";

const Basket = ({
  selectedTree,
  selectedTablet,
  selectedLocation,
  selectedDedication,
  clearSelections,
}) => {
  const { user } = useUser();

  const generateOrderId = async () => {
    try {
      const ordersSnapshot = await getDocs(collection(db, "orders2"));
      const count = ordersSnapshot.size + 1;

      const now = new Date();
      const month = now.getMonth() + 1; // miesiące indexowane są od 0
      const year = now.getFullYear().toString().slice(-2);

      const orderId = `${count}${month < 10 ? "0" + month : month}${year}`; // id zamówienia

      return orderId;
    } catch (error) {
      console.error("Błąd podczas sklejania id", error);
      throw error;
    }
  };

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
      toast.error("Wymagane są wszystkie elementy zamówienia", {
        hideProgressBar: true,
        style: { marginTop: "120px" },
        autoClose: 3000,
      });

      console.error("Wymagane są wszystkie elementy zamówienia");
      return;
    }

    try {
      const orderId = await generateOrderId();
      const collectionRef = collection(db, "orders2");
      const time = Timestamp.now();
      const docRef = await addDoc(collectionRef, {
        orderId: orderId,
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
      toast.success("Zamówienie złożone pomyślnie", {
        hideProgressBar: true,
        style: { marginTop: "120px" },
        autoClose: 3000,
      });
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
