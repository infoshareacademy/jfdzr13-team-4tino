import React, { useState, useRef, useEffect } from "react";
import { HashLink as Link } from 'react-router-hash-link';
import tinoName from "../../assets/4tino-name.png";
import userIcon from "../../assets/user.png"; // Importuj obraz user.png
import styles from "./Navbar.module.css";
import { useUser } from '../../context/UserContext/UserContext';
import Logout from '../Logout/Logout';

const Navbar = () => {
  const { user } = useUser();
  const [isMenuVisible, setIsMenuVisible] = useState(false); // Stan do zarządzania widocznością menu
  const menuRef = useRef(null); // Referencja do menu

  useEffect(() => {
    // Ukryj menu po zmianie użytkownika (np. po zalogowaniu)
    setIsMenuVisible(false);
  }, [user]);

  const handleMouseEnter = () => {
    setIsMenuVisible(true);
  };

  const handleMouseLeave = () => {
    setIsMenuVisible(false);
  };

  return (
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
                <div ref={menuRef} className={styles.dropdownMenu}>
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
                <button className={styles.login}>Zaloguj się</button>
              </Link>
              <Link to="/register">
                <button>Rejestracja</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
