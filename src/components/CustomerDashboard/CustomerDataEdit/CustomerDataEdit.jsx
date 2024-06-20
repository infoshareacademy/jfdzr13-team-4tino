import { EmailAuthProvider, getAuth, reauthenticateWithCredential, updatePassword, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TERipple } from "tw-elements-react";
import { db } from '../../../firebase';
import '../../../tailwind.css';
import styles from '../CustomerDataEdit/CustomerDataEdit.module.css';

const CustomerDataEdit = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState(user ? user.email : '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Pobierz bieżące dane użytkownika z Firestore
    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setFirstName(userData.firstName);
                    setLastName(userData.lastName);
                    setPhone(userData.phone);
                    setEmail(userData.email);
                }
            }
        };
        fetchUserData();
    }, [user]);

    const updateUserData = async () => {
        try {
            // Zaktualizuj dane użytkownika
            await updateProfile(user, {
                displayName: `${firstName} ${lastName}`,
                phoneNumber: phone,
            });

            // Zapisz zmian w Firestore
            await setDoc(doc(db, "users", user.uid), {
                firstName,
                lastName,
                phone,
                email
            }, { merge: true });

            alert('Dane zostały pomyślnie zaktualizowane!');
        } catch (error) {
            console.error("Error updating user data: ", error);
            alert(`Wystąpił błąd podczas aktualizacji danych użytkownika: ${error.message}`);
        }
    };

    const updateUserPassword = async () => {
        try {
            // Uwierzytelnij ponownie użytkownika, jeśli podano aktualne hasło
            if (currentPassword) {
                const credential = EmailAuthProvider.credential(user.email, currentPassword);
                await reauthenticateWithCredential(user, credential);
            }

            // Zaktualizuj hasło, jeśli podano nowe hasło
            if (newPassword) {
                await updatePassword(user, newPassword);
                alert('Hasło zostało pomyślnie zaktualizowane!');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            }
        } catch (error) {
            if (error.code === 'auth/too-many-requests') {
                alert('Twoje konto zostało tymczasowo zablokowane z powodu zbyt wielu nieudanych prób logowania. Zresetuj swoje hasło lub spróbuj ponownie później.');
            } else if (error.code === 'auth/wrong-password') {
                alert('Aktualne hasło jest nieprawidłowe.');
            } else {
                console.error("Error updating user password: ", error);
                alert(`Wystąpił błąd podczas aktualizacji hasła użytkownika: ${error.message}`);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Sprawdź, czy hasła są zgodne, tylko jeśli użytkownik wprowadził nowe hasło
        if (newPassword && newPassword !== confirmPassword) {
            alert('Hasła nie są zgodne!');
            return;
        }

        // Zaktualizuj dane użytkownika
        await updateUserData();

        // Aktualizuj hasło tylko wtedy, gdy podano nowe hasło i bieżące hasło
        if (newPassword && currentPassword) {
            await updateUserPassword();
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.panel}>
                <Link to="/user/orders" className={styles.link}>
                    <p className={styles.orderText}>Zamówienia</p>
                </Link>

                <Link to="/user/data" className={styles.link}>
                    <p className={styles.dataText}>Edytuj dane</p>
                </Link>
            </div>

            <div className={styles.main}>
                <h2 className={styles.h2}>Twoje dane</h2>
                <p>🌳 🌳 🌳 </p>

                <div className={styles.dataForm}>
                    <form className={styles.form} onSubmit={handleSubmit}>
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
                                readOnly 
                            />
                        </div>

                        <div className={styles.inputType}>
                            <p>Aktualne hasło</p>
                            <input 
                                type="password" 
                                value={currentPassword} 
                                onChange={(e) => setCurrentPassword(e.target.value)} 
                                placeholder="Aktualne hasło" 
                            />
                        </div>

                        <div className={styles.inputType}>
                            <p>Nowe hasło (opcjonalnie)</p>
                            <input 
                                type="password" 
                                value={newPassword} 
                                onChange={(e) => setNewPassword(e.target.value)} 
                                placeholder="Nowe hasło" 
                            />
                        </div>

                        <div className={styles.inputType}>
                            <p>Potwierdź nowe hasło</p>
                            <input 
                                type="password" 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                placeholder="Potwierdź nowe hasło" 
                            />
                        </div>

                        <div class="input8"></div>

                        <TERipple rippleColor="light">
                            <button
                            type="submit"
                            className="buttonCss blok rounded-lg px-6 py-3 text-base font-semibold leading-normal text-white transition duration-150 bg-green-500 ease-in-out hover:bg-green-600 focus:bg-green-600 focus:outline-none focus:ring-0 active:bg-green-700"
                            style={{ backgroundColor: "#2d8014", borderRadius: "10px" }}
                            >
                            Zapisz
                            </button>
                        </TERipple>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CustomerDataEdit;
