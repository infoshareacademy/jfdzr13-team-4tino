import React from "react";
import styles from "./Order.module.css";
import Trees from "./Trees/Trees";
import Tablets from "./Tablets/Tablets";
import Dedication from "./Dedication/Dedication";
import Map from "./Map/Map";
import Basket from "./Basket/Basket";

const Order = () => {
  return (
    <div className={styles.order}>
      <div className={styles.left}>
        <Trees />
        {/* <Tablets /> */}
        <Dedication />
        <Map />
      </div>
      <div className={styles.right}>
        <Basket />
      </div>
    </div>
  );
};

export default Order;
