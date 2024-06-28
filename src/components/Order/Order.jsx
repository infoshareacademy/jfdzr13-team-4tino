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
