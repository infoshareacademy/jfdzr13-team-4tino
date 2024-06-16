import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { db } from "../../../firebase";
import styles from "./Trees.module.css";

import buk from "../../../assets/drzewka/buk.png";
import grab from "../../../assets/drzewka/grab.png";
import milarzab from "../../../assets/drzewka/milorzab_dwuklapowy.png";
import sosna from "../../../assets/drzewka/sosna_czarna.png";
import swierk2 from "../../../assets/drzewka/swierk_klujacy.png";
import swierk1 from "../../../assets/drzewka/swierk_serbski.png";

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
  const [treeData, setTreeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTreeData() {
      try {
        const docRef = doc(db, "trees", "drzewa2");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const rawData = docSnap.data();
          const data = Object.keys(rawData).map((key) => ({
            id: key,
            ...rawData[key],
          }));
          setTreeData(data);
          setLoading(false);
        } else {
          console.log("dziwne, u mnie działa");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error getting document:", error);
        setLoading(false);
      }
    }

    fetchTreeData();
  }, []);

  if (loading) {
    return <div>Ładowanie...</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const treeImgs = [grab, swierk1, milarzab, buk, swierk2, sosna];

  return (
    <div className={styles.carousel} id={styles.dupa}>
      <Slider {...settings}>
        {treeData.map((tree, index) => (
          <div>
            <div className={styles.slide} key={tree.id}>
              <div className={styles.img}>
                <img
                  className={styles.img}
                  src={treeImgs[index % treeImgs.length]}
                  alt={tree.name}
                />
              </div>
              <div className={styles.info}>
                <h3 className={styles.type}>{tree.name}</h3>
                <p className={styles.desc}>{tree.description}</p>
                <span className={styles.price}>
                  Cena : {tree.price} zł
                  <button>dodaj do koszyka</button>
                </span>
              </div>
            </div>
          </div>
        ))}
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
