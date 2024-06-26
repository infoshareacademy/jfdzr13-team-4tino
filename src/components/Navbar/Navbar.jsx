import React, { useEffect, useRef, useState } from "react";
import { HashLink as Link } from 'react-router-hash-link';
import { TERipple } from "tw-elements-react";
import '../.././tailwind.css';
import tinoName from "../../assets/4tino-logo.png";
import userIcon from "../../assets/user.png";
import { useUser } from '../../context/UserContext/UserContext';
import Logout from '../Logout/Logout';
import styles from "./Navbar.module.css";
import Preloader from "./Preloader/Preloader";

const Navbar = () => {
  const { user } = useUser();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    setIsMenuVisible(false);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, [user]);

  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsMenuVisible(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setIsMenuVisible(false);
    }, 500); //czas po którym menu znika
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbar}>
        <Link to="/">
          <img className={styles.bigIcon} src={tinoName} alt="icon" />
        </Link>
        <div className={styles.navMenu}>
          <Link smooth to="/#howItWorks">
            <p className={styles.item}>Jak to działa?</p>
          </Link>
          <Link smooth to="/#about">
            <p className={styles.item}>O nas</p>
          </Link>
          <div className={styles.loginPanel}>
            {user ? (
              <div
                className={styles.userMenuContainer}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={userIcon}
                  alt="user"
                  className={styles.userIcon}
                />
                {isMenuVisible && (
                  <div className={styles.dropdownMenu}>
                    <Link to={user.email === 'admin@admin.com' ? '/admin' : '/user'} className={styles.menuItem}>
                      Konto
                    </Link>
                    <Logout className={styles.menuItem} />
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login">
                  <TERipple rippleColor="light">
                    <button
                      type="button"
                      className="buttonCss blok px-6 py-3 text-base font-semibold leading-normal text-black shadow-inset-custom bg-white hover:bg-custom-green-hover hover:text-white focus:bg-custom-green-hover focus:ring-0 active:bg-custom-green-active mt-0 ml-5"
                    >
                      Zaloguj się
                    </button>
                  </TERipple>
                </Link>
                <Link to="/register">
                  <TERipple rippleColor="light">
                    <button
                      type="button"
                      className="buttonCss blok px-6 py-3 text-base font-semibold leading-normal text-white transition duration-150 ease-in-out bg-custom-green hover:bg-custom-green-hover focus:bg-custom-green-hover focus:outline-none focus:ring-0 active:bg-custom-green-active mt-0 ml-8"
                    >
                      Rejestracja
                    </button>
                  </TERipple>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      {isLoading ? (
        <Preloader className={styles.preloader} />
      ) : null}
    </div>
  );
};

export default Navbar;