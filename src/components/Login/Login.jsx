import React, { useState } from 'react';
import styles from "./Login.module.css";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext/UserContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()
  const { user } = useUser(); // Pobierz usera z kontekstu

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Zalogowano pomyślnie'),
        navigate("/");
    } catch (error) {
      toast.error('Błędny email lub hasło', {
        hideProgressBar: true
      });
    }
  };

  return (
    <div className={styles.loginModule}>
      <div className={styles.loginForm}>
        <h1 className={styles.welcomeTitle}>Witaj w <span className={styles.fourTino}>4TINO</span></h1>
        <div className={styles.loginTitle}>Zaloguj się</div>
        <form className={styles.formLogin} onSubmit={handleSubmit}>
          <label>
            <p>Podaj adres email:</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Adres email: example@gmail.com"
              required
            />
          </label>

          <label>
            <p>Podaj Hasło:</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
