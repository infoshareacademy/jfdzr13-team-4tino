import React from "react";
import { Timestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useUser } from "../../../context/UserContext/UserContext";
import { toast } from "react-toastify";
import styles from "./Basket.module.css";
import { TERipple } from "tw-elements-react";

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
      const ordersSnapshot = await getDocs(collection(db, "orders"));
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
      const collectionRef = collection(db, "orders");
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
        <h5>Gatunek drzewa :</h5>
        <div className={styles.item}>
          {selectedTree ? <p>{selectedTree.name}</p> : <p>Wybierz drzewo</p>}
        </div>
        <h5>Rodzaj tabliczki :</h5>
        <div className={styles.item}>
          {selectedTablet ? (
            <p>{selectedTablet.name}</p>
          ) : (
            <p>Wybierz tabliczkę</p>
          )}
        </div>
        <h5>Twoja dedykacja :</h5>
        <div className={styles.item}>
          {selectedDedication ? (
            <p>{selectedDedication}</p>
          ) : (
            <p>Wybierz lub napisz dedykację</p>
          )}
        </div>
        <h5>Miejsce zasadzenia :</h5>
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
      <Link to="/order/summary">
        <TERipple rippleColor="light">
          <button
            type="button"
            onClick={addOrder}
            className={`buttonCss blok px-6 py-3 text-base font-semibold leading-normal text-white transition duration-150 ease-in-out bg-custom-green hover:bg-custom-green-hover focus:bg-custom-green-hover focus:outline-none focus:ring-0 active:bg-custom-green-active m-5`}
          >
            Przejdź do potwierdzenia
          </button>
        </TERipple>
      </Link>
    </div>
  );
};

export default Basket;
