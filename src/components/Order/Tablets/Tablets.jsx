import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styles from "./Tablets.module.css";
import { TERipple } from "tw-elements-react";

import tab1 from "../../../assets/tablets/tablet1.png";
import tab2 from "../../../assets/tablets/tablet2.png";
import tab3 from "../../../assets/tablets/tablet3.png";
import tab4 from "../../../assets/tablets/tablet4.png";
import tab5 from "../../../assets/tablets/tablet5.png";
import tab6 from "../../../assets/tablets/tablet6.png";

const Tablets = ({ onSelectTablet }) => {
  const tabletData = [
    { name: "Tabliczka pierwsza", image: tab1 },
    { name: "Tabliczka druga", image: tab2 },
    { name: "Tabliczka trzecia", image: tab3 },
    { name: "Tabliczka czwarta", image: tab4 },
    { name: "Tabliczka piąta", image: tab5 },
    { name: "Tabliczka szósta", image: tab6 },
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

      <p className={styles.desc}>
        Wybierz jedną z wyjątkowych kamiennych tabliczek, która stanowić będzie
        trwały symbol miłości, pamięci lub wdzięczności. Każda tabliczka z
        dedykacją będzie wiecznym symbolem, które przetrwa przez lata.
      </p>

      <div className={styles.carousel}>
        <Slider {...settings}>
          {tabletData.map((tablet, index) => (
            <div className={styles.slide} key={index}>
              <img src={tablet.image} alt={tablet.name} />
            </div>
          ))}
        </Slider>
      </div>
      <TERipple rippleColor="light">
        <button
          type="button"
          onClick={handleAddToBasket}
          className={`buttonCss blok px-6 py-3 text-base font-semibold leading-normal text-white transition duration-150 ease-in-out bg-custom-green hover:bg-custom-green-hover focus:bg-custom-green-hover focus:outline-none focus:ring-0 active:bg-custom-green-active m-5`}
        >
          Dodaj do koszyka
        </button>
      </TERipple>
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
