import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase.js';
import styles from "./PasswordReminder.module.css";
import { sendPasswordResetEmail } from 'firebase/auth'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TERipple } from "tw-elements-react";

function PasswordReminder() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); 

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Email z linkiem do resetowania hasła został wysłany, sprawdź pocztę.', {
        hideProgressBar: true,
        autoClose: 2000,
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
          placeholder="Wprowadź swój adres email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className={styles.buttonContainer}>
        <TERipple rippleColor="light">
                               <button 
                               onClick={handleResetPassword}
                               className={`buttonCss blok px-6 py-3 text-base font-semibold leading-normal text-white transition duration-150 ease-in-out bg-custom-green hover:bg-custom-green-hover focus:bg-custom-green-hover focus:outline-none focus:ring-0 active:bg-custom-green-active mt-10 mb-8`}
                               >
                                Wyślij link do resetowania hasła
                               </button>
                               </TERipple>     
          </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default PasswordReminder;