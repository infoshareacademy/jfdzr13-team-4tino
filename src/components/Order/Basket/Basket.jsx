import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Basket.module.css";
import { toast } from "react-toastify";
import { useUser } from "../../../context/UserContext/UserContext";
import "react-toastify/dist/ReactToastify.css";

// const Basket = ({
//   selectedTree,
//   selectedTablet,
//   selectedLocation,
//   selectedDedication,
// }) => {
//   const navigate = useNavigate();
//   const user = useUser();

//   const handleProceed = () => {
//     if (!isComplete()) {
//       toast.error("Wymagane są wszystkie elementy zamówienia", {
//         hideProgressBar: true,
//         autoClose: 3000,
//         style: { marginTop: "120px" },
//       });
//       return;
//     }

//     if (!user || !user.email) {
//       toast.error("Musisz być zalogowany, aby kontynuować", {
//         hideProgressBar: true,
//         autoClose: 3000,
//         style: { marginTop: "120px" },
//       });
//       return;
//     }

//     navigate("/order/summary", {
//       state: {
//         selectedTree,
//         selectedTablet,
//         selectedLocation,
//         selectedDedication,
//       },
//     });
//   };

//   const isComplete = () => {
//     return (
//       selectedTree && selectedTablet && selectedLocation && selectedDedication
//     );
//   };

//   return (
//     <div className={styles.basket}>
//       <h3 className={styles.head}>Moje zamówienie</h3>
//       <div className={styles.content}>
//         <h5>Gatunek drzewa:</h5>
//         <div className={styles.item}>
//           {selectedTree ? <p>{selectedTree.name}</p> : <p>Wybierz drzewo</p>}
//         </div>
//         <h5>Rodzaj tabliczki:</h5>
//         <div className={styles.item}>
//           {selectedTablet ? (
//             <p>{selectedTablet.name}</p>
//           ) : (
//             <p>Wybierz tabliczkę</p>
//           )}
//         </div>
//         <h5>Twoja dedykacja:</h5>
//         <div className={styles.item}>
//           {selectedDedication ? (
//             <p>{selectedDedication}</p>
//           ) : (
//             <p>Wybierz lub napisz dedykację</p>
//           )}
//         </div>
//         <h5>Miejsce zasadzenia:</h5>
//         <div className={styles.item}>
//           {selectedLocation ? (
//             <p>{selectedLocation}</p>
//           ) : (
//             <p>Wybierz lokalizację</p>
//           )}
//         </div>
//       </div>
//       <div className={styles.price}>
//         Do zapłaty: <b>{selectedTree ? selectedTree.price : "0"} zł</b>
//       </div>
//       <button
//         type="button"
//         className="buttonCss blok px-6 py-3 text-base font-semibold leading-normal text-white bg-custom-green hover:bg-custom-green-hover focus:outline-none m-5"
//         onClick={handleProceed}
//       >
//         Przejdź do potwierdzenia
//       </button>
//     </div>
//   );
// };

// export default Basket;

const Basket = ({
  selectedTree,
  selectedTablet,
  selectedLocation,
  selectedDedication,
}) => {
  const navigate = useNavigate();
  const { user } = useUser(); // Get the user from the context

  const handleProceed = () => {
    if (!user || !user.email) {
      toast.error("Musisz być zalogowany, aby kontynuować", {
        autoClose: 3000,
        hideProgressBar: true,
        style: { marginTop: "120px" },
      });
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
      <button
        type="button"
        className="buttonCss blok px-6 py-3 text-base font-semibold leading-normal text-white bg-custom-green hover:bg-custom-green-hover focus:outline-none m-5"
        onClick={handleProceed}
      >
        Przejdź do potwierdzenia
      </button>
    </div>
  );
};

export default Basket;
