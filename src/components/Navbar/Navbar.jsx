import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import bigIcon from "../../assets/4tino-icon.png";
import Menu from "../Menu/Menu";

const Navbar = () => {
  return (
    <div className={styles.header}>
      <Link to="/">
        <img className={styles.bigIcon} src={bigIcon} alt="icon" />
      </Link>
      <Menu />
    </div>
  );
};

export default Navbar;
