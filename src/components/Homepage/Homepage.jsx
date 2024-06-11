import React from "react";
import { useUser } from '../../context/UserContext/UserContext';
import About from "../Homepage/About/About";
import HowItWorks from "../Homepage/HowItworks/HowItWorks";
import Introduction from "../Homepage/Introduction/Introduction";
import WhyTrustUs from "../Homepage/WhyTrustUs/WhyTrustUs";
import styles from "./Homepage.module.css";

const Homepage = () => {
  const { user } = useUser();

  return (
    // testowo wyświetlamy zalogowanego usera
    <div className={styles.homepage}>
      {user ? (
        <p>Zalogowany jako: {user.email}</p>
      ) : (
        <p>Nie jesteś zalogowany</p>
      )}

      {/* komponenty here */}
      <Introduction />
      <div id="howItWorks">
        <HowItWorks />
      </div>
      <WhyTrustUs />
      <div id="about" />
      <About />
    </div>


  );
};

export default Homepage;

