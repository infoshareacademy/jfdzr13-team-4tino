import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TERipple } from "tw-elements-react";
import hideIcon from '../../assets/LoginRegister/hide.svg';
import showIcon from '../../assets/LoginRegister/show.svg';
import { useUser } from '../../context/UserContext/UserContext';
import { auth } from '../../firebase.js';
import styles from "./Login.module.css";


const Login = () => {
  const navigate = useNavigate();
  const { user } = useUser(); // Pobierz usera z kontekstu

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

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

    // Walidacja danych
    if (!validateEmail(email)) {
      toast.error('Nieprawidłowy adres email', {
        hideProgressBar: true,
        autoClose: 3000,
        style: { marginTop: '120px' }
      });
      return;
    }

    if (password.length < 6) {
      toast.error('Hasło musi mieć co najmniej 6 znaków', {
        hideProgressBar: true,
        autoClose: 3000,
        style: { marginTop: '120px' }
      });
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = userCredential.user;
      toast.success('Zalogowano pomyślnie', {
        hideProgressBar: true,
        autoClose: 1000,
        style: { marginTop: '120px' }
      });

      if (loggedInUser.email === 'admin@admin.com') {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error('Błędny email lub hasło', {
        hideProgressBar: true,
        autoClose: 1000,
        style: { marginTop: '120px' }
      });
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setPasswordVisible(!passwordVisible);
    }
  };

  return (
    <div className={styles.loginModule}>
      <div className={styles.loginForm}>
        <h1 className={styles.welcomeTitle}>Witaj w <span className={styles.fourTino}>4TINO</span></h1>
        <p className={styles.registerLink}>Nie masz konta? <Link className={styles.link} to="/register">Zarejestruj się</Link></p>
        <div className={styles.loginTitle}>Zaloguj się</div>
        <form className={styles.formLogin} onSubmit={handleSubmit} noValidate>
          <label>
            <p>Podaj adres email:</p>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Adres email: example@gmail.com"
              required
            />
          </label>

          <label>
            <p>Podaj Hasło:</p>
            <div className={styles.inputContainer}>
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Podaj Hasło"
                required
                className={styles.passwordInput}
              />
              <button type="button" onClick={() => togglePasswordVisibility('password')} className={styles.togglePasswordButton}>
                <img src={passwordVisible ? hideIcon : showIcon} alt={passwordVisible ? "Ukryj" : "Pokaż"} />
              </button>
              
            </div>
          </label>
          <div>
          <Link className={styles.link} to="/PasswordReminder">Zresetuj Hasło</Link>

        </div>
          {/* <button className={styles.button} type="submit">Zaloguj</button> */}
          <TERipple rippleColor="light">
            <button
              type="submit"
              className="buttonCss blok px-6 py-3 text-base font-semibold leading-normal text-white transition duration-150 ease-in-out bg-custom-green hover:bg-custom-green-hover focus:bg-custom-green-hover focus:outline-none focus:ring-0 active:bg-custom-green-active mt-10"
            >
              Zaloguj
            </button>
          </TERipple>
        </form>
        </div>
    </div>
  );
};

export default Login;
