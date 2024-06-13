import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import styles from "./Register.module.css";
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Register() {
  const auth = getAuth();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = (e) => {
      
      e.preventDefault();
      createUserWithEmailAndPassword(auth, email, password)
    .then((authUser) => {
        updateProfile(authUser.user, {
            displayName: firstName + ' ' + lastName,
            phoneNumber: phone,
        });
        alert('Użytkownik został pomyślnie dodany!');
        addDoc(collection(db, "users"), { firstName , lastName, phone,email, id: authUser.user.uid});
    })
     

  }
    return (
        <div className={styles.registerForm}>
            <h1 className={styles.welcomeTitle}>Witaj w 4TINO</h1>
            <p className={styles.loginLink}>Masz już konto? <Link to="/login">Zaloguj się</Link></p>
            <div className={styles.registerTitle}>Rejestracja</div>
            <form className={styles.form}>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Imię" required/>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Nazwisko" required/>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Telefon" required/>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Adres email" required/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Hasło" required/> 
            </form>
            <button className={styles.button} type="submit" onClick={register}>Zarejestruj</button>
        </div>
    );
}

export default Register;