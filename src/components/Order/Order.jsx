import React, { useState } from "react";
import styles from "./Order.module.css";
import Trees from "./Trees/Trees";
import Tablets from "./Tablets/Tablets";
import Dedication from "./Dedication/Dedication";
import Map from "./Map/Map";
import Basket from "./Basket/Basket";

const Order = () => {
  const [selectedTablet, setSelectedTablet] = useState(null);
  const [selectedTree, setSelectedTree] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleSelectTablet = (tablet) => {
    setSelectedTablet(tablet);
  };

  const handleSelectTree = (tree) => {
    setSelectedTree(tree);
  };

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className={styles.order}>
      <div className={styles.left}>
        <Trees onSelectTree={handleSelectTree} />
        <Tablets onSelectTablet={handleSelectTablet} />
        <Dedication />
        <Map onSelectLocation={handleSelectLocation} />
      </div>
      <div className={styles.right}>
        <Basket
          selectedTablet={selectedTablet}
          selectedTree={selectedTree}
          selectedLocation={selectedLocation}
        />
      </div>
    </div>
  );
};

export default Order;
