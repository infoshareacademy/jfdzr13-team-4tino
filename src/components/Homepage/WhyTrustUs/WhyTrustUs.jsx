import React from "react";
import { Link } from "react-router-dom";
import { TEAnimation, TERipple } from "tw-elements-react";
import icon4 from "../../../assets/WhyTrustUs/calendar_icon.png";
import icon2 from "../../../assets/WhyTrustUs/garden_icon.png";
import icon5 from "../../../assets/WhyTrustUs/hand_icon.png";
import icon1 from "../../../assets/WhyTrustUs/leaf_icon.png";
import icon3 from "../../../assets/WhyTrustUs/man_icon.png";
import icon6 from "../../../assets/WhyTrustUs/search_icon.png";
import '../../../tailwind.css';
import styles from "./WhyTrustUs.module.css";

const WhyTrustUs = () => {
  return (
    <div className={styles.whyTrustUsTitle}>
      <div>Dlaczego warto nam zaufać</div>
      <div className={styles.container}>
        <div className={styles.reason}>
          <div className={styles.rows}>
            <div className={styles.part}>
              <TEAnimation
                animation="[fly-in_0.5s]"
                start="onHover"
                reset
                className="m-[5px] h-[90px] w-[90px] pt-3 text-center "
              >
                <img src={icon1} alt="garden" className={`${styles.icon} bg-icon-green p-[10px] rounded-[15px]`} />
              </TEAnimation>
              <div className={styles.paragraphs}>
                <p className={styles.highlight}>PROSTOTA</p>
                <p>
                  Sadzenie drzewa jako prezent jeszcze nigdy nie&nbsp;było tak proste
                  i&nbsp;przyjemne.
                </p>
              </div>
            </div>

            <div className={styles.part}>
              <TEAnimation
                animation="[fly-in_0.5s]"
                start="onHover"
                reset
                className="m-[5px] h-[90px] w-[90px] pt-3 text-center "
              >
                <img src={icon2} alt="trees" className={`${styles.icon} bg-icon-green p-[10px] rounded-[15px]`} />
              </TEAnimation>

              <div className={styles.paragraphs}>
                <p className={styles.highlight}>EKOLOGIA</p>
                <p>
                  Nasza misja to walka ze zmianami klimatycznymi poprzez
                  zwiększanie liczby drzew na świecie.
                </p>
              </div>
            </div>

            <div className={styles.part}>
              <TEAnimation
                animation="[fly-in_0.5s]"
                start="onHover"
                reset
                className="m-[5px] h-[90px] w-[90px] pt-3 text-center "
              >
                <img src={icon3} alt="man" className={`${styles.icon} bg-icon-green p-[10px] rounded-[15px]`} />
              </TEAnimation>
              <div className={styles.paragraphs}>
                <p className={styles.highlight}>INDYWIDUALNE PODEJŚCIE</p>
                <p>
                  Każde drzewo może mieć indywidualną tabliczkę z dedykacją,
                  dzięki czemu Twój prezent jest naprawdę wyjątkowy.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.rows}>
            <div className={styles.part}>
            <TEAnimation
                animation="[fly-in_0.5s]"
                start="onHover"
                reset
                className="m-[5px] h-[90px] w-[90px] pt-3 text-center "
              >
                <img src={icon4} alt="calendar" className={`${styles.icon} bg-icon-green p-[10px] rounded-[15px]`} />
              </TEAnimation>
              <div className={styles.paragraphs}>
                <p className={styles.highlight}>DŁUGOTERMINOWY WPŁYW</p>
                <p>
                  Każde drzewo, które sadzimy, to inwestycja w&nbsp;przyszłe
                  pokolenia.
                </p>
              </div>
            </div>

            <div className={styles.part}>
            <TEAnimation
                animation="[fly-in_0.5s]"
                start="onHover"
                reset
                className="m-[5px] h-[90px] w-[90px] pt-3 text-center "
              >
                <img src={icon5} alt="hans" className={`${styles.icon} bg-icon-green p-[10px] rounded-[15px]`} />
              </TEAnimation>
              <div className={styles.paragraphs}>
                <p className={styles.highlight}>PARTNERSKIE PODEJŚCIE</p>
                <p>
                  Współpracujemy z lokalnymi organizacjami i&nbsp;instytucjami, aby
                  nasze drzewa rosły w&nbsp;odpowiednich warunkach.
                </p>
              </div>
            </div>

            <div className={styles.part}>
            <TEAnimation
                animation="[fly-in_0.5s]"
                start="onHover"
                reset
                className="m-[5px] h-[90px] w-[90px] pt-3 text-center "
              >
                <img src={icon6} alt="leaf" className={`${styles.icon} bg-icon-green p-[10px] rounded-[15px]`} />
              </TEAnimation>
              <div className={styles.paragraphs}>
                <p className={styles.highlight}>CERTYFIKAT</p>
                <p>
                  Do każdego posadzonego drzewa dołączamy certyfikat
                  potwierdzający Twoje wsparcie dla&nbsp;środowiska.
                </p>
              </div>
            </div>
          </div>
          <Link to="/order">
          <TERipple rippleColor="light">
            <button
              type="button"
              className="buttonCss blok px-6 py-3 text-base font-semibold leading-normal text-white transition duration-150 ease-in-out bg-custom-green hover:bg-custom-green-hover focus:bg-custom-green-hover focus:outline-none focus:ring-0 active:bg-custom-green-active mt-10"
            >
              Chcę zasadzić swoje drzewo!
            </button>
          </TERipple>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default WhyTrustUs;
