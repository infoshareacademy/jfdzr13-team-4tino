import React, { useState } from 'react';
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
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
      
      {/* to nie wiem czy tak powinno być */}
      <a href="#">Przypomnij Hasło</a> 
      <p>Nie masz konta? <a href="#">Zarejestruj się</a></p>
      {/* to nie wiem czy tak powinno być */}
    </div>
  );
};

export default Login;
