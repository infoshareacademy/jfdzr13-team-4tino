import { EmailAuthProvider, getAuth, reauthenticateWithCredential, updatePassword, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
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
    const [errors, setErrors] = useState({}); // Define errors state

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

    const validate = (fields) => {
        const newErrors = {
            firstName: "",
            lastName: "",
            phone: "",
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        };

        const nameRegex = /^[A-Z][a-z]{1,29}$/;
        const phoneRegex = /(?:\+48)?[\s-]?(\d{3})[\s-]?(\d{3})[\s-]?(\d{3})/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

        if (!nameRegex.test(fields.firstName)) {
            newErrors.firstName = ' ';
            toast.error('Nieprawidłowe Imię', { hideProgressBar: true, style: { marginTop: '120px' } });
        }
        if (!nameRegex.test(fields.lastName)) {
            newErrors.lastName = ' ';
            toast.error('Nieprawidłowe Nazwisko', { hideProgressBar: true, style: { marginTop: '120px' } });
        }
        if (!phoneRegex.test(fields.phone)) {
            newErrors.phone = ' ';
            toast.error('Nieprawidłowy numer telefonu', { hideProgressBar: true, style: { marginTop: '120px' } });
        }
        if (fields.newPassword && !passwordRegex.test(fields.newPassword)) {
            newErrors.newPassword = ' ';
            toast.error('Błędne hasło', { hideProgressBar: true, style: { marginTop: '120px' } });
        }
        if (fields.newPassword !== fields.confirmPassword) {
            newErrors.confirmPassword = ' ';
            toast.error('Hasła nie są zgodne!', { hideProgressBar: true, style: { marginTop: '120px' } });
        }

        setErrors(newErrors);
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fields = { firstName, lastName, phone, newPassword, confirmPassword };
        const newErrors = validate(fields);

        // Sprawdź czy są jakiekolwiek błędy walidacji
        if (Object.values(newErrors).some(error => error !== "")) {
            return;
        }

        try {
            // Zaktualizuj dane użytkownika tylko gdy nie ma błędów walidacji
            await updateUserData();

            // Aktualizuj hasło tylko wtedy, gdy podano nowe hasło i bieżące hasło
            if (newPassword && currentPassword) {
                await updateUserPassword();
            }

            // Powiadom użytkownika o pomyślnej aktualizacji
            // toast.success('Dane zostały pomyślnie zaktualizowane!', { hideProgressBar: true, style: { marginTop: '120px' } });

            // Zaktualizuj lokalny stan tylko gdy nie ma błędów walidacji
            setFirstName(fields.firstName);
            setLastName(fields.lastName);
            setPhone(fields.phone);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error("Error updating user data: ", error);
            toast.error(`Wystąpił błąd podczas aktualizacji danych użytkownika: ${error.message}`, { hideProgressBar: true, style: { marginTop: '120px' } });
        }
    };

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

            toast.success('Dane zostały pomyślnie zaktualizowane!', { hideProgressBar: true, style: { marginTop: '120px' } });
        } catch (error) {
            console.error("Error updating user data: ", error);
            toast.error(`Wystąpił błąd podczas aktualizacji danych użytkownika: ${error.message}`, { hideProgressBar: true, style: { marginTop: '120px' } });
            throw error; // Rzucenie błędu, aby można było obsłużyć go w handleSubmit
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
                toast.success('Hasło zostało pomyślnie zaktualizowane!', { hideProgressBar: true, style: { marginTop: '120px' } });
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            }
        } catch (error) {
            if (error.code === 'auth/too-many-requests') {
                toast.error('Twoje konto zostało tymczasowo zablokowane z powodu zbyt wielu nieudanych prób logowania. Zresetuj swoje hasło lub spróbuj ponownie później.', { hideProgressBar: true, style: { marginTop: '120px' } });
            } else if (error.code === 'auth/wrong-password') {
                toast.error('Aktualne hasło jest nieprawidłowe.', { hideProgressBar: true, style: { marginTop: '120px' } });
            } else {
                console.error("Error updating user password: ", error);
                toast.error(`Wystąpił błąd podczas aktualizacji hasła użytkownika: ${error.message}`, { hideProgressBar: true, style: { marginTop: '120px' } });
            }
            throw error; // Rzucenie błędu, aby można było obsłużyć go w handleSubmit
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.panel}>
                <Link to="/user" className={styles.link}>
                    <p className={styles.orderText}>Zamówienia</p>
                </Link>

                <Link to="/user/data" className={styles.link}>
                    <p className={styles.dataText}>Edytuj dane</p>
                </Link>
            </div>

            <div className={styles.main}>
                <h2 className={styles.h2}>Twoje dane</h2>

                <div className={styles.dataForm}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.gridContainer}>
                            <div className={styles.inputType}>
                                <p>Imię</p>
                                <input 
                                    type="text" 
                                    value={firstName} 
                                    onChange={(e) => setFirstName(e.target.value)} 
                                    placeholder="Imię" 
                                    required 
                                    className={errors.firstName ? styles.fieldError : null}
                                />
                                {errors.firstName && <p className={styles.errorText}>{errors.firstName}</p>}
                            </div>

                            <div className={styles.inputType}>
                                <p>Nazwisko</p>
                                <input 
                                    type="text" 
                                    value={lastName} 
                                    onChange={(e) => setLastName(e.target.value)} 
                                    placeholder="Nazwisko" 
                                    required 
                                    className={errors.lastName ? styles.fieldError : null}
                                />
                                {errors.lastName && <p className={styles.errorText}>{errors.lastName}</p>}
                            </div>
                            <div className={styles.inputType}>
                                <p>Telefon</p>
                                <input 
                                    type="text" 
                                    value={phone} 
                                    onChange={(e) => setPhone(e.target.value)} 
                                    placeholder="Telefon" 
                                    required 
                                    className={`${styles.klasa} ${errors.phone ? styles.fieldError : null}`}
                                    // className={errors.phone ? styles.fieldError : null}
                                />
                                {errors.phone && <p className={styles.errorText}>{errors.phone}</p>}
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
                                    className={styles.readOnlyInput}
                                />
                            </div>
                            <div className={styles.inputType}>
                                <p>Aktualne hasło</p>
                                <input 
                                    type="password" 
                                    value={currentPassword} 
                                    onChange={(e) => setCurrentPassword(e.target.value)} 
                                    placeholder="Aktualne hasło" 
                                    className={errors.currentPassword ? styles.fieldError : null}
                                />
                                {errors.currentPassword && <p className={styles.errorText}>{errors.currentPassword}</p>}
                            </div>

                            <div className={styles.inputType}>
                                <p>Nowe hasło</p>
                                <input 
                                    type="password" 
                                    value={newPassword} 
                                    onChange={(e) => setNewPassword(e.target.value)} 
                                    placeholder="Nowe hasło" 
                                    className={errors.newPassword ? styles.fieldError : null}
                                />
                                {errors.newPassword && <p className={styles.errorText}>{errors.newPassword}</p>}
                            </div>

                            <div className={styles.inputType}>
                                <p>Potwierdź nowe hasło</p>
                                <input 
                                    type="password" 
                                    value={confirmPassword} 
                                    onChange={(e) => setConfirmPassword(e.target.value)} 
                                    placeholder="Potwierdź nowe hasło" 
                                    className={errors.confirmPassword ? styles.fieldError : null}
                                />
                                {errors.confirmPassword && <p className={styles.errorText}>{errors.confirmPassword}</p>}
                            </div>
                        </div>

                        <div>
                            <TERipple rippleColor="light">
                                <button
                                    type="submit"
                                    className="buttonCss blok px-6 py-3 text-base font-semibold leading-normal text-white transition duration-150 ease-in-out bg-custom-green hover:bg-custom-green-hover focus:bg-custom-green-hover focus:outline-none focus:ring-0 active:bg-custom-green-active mt-10"
                                >
                                    Zapisz
                                </button>
                            </TERipple>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CustomerDataEdit;
