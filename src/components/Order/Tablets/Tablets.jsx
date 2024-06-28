import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styles from "./Tablets.module.css";

import tab1 from "../../../assets/tablets/tablet1.png";
import tab2 from "../../../assets/tablets/tablet2.png";
import tab3 from "../../../assets/tablets/tablet3.png";
import tab4 from "../../../assets/tablets/tablet4.png";
import tab5 from "../../../assets/tablets/tablet5.png";
import tab6 from "../../../assets/tablets/tablet6.png";

const Tablets = ({ onSelectTablet }) => {
  const tabletData = [
    { name: "Marmur", image: tab1 },
    { name: "Granit", image: tab2 },
    { name: "Bazalt", image: tab3 },
    { name: "Piaskowiec", image: tab4 },
    { name: "Takie pordzewiałe", image: tab5 },
    { name: "Zardzewiałe czy co", image: tab6 },
  ];

  const [selectedTabletIndex, setSelectedTabletIndex] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => {
      setSelectedTabletIndex(index);
    },
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const handleAddToBasket = () => {
    const selectedTablet = tabletData[selectedTabletIndex];
    onSelectTablet(selectedTablet);
  };

  return (
    <div className={styles.tablets}>
      <h2>Wyjątkowe i trwałe tabliczki z kamienia</h2>
      <div className={styles.select}>
        <p className={styles.desc}>
          Wybierz jedną z wyjątkowych kamiennych tabliczek, która stanowić
          będzie trwały symbol miłości, pamięci lub wdzięczności. Każda
          tabliczka z dedykacją będzie wiecznym symbolem, które przetrwa przez
          lata.
        </p>
      </div>
      <div className={styles.carousel}>
        <Slider {...settings}>
          {tabletData.map((tablet, index) => (
            <div className={styles.slide} key={index}>
              <img src={tablet.image} alt={tablet.name} />
            </div>
          ))}
        </Slider>
      </div>
      <div className={styles.tabletName}>
        <div className={styles.add}>{tabletData[selectedTabletIndex].name}</div>
        <button onClick={handleAddToBasket}>Dodaj do koszyka</button>
      </div>
    </div>
  );
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

export default Tablets;
