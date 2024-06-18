import React from "react";
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

function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  // todo: poobracać obrazki i dać opis obok slidera

  return (
    <div className={styles.carousel}>
      <Slider {...settings}>
        <div className={styles.slide}>
          <img src={tab1} alt="tabliczka pierwsza" />
        </div>
        <div className={styles.slide}>
          <img src={tab2} alt="tabliczka druga" />
        </div>
        <div className={styles.slide}>
          <img src={tab3} alt="tabliczka trzecia" />
        </div>
        <div className={styles.slide}>
          <img src={tab4} alt="tabliczka czwarta" />
        </div>
        <div className={styles.slide}>
          <img src={tab5} alt="tabliczka piąta" />
        </div>
        <div className={styles.slide}>
          <img src={tab6} alt="tabliczka szósta" />
        </div>
      </Slider>
    </div>
  );
}

const Tablets = () => {
  return (
    <div className={styles.tablets}>
      <h2>Wyjątkowe i trwałe tabliczki z kamienia</h2>
      <SimpleSlider />
      <div className={styles.select}>
        <p className={styles.desc}>
          Wybierz jedną z wyjątkowych kamiennych tabliczek, która stanowić
          będzie trwały symbol miłości, pamięci lub wdzięczności. Każda
          tabliczka z dedykacją będzie wiecznym symbolem, które przetrwa przez
          lata.
        </p>
        <button>Dodaj do koszyka</button>
      </div>
      <p className={styles.todo}>
        todo : <br />
        - slider pionowo = opis + button obok slidera <br />- ujednolićić wygląd{" "}
        <br />
      </p>
    </div>
  );
};

export default Tablets;
