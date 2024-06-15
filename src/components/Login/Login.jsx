import React, { useState, useEffect } from 'react';
import styles from "./Login.module.css";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase.js';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext/UserContext';

const Login = () => {
  const navigate = useNavigate();
  const { user } = useUser(); // Pobierz usera z kontekstu

  useEffect(() => {
    // Przekierowujemy na /admin, jeśli użytkownik jest już zalogowany i jest administratorem, jeśli nie, na homepage
    if (user) {
      if (user.email === 'admin@admin.com') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [user, navigate]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    // Walidacja danych
    if (!validateEmail(email)) {
      toast.error('Nieprawidłowy adres email', {
        hideProgressBar: true,
        autoClose: 3000
      });
      return;
    }

    if (password.length < 6) {
      toast.error('Hasło musi mieć co najmniej 6 znaków', {
        hideProgressBar: true,
        autoClose: 3000
      });
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = userCredential.user;
      toast.success('Zalogowano pomyślnie', {
        hideProgressBar: true,
        autoClose: 1000
      });

      if (loggedInUser.email === 'admin@admin.com') {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error('Błędny email lub hasło', {
        hideProgressBar: true,
        autoClose: 1000
      });
    }
  };

  return (
    <div className={styles.loginModule}>
      <div className={styles.loginForm}>
        <h1 className={styles.welcomeTitle}>Witaj w <span className={styles.fourTino}>4TINO</span></h1>
        <div className={styles.loginTitle}>Zaloguj się</div>
        <form className={styles.formLogin} onSubmit={handleSubmit} noValidate>
          <label>
            <p>Podaj adres email:</p>
            <input
              name="email"
              placeholder="Adres email: example@gmail.com"
              required
            />
          </label>

          <label>
            <p>Podaj Hasło:</p>
            <input
              type="password"
              name="password"
              placeholder="Hasło"
              required
            />
          </label>
          <button className={styles.button} type="submit">Zaloguj</button>
        </form>
        <div>
          <a href="#">Przypomnij Hasło</a>
          <p className={styles.registerLink}>Nie masz konta? <Link className={styles.link} to="/register">Zarejestruj się</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
