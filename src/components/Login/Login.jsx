import React, { useState } from 'react';
import styles from "./Login.module.css";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase.js'; // Importuj konfigurację Firebase

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Uwierzytelnianie za pomocą Firebase
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Zalogowano pomyślnie');
      // Tutaj możesz przekierować użytkownika na inną stronę lub wykonać inną akcję
    } catch (error) {
      setError('Błędny email lub hasło');
      console.error('Błąd logowania:', error);
    }
  };

  return (
    <div className={styles.loginForm}>
      <h1>Witaj w 4TINO</h1>
      <p>Zaloguj się</p>
      <form onSubmit={handleSubmit}>
        <label>
          Podaj adres email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            required
          />
        </label>

        <label>
          Hasło:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Zaloguj</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      <a href="#">Przypomnij Hasło</a>
      <p>Nie masz konta? <a href="#">Zarejestruj się</a></p>
    </div>
  );
};

export default Login;
