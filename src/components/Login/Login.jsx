import React, { useState } from 'react';
import styles from "./Login.module.css";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase.js'; // Importuj konfigurację Firebase
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()
  const { user } = useUser(); // Pobierz usera z kontekstu

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log(user.email)
      toast.success('Zalogowano pomyślnie');
      navigate("/")
    } catch (error) {
      toast.error('Błędny email lub hasło', {
        hideProgressBar: true
      });
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
      <a href="#">Przypomnij Hasło</a>
      <p>Nie masz konta? <a href="#">Zarejestruj się</a></p>
    </div>
  );
};

export default Login;
