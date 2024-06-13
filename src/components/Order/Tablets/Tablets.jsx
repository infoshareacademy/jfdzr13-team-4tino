import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styles from "./Tablets.module.css";

function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className={styles.carousel}>
      <Slider {...settings}>
        <div className={styles.slide}>test 1</div>
        <div className={styles.slide}>test 2</div>
        <div className={styles.slide}>test 3</div>
        <div className={styles.slide}>test 4</div>
        <div className={styles.slide}>test 5</div>
        <div className={styles.slide}>test 6</div>
      </Slider>
    </div>
  );
}

const Tablets = () => {
  return (
    <div className={styles.tablets}>
      <h2>Wybierz swoją tabliczkę</h2>
      <SimpleSlider />
    </div>
  );
};

export default Tablets;
