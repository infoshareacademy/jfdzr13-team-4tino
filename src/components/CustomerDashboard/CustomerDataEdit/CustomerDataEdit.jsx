import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../../firebase';
import styles from '../CustomerDataEdit/CustomerDataEdit.module.css';


const CustomerDataEdit = () => {

    const auth = getAuth();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const register = async (e) => {
        e.preventDefault();
        
        // Sprawdź, czy hasła są zgodne
        if (newPassword !== confirmPassword) {
            alert('Hasła nie są zgodne!');
            return;
        }
        try {
            const authUser = await createUserWithEmailAndPassword(auth, email, newPassword);
            await updateProfile(authUser.user, {
                displayName: `${firstName} ${lastName}`,
                phoneNumber: phone,
            });
            alert('Użytkownik został pomyślnie dodany!');
            await addDoc(collection(db, "users"), { firstName, lastName, phone, email, id: authUser.user.uid });
        } catch (error) {
            console.error("Error adding user: ", error);
            alert('Wystąpił błąd podczas dodawania użytkownika.');
        }
};

return (
    <div className={styles.container}>


        <div className={styles.panel}>
            <Link to="/user/orders" className={styles.link}>
            <p>Zamówienia</p>
            </Link>

            <Link to="/user/data" className={styles.link}>
            <p className={styles.dataText}>Edytuj dane</p>
            </Link>
            
        </div>

        <div className={styles.main}>
            <h1>Twoje dane</h1>
            <p>🌳 🌳 🌳 </p>

            <div className={styles.dataForm}>
                
            <form className={styles.form}>
                <div className={styles.inputType}>
                <p>Imię</p>
                <input 
                    type="text" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    placeholder="Imię" 
                    required 
                />
                </div>
                
                <div className={styles.inputType}>
                <p>Nazwisko</p>
                <input 
                    type="text" 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                    placeholder="Nazwisko" 
                    required 
                />
                </div>

                <div className={styles.inputType}>
                <p>Telefon</p>
                <input 
                    type="text" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    placeholder="Telefon" 
                    required 
                />
                </div>

                <div className={styles.inputType}>
                <p>Adres email</p>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Adres email" 
                    required 
                />
                </div>

                <div className={styles.inputType}>
                <p>Hasło</p>
                <input 
                    type="password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    placeholder="Aktualne hasło" 
                    required 
                />
                </div>

                <div className={styles.inputType}>
                <p>Nowe hasło</p>
                <input 
                    type="password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    placeholder="Nowe hasło" 
                    required 
                />
                </div>

                <div className={styles.inputType}>
                <p>Potwierdź nowe hasło</p>
                <input 
                    type="password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    placeholder="Potwierdź nowe hasło" 
                    required 
                />
                </div>

                <button className={styles.button} type="submit" onClick={register}>Zapisz</button>
            </form>
            </div>
        </div>
    </div>
);
};

export default CustomerDataEdit;