import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import styles from "./Register.module.css";
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';



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
            <h1>Rejestracja</h1>
            <form>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Imię" />
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Nazwisko" />
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Telefon" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Adres email" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Hasło" />
                <button type="submit" onClick={register}>Zarejestruj</button>
            </form>
        </div>
    );
}

export default Register;
