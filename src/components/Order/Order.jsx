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

  return (
    <div className={styles.order}>
      <div className={styles.left}>
        <Trees onSelectTree={setSelectedTree} />
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
        />
      </div>
    </div>
  );
};

export default Order;
