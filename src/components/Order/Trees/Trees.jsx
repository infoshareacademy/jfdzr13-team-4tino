import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Test from "./Test/Test";
import styles from "./Trees.module.css";

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
