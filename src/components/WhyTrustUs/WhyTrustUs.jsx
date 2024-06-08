import React from "react";
import icon4 from '../../images/WhyTrustUs/calendar_icon.png';
import icon2 from '../../images/WhyTrustUs/garden_icon.png';
import icon5 from '../../images/WhyTrustUs/hand_icon.png';
import icon1 from '../../images/WhyTrustUs/leaf_icon.png';
import icon3 from '../../images/WhyTrustUs/man_icon.png';
import icon6 from '../../images/WhyTrustUs/search_icon.png';

import styles from "./WhyTrustUs.module.css";

const WhyTrustUs = () => {
  return (
    <div className={styles.WhyTrustUsTitle}>
      <div>Dlaczego warto nam zaufać</div>
      <div className={styles.container}>
        <div className={styles.reason}>

          <div className={styles.part}>
            <div className={styles.iconContainer}>
              <img src={icon1} alt="leaf" className={styles.icon}/>
            </div>
            <div className={styles.paragraphs}>
              <p className={styles.highlight}>PROSTOTA</p>
              <p>Sadzenie drzewa jako prezent jeszcze nigdy nie było tak proste i przyjemne.</p>
            </div>
          </div>

          <div className={styles.part}>
          <div className={styles.iconContainer}>
              <img src={icon2} alt="garden" className={styles.icon}/>
            </div>
            <div className={styles.paragraphs}>
              <p className={styles.highlight}>EKOLOGIA</p>
              <p>Nasza misja to walka ze zmianami klimatycznymi poprzez zwiększanie liczby drzew na świecie.</p>
            </div>
          </div>

          <div className={styles.part}>
            <div className={styles.iconContainer}>
              <img src={icon3} alt="man" className={styles.icon}/>
            </div>
            <div className={styles.paragraphs}>
              <p className={styles.highlight}>INDYWIDUALNE PODEJŚCIE
              </p>
              <p>Każde drzewo może mieć indywidualną tabliczkę z dedykacją, dzięki czemu Twój prezent jest naprawdę wyjątkowy.
              </p>
            </div>
          </div>

          <div className={styles.part}>
            <div className={styles.iconContainer}>
              <img src={icon4} alt="calendar" className={styles.icon}/>
            </div>
            <div className={styles.paragraphs}>
              <p className={styles.highlight}>DŁUGOTERMINOWY WPŁYW
              </p>
              <p>Każde drzewo, które sadzimy, to inwestycja w przyszłe pokolenia.
              </p>
            </div>
          </div>

          <div className={styles.part}>
            <div className={styles.iconContainer}>
              <img src={icon5} alt="hands" className={styles.icon}/>
            </div>
            <div className={styles.paragraphs}>
              <p className={styles.highlight}>PARTNERSKIE PODEJŚCIE
              </p>
              <p>Współpracujemy z lokalnymi organizacjami i instytucjami, aby nasze drzewa rosły w odpowiednich warunkach.
              </p>
            </div>
          </div>

          <div className={styles.part}>
            <div className={styles.iconContainer}>
              <img src={icon6} alt="leaf" className={styles.icon}/>
            </div>
            <div className={styles.paragraphs}>
              <p className={styles.highlight}>CERTYFIKAT
              </p>
              <p>Do każdego posadzonego drzewa dołączamy certyfikat potwierdzający Twoje wsparcie dla środowiska.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WhyTrustUs;
