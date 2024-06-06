import React from "react";
import styles from "./Homepage.module.css";
import Introduction from "../Introudction/Introduction";
import HowItWorks from "../HowItworks/HowItWorks";
import WhyTrustUs from "../WhyTrustUs/WhyTrustUs";
import About from "../About/About";



const Homepage = () => {
  return (
    <div className={styles.homepage}>
      {/* komponenty here */}
      <Introduction />
      <div id="howItWorks">
        <HowItWorks />
      </div>
      <WhyTrustUs />
      <About />
      {/* <SpanishInquisition/> */}
    </div>
  );
};

export default Homepage;

