import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Test from "./Test/Test";
import styles from "./Trees.module.css";

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
        <Test />
        <Test />
        <Test />
      </Slider>
    </div>
  );
}

const Trees = () => {
  return (
    <div className={styles.trees}>
      <h2>Wybierz swoje drzewo</h2>
      <SimpleSlider />
    </div>
  );
};

export default Trees;
