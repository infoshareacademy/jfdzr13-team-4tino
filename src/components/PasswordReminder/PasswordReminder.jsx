import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase.js';
import styles from "./PasswordReminder.module.css";
import { sendPasswordResetEmail } from 'firebase/auth'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PasswordReminder() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); 

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Email z linkiem do resetowania hasła został wysłany.', {
        hideProgressBar: true,
        autoClose: 1000,
        style: { marginTop: '120px' },
        onClose: () => navigate("/login"), 
      });
    } catch (error) {
      toast.error('Błąd podczas wysyłania emaila z linkiem do resetowania hasła.', {
        hideProgressBar: true,
        autoClose: 1000,
        style: { marginTop: '120px' }
      });
    }
  };

  return (
    <div className={styles.passwordReminderModule}>
      <div className={styles.passwordReminderForm}>
        <h1 className={styles.welcomeTitle}>Witaj w <span className={styles.fourTino}>4TINO</span></h1>
        <div className={styles.passwordReminderTitle}>Zresetuj Hasło</div>
        <input
          type="email"
          placeholder="Wprowadź adres email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleResetPassword}>Wyślij link do resetowania hasła</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default PasswordReminder;