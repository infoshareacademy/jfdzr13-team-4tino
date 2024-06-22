import React, { useState } from "react";
import styles from "./Order.module.css";
import Trees from "./Trees/Trees";
import Tablets from "./Tablets/Tablets";
import Dedication from "./Dedication/Dedication";
import Map from "./Map/Map";
import Basket from "./Basket/Basket";

const Order = () => {
  const [selectedTablet, setSelectedTablet] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleSelectTablet = (tabletName) => {
    setSelectedTablet(tabletName);
  };

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className={styles.order}>
      <div className={styles.left}>
        <Trees />
        <Tablets onSelectTablet={handleSelectTablet} />
        <Dedication />
        <Map onSelectLocation={handleSelectLocation} />
        <div className={styles.disclaimer}>
          <p className={styles.warning}>Uwaga!</p>
          <p>
            Cena drzewa zawiera koszty tabliczki, naniesienia dedykacji i
            zasadzenia.
          </p>
        </div>
      </div>
      <div className={styles.right}>
        <Basket
          selectedTablet={selectedTablet}
          selectedLocation={selectedLocation}
        />
      </div>
    </div>
  );
};

export default Order;
