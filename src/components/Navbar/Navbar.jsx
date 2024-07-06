import React, { useEffect, useRef, useState } from "react";
import { HashLink as Link } from 'react-router-hash-link';
import { TERipple } from "tw-elements-react";
import tinoName from "../../assets/4tino-logo.png";
import userIcon from "../../assets/user.svg";
import userIconHover from '../../assets/user2.svg';
import { useUser } from '../../context/UserContext/UserContext';
import Logout from '../Logout/Logout';
import styles from "./Navbar.module.css";
import PulsingBar from "./PulsingBar/PulsingBar";

const Navbar = () => {
  const { user } = useUser();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const timerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsMenuVisible(false);
    setIsHovered(false);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, [user]);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsHovered(true);
    setIsMenuVisible(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setIsHovered(false);
      setIsMenuVisible(false);
    }, 500);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const getUserIcon = () => {
    if (user) {
      return isHovered ? userIconHover : userIcon;
    }
    return userIcon;
  };

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbar}>
        <Link to="/">
          <img className={styles.bigIcon} src={tinoName} alt="icon" />
        </Link>

        {/* Przycisk menu dla urządzeń mobilnych */}
        
        <div className={styles.mobileMenuIcon} onClick={toggleMobileMenu}>
          <div className={`${styles.bar} ${isMobileMenuOpen ? styles.rotate : ''}`}></div>
          <div className={`${styles.bar} ${isMobileMenuOpen ? styles.hide : ''}`}></div>
          <div className={`${styles.bar} ${isMobileMenuOpen ? styles.rotateNeg : ''}`}></div> 
        </div>
        
        {/* Menu nawigacyjne */}
        
        <div className={`${styles.navMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
          <Link smooth to="/#howItWorks" className={styles.item}>
            Jak to działa?
          </Link>
          <Link smooth to="/#about" className={styles.item}>
            O nas
          </Link>
          <Link smooth to="/order" className={styles.item}>
            Zamów
          </Link>  
          <div className={styles.loginPanel}>
            {user ? (
              <div
                className={styles.userMenuContainer}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {!isMobile && (
                  <img
                    src={getUserIcon()}
                    alt="user"
                    className={styles.userIcon}
                  />
                )}
                {isMenuVisible && !isMobile && (
                  <div className={styles.dropdownMenu}>
                    <Link to={user.email === 'admin@admin.com' ? '/admin' : '/user'} className={styles.menuItem}>
                      Konto
                    </Link>
                    <Logout className={styles.item} />
                  </div>
                )}
                {isMobileMenuOpen && isMobile && (
                  <div className={styles.dropdownMenuMobile}>
                    <Link to={user.email === 'admin@admin.com' ? '/admin' : '/user'} className={styles.menuItem}>
                      Konto
                    </Link>
                    <Logout className={styles.item} />
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login">
                  <TERipple rippleColor="light">
                    <button
                      type="button"
                      className="buttonCss blok px-6 py-3 text-base font-semibold leading-normal text-black shadow-inset-custom bg-white hover:bg-custom-green-hover hover:text-white active:bg-custom-green-active mt-0 ml-5"
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
      <PulsingBar />
    </div>
  );
};

export default Navbar;
