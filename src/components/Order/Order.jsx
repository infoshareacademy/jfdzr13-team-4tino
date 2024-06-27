// import React, { useState } from "react";
// import { addDoc, collection } from 'firebase/firestore';
// import { auth, db } from '../../firebase';
// import styles from "./Order.module.css";
// import Trees from "./Trees/Trees";
// import Tablets from "./Tablets/Tablets";
// import Dedication from "./Dedication/Dedication";
// import Map from "./Map/Map";
// import Basket from "./Basket/Basket";

// const Order = () => {
//   const [selectedTree, setSelectedTree] = useState(null);
//   const [selectedTablet, setSelectedTablet] = useState(null);
//   const [selectedLocation, setSelectedLocation] = useState("");
//   const [selectedDedication, setSelectedDedication] = useState("");

//   const clearSelections = () => {
//     setSelectedTree(null);
//     setSelectedTablet(null);
//     setSelectedDedication("");
//     setSelectedLocation("");
//   };

//   const addOrder = async () => {
//     const currentUser = auth.currentUser;
//     if (!currentUser) {
//       console.error('Użytkownik nie jest zalogowany');
//       return;
//     }

//     const orderData = {
//       tree: selectedTree,
//       tablet: selectedTablet,
//       location: selectedLocation,
//       dedication: selectedDedication,
//       price: "1220,00", // Możesz dodać logikę do kalkulacji ceny
//       status: "przyjęto do realizacji",
//       date: new Date(),
//       userId: currentUser.uid,
//       email: currentUser.email
//     };

//     try {
//       await addDoc(collection(db, 'orders'), orderData);
//       console.log('Zamówienie dodane pomyślnie');
//       clearSelections();
//     } catch (error) {
//       console.error('Błąd podczas dodawania zamówienia: ', error);
//     }
//   };

//   return (
//     <div className={styles.order}>
//       <div className={styles.left}>
//         <Trees onSelectTree={setSelectedTree} />
//         <div className={styles.disclaimer}>
//           <p className={styles.warning}>Uwaga !</p> Cena drzewa zawiera opłatę
//           za zasadzenie, tabliczkę oraz wykonanie dedykacji
//         </div>
//         <Tablets onSelectTablet={setSelectedTablet} />
//         <Dedication onSelectDedication={setSelectedDedication} />
//         <Map onSelectLocation={setSelectedLocation} />
//       </div>
//       <div className={styles.right}>
//         <Basket
//           selectedTree={selectedTree}
//           selectedTablet={selectedTablet}
//           selectedLocation={selectedLocation}
//           selectedDedication={selectedDedication}
//           clearSelections={clearSelections}
//         />
//         <button onClick={addOrder} className={styles.orderButton}>
//           Złóż zamówienie
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Order;




import React, { useState } from "react";
import styles from "./Order.module.css";
import Trees from "./Trees/Trees";
import Tablets from "./Tablets/Tablets";
import Dedication from "./Dedication/Dedication";
import Map from "./Map/Map";
import Basket from "./Basket/Basket";

const Order = () => {
  const [selectedTree, setSelectedTree] = useState(null);
  const [selectedTablet, setSelectedTablet] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDedication, setSelectedDedication] = useState("");

  const clearSelections = () => {
    setSelectedTree(null);
    setSelectedTablet(null);
    setSelectedDedication("");

    setSelectedLocation("");
  };

  return (
    <div className={styles.order}>
      <div className={styles.left}>
        <Trees onSelectTree={setSelectedTree} />
        <div className={styles.disclaimer}>
          <p className={styles.warning}>Uwaga !</p> Cena drzewa zawiera opłatę
          za zasadzenie, tabliczkę oraz wykonanie dedykacji
        </div>
        <Tablets onSelectTablet={setSelectedTablet} />
        <Dedication onSelectDedication={setSelectedDedication} />
        <Map onSelectLocation={setSelectedLocation} />
      </div>
      <div className={styles.right}>
        <Basket
          selectedTree={selectedTree}
          selectedTablet={selectedTablet}
          selectedLocation={selectedLocation}
          selectedDedication={selectedDedication}
          clearSelections={clearSelections}
        />
      </div>
    </div>
  );
};

export default Order;
