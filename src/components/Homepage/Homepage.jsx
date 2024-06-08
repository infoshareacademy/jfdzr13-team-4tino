import React from "react";
import About from "../Homepage/About/About";
import HowItWorks from "../Homepage/HowItworks/HowItWorks";
import WhyTrustUs from "../Homepage/WhyTrustUs/WhyTrustUs";
import Introduction from "../Introudction/Introduction";
import styles from "./Homepage.module.css";

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

