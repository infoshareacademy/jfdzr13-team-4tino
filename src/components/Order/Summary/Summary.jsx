import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext/UserContext";
import { addOrderToFirestore } from "../utils/orderUtils";
import styles from "./Summary.module.css";
import Blik from "../../../assets/blik.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Summary = ({ clearSelections }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { selectedTree, selectedTablet, selectedLocation, selectedDedication } =
    state || {};
  const { user } = useUser();
  const [blikCode, setBlikCode] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleInputChange = (e) => {
    const inputValue = e.target.value.slice(0, 6);
    setBlikCode(inputValue);
  };

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
      console.error("Błąd składania zamówienia", error);
    }
  };

  const handleBlikValidation = () => {
    if (!/^\d{6}$/.test(blikCode)) {
      toast.error("Kod Blik musi składać się z sześciu cyfr.", {
        style: { marginTop: "120px" },
        autoClose: 3000,
      });

      return false;
    }
    return true;
  };

  const shouldPass = () => {
    if (handleBlikValidation()) {
      handleOrder();
      toast.success(
        <>
          Zamówienie złożone pomyślnie!
          <br />
          Zostaniesz przekierowany na stronę główną za 10 sekund.
        </>,
        {
          style: { marginTop: "120px" },
          autoClose: 10000,
          onClose: () => {
            navigate("/user");
          },
        }
      );
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
                Dedykacja :&nbsp;
                <b>{selectedDedication || "Brak dedykacji"}</b>
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
              <input
                className={styles.code}
                type="number"
                min="1"
                max="999999"
                value={blikCode}
                onChange={handleInputChange}
              />
            </div>
            <p className={styles.info}>
              Potwierdzenie zamówienia zostanie wysłane na maila po
              zaksięgowaniu wpłaty.
            </p>
            <div className={styles.controls}>
              <Link to="/order">
                <button className={styles.cancel}>Powrót</button>
              </Link>
              <button
                onClick={shouldPass}
                className={`${styles.confirm} ${
                  orderPlaced && styles.disabled
                }`}
                disabled={orderPlaced}
              >
                Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
