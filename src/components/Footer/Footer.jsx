import React from "react";
import styles from "./Footer.module.css";
import logo from "../../assets/favicon.png"
import socialMedia from "../../assets/Footer/socialmedia.svg"


const Footer = () => {
  return (
    
      <div className={styles.container}>
        <div className={styles.contParagraphs}>          
          <div className={styles.logoContent}>
            <img src={logo} alt="logo" className={styles.logo}/>
          </div>

          <div>
            <p className={styles.paragraphs}>4Tino spółka z o.o.</p>
            <p className={styles.paragraphs}>ul. Wymyslona 4a/1</p>
            <p className={styles.paragraphs}>84-000 Miejscowość</p>
            <p className={styles.paragraphs}>Tel. +48 123-456-789</p>
            <a className={styles.paragraphs} href="mailto:4tino2024@gmail.com">4tino2024@gmail.com </a> 
          </div> 
          <div>
            <img src={socialMedia} alt="socialMedia" className={styles.socialMedia} />       
          </div>
     </div>  
     </div>      
    
  );
};

export default Footer;
