import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Basket.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Basket = ({
  selectedTree,
  selectedTablet,
  selectedLocation,
  selectedDedication,
}) => {
  const navigate = useNavigate();

  const handleProceed = () => {
    if (!isComplete()) {
      toast.error("Wymagane są wszystkie elementy zamówienia", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: false,
      });
      return;
    }

    navigate("/order/summary", {
      state: {
        selectedTree,
        selectedTablet,
        selectedLocation,
        selectedDedication,
      },
    });
  };

  const isComplete = () => {
    return (
      selectedTree && selectedTablet && selectedLocation && selectedDedication
      // nie działa ^
    );
  };

  return (
    <div className={styles.basket}>
      <h3 className={styles.head}>Moje zamówienie</h3>
      <div className={styles.content}>
        <h5>Gatunek drzewa:</h5>
        <div className={styles.item}>
          {selectedTree ? <p>{selectedTree.name}</p> : <p>Wybierz drzewo</p>}
        </div>
        <h5>Rodzaj tabliczki:</h5>
        <div className={styles.item}>
          {selectedTablet ? (
            <p>{selectedTablet.name}</p>
          ) : (
            <p>Wybierz tabliczkę</p>
          )}
        </div>
        <h5>Twoja dedykacja:</h5>
        <div className={styles.item}>
          {selectedDedication ? (
            <p>{selectedDedication}</p>
          ) : (
            <p>Wybierz lub napisz dedykację</p>
          )}
        </div>
        <h5>Miejsce zasadzenia:</h5>
        <div className={styles.item}>
          {selectedLocation ? (
            <p>{selectedLocation}</p>
          ) : (
            <p>Wybierz lokalizację</p>
          )}
        </div>
      </div>
      <div className={styles.price}>
        Do zapłaty: <b>{selectedTree ? selectedTree.price : "0"} zł</b>
      </div>
      <button
        type="button"
        className="buttonCss blok px-6 py-3 text-base font-semibold leading-normal text-white bg-custom-green hover:bg-custom-green-hover focus:outline-none m-5"
        onClick={handleProceed}
        disabled={!isComplete()}
      >
        Przejdź do potwierdzenia
      </button>
    </div>
  );
};

export default Basket;
