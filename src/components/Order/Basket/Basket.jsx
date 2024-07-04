import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Basket.module.css";
import { toast } from "react-toastify";
import { useUser } from "../../../context/UserContext/UserContext";
import "react-toastify/dist/ReactToastify.css";
import { TERipple } from "tw-elements-react";
import { getLastOrderDate } from "../../Order/utils/lastOrder";

const Basket = ({
  selectedTree,
  selectedTablet,
  selectedLocation,
  selectedDedication,
}) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [isAllowedToProceed, setIsAllowedToProceed] = useState(true);
  const [daysRemaining, setDaysRemaining] = useState(0);

  useEffect(() => {
    const checkLastOrderDate = async () => {
      if (user && user.email) {
        try {
          const lastOrderDate = await getLastOrderDate(user.email);
          if (lastOrderDate) {
            const currentDate = new Date();
            const daysDiff =
              (currentDate - lastOrderDate) / (1000 * 60 * 60 * 24);
            if (daysDiff < 90) {
              setIsAllowedToProceed(false);
              setDaysRemaining(90 - Math.floor(daysDiff));
            } else {
              setIsAllowedToProceed(true);
            }
          }
        } catch (error) {
          console.error("Error fetching last order date:", error);
          toast.error(
            "Wystąpił problem podczas sprawdzania daty ostatniego zamówienia.",
            {
              autoClose: 3000,
              hideProgressBar: true,
              style: { marginTop: "120px" },
            }
          );
        }
      }
    };

    checkLastOrderDate();
  }, [user]);

  const handleProceed = () => {
    if (!user || !user.email) {
      toast.error("Musisz być zalogowany, aby kontynuować", {
        autoClose: 3000,
        hideProgressBar: true,
        style: { marginTop: "120px" },
      });
      return;
    }

    if (!isAllowedToProceed) {
      toast.error(
        `Musisz poczekać ${daysRemaining} dni aby złożyć kolejne zamówienie`,
        {
          autoClose: 5000,
          hideProgressBar: true,
          style: { marginTop: "120px" },
        }
      );
      return;
    }

    if (!isComplete()) {
      toast.error("Wymagane są wszystkie elementy zamówienia", {
        autoClose: 3000,
        hideProgressBar: true,
        style: { marginTop: "120px" },
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
      <TERipple rippleColor="light">
        <button
          type="button"
          onClick={handleProceed}
          className={`buttonCss blok px-6 py-3 text-base font-semibold leading-normal text-white transition duration-150 ease-in-out bg-custom-green hover:bg-custom-green-hover focus:bg-custom-green-hover focus:outline-none focus:ring-0 active:bg-custom-green-active m-5`}
        >
          Przejdź do potwierdzenia
        </button>
      </TERipple>
    </div>
  );
};

export default Basket;
