import React from "react";
import { useUser } from '../../context/UserContext/UserContext';
import About from "../Homepage/About/About";
import HowItWorks from "../Homepage/HowItworks/HowItWorks";
import Introduction from "../Homepage/Introduction/Introduction";
import WhyTrustUs from "../Homepage/WhyTrustUs/WhyTrustUs";
import styles from "./Homepage.module.css";
import Footer from "../Footer/Footer"



const Homepage = () => {

  return (
    <div className={styles.homepage}>
      {/* komponenty here */}
      <Introduction />
      <div id="howItWorks">
        <HowItWorks />
      </div>
      <WhyTrustUs />
      <div id="about" />
      <About />
      <Footer />
    </div>


  );
};

export default Homepage;

