import React from "react";
import styles from "./Footer.module.css";
import logo from "../../assets/favicon.png"
import socialFacebook from "../../assets/Footer/facebook.svg"
import socialInstagram from "../../assets/Footer/instagram.svg"


const Footer = () => {
  return (
      <div className={styles.container}>
        <div className={styles.contParagraphs}>          
          <div className={styles.logoContent}>
            <img src={logo} alt="logo" className={styles.logo}/>
          </div>

          <div className={styles.adres}>
            <p className={styles.companyName}>4Tino spółka z o.o.</p>
            <p className={styles.paragraphs}>ul. Skalbmierska 99/1</p>
            <p className={styles.paragraphs}>81-844 Warszawa</p>
            <p className={styles.regonNipKrs}>REGON: 221493840</p>
            <p className={styles.regonNipKrs}>NIP: 6795579692</p>
            <p className={styles.regonNipKrs}>KRS: 0110439376</p>
          </div>

          <div className={styles.contact}>
            <div>
            <p className={styles.companyName}>Zadzwoń</p> 
            <p className={styles.paragraphs}>Tel. +48 123-456-789</p>
            </div>
            <div>
            <p className={styles.companyName}>Napisz do Nas</p> 
            <a className={styles.paragraphs} href="mailto:4tino2024@gmail.com?subject=Pro%C5%9Bba%20o%20Kontakt&body=Dzie%C5%84%20dobry,%20jestem%20zainteresowany%20Pa%C5%84stwa%20ofert%C4%85,%20prosz%C4%99%20o%20kontakt.">4tino2024@gmail.com</a>
            </div>  
          </div>
          
          <div className={styles.social}>
          <p className={styles.socialName}>Odwiedź Nas:</p>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img src={socialFacebook} alt="socialFace" className={styles.socialMedia} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={socialInstagram} alt="socialInsta" className={styles.socialMedia} />
          </a>
          </div> 
     </div>  
     </div>      
    
  );
};

export default Footer;