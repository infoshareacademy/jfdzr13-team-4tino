import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styles from "./Trees.module.css";

import buk from "../../../assets/drzewka/buk.png";
import grab from "../../../assets/drzewka/grab.png";
import milarzab from "../../../assets/drzewka/milorzab_dwuklapowy.png";
import sosna from "../../../assets/drzewka/sosna_czarna.png";
import swierk2 from "../../../assets/drzewka/swierk_klujacy.png";
import swierk1 from "../../../assets/drzewka/swierk_serbski.png";
import { db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { TERipple } from "tw-elements-react";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: "-35px" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: "-35px" }}
      onClick={onClick}
    />
  );
}

function SimpleSlider({ onSelectTree }) {
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
    <div className={styles.carousel}>
      <Slider {...settings}>
        {treeData.map((tree, index) => (
          <div className={styles.slideContainer} key={tree.id}>
            <div className={styles.slide}>
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
                <b>Cena : {tree.price} zł</b>
                <div className={styles.price}>
                  <p></p>
                  <TERipple rippleColor="light">
                    <button
                      type="button"
                      onClick={() => onSelectTree(tree)}
                      className={`buttonCss blok px-6 py-3 text-base font-semibold leading-normal text-white transition duration-150 ease-in-out bg-custom-green hover:bg-custom-green-hover focus:bg-custom-green-hover focus:outline-none focus:ring-0 active:bg-custom-green-active m-5`}
                    >
                      Dodaj do koszyka
                    </button>
                  </TERipple>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

const Trees = ({ onSelectTree }) => {
  return (
    <div className={styles.trees}>
      <h2>Wybierz swoje drzewo</h2>
      <SimpleSlider onSelectTree={onSelectTree} />
      <div className={styles.disclaimer}>
        <p className={styles.warning}>Uwaga!</p> Cena drzewa zawiera opłatę za
        zasadzenie, tabliczkę oraz wykonanie dedykacji.
      </div>
    </div>
  );
};

export default Trees;
