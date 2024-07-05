import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext/UserContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import showIcon from '../../assets/LoginRegister/show.svg';
import hideIcon from '../../assets/LoginRegister/hide.svg';
import { TERipple } from "tw-elements-react";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import styles from "./Register.module.css";

function Register() {
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
    });

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const navigate = useNavigate();
    const { user } = useUser();

    useEffect(() => {
        if (user) {
            if (user.email === 'admin@admin.com') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        }
    }, [user, navigate]);

    const auth = getAuth();
    const db = getFirestore();

    const validate = (fields) => {
        const newErrors = {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            password: ""
        };

        const nameRegex = /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{2,30}$/;
        const phoneRegex = /(?:\+48)?[\s-]?(\d{3})[\s-]?(\d{3})[\s-]?(\d{3})/;
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const passwordRegex = /^(?=.*[A-Za-z].*[A-Za-z].*[A-Za-z].*[A-Za-z].*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

        if (!nameRegex.test(fields.firstName)) {
            newErrors.firstName = "Nieprawidłowe Imię";
            toast.error('Nieprawidłowe Imię', {
                toastId: 'firstNameError'
            });
        }
        if (!nameRegex.test(fields.lastName)) {
            newErrors.lastName = "Nieprawidłowe Nazwisko";
            toast.error('Nieprawidłowe Nazwisko', {
                toastId: 'lastNameError'
            });
        }
        if (!phoneRegex.test(fields.phone)) {
            newErrors.phone = "Nieprawidłowy numer telefonu";
            toast.error('Nieprawidłowy numer telefonu', {
                toastId: 'phoneError'
            });
        }
        if (!emailRegex.test(fields.email)) {
            newErrors.email = "Nieprawidłowy e-mail";
            toast.error('Nieprawidłowy e-mail', {
                toastId: 'emailError'
            });
        }
        if (!passwordRegex.test(fields.password)) {
            newErrors.password = "Błędne hasło";
            toast.error('Błędne hasło', {
                toastId: 'passwordError'
            });
        }

        setErrors(newErrors);

        return newErrors;
    };

    const register = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const firstName = form.get("name");
        const lastName = form.get("lastName");
        const phone = form.get("phone");
        const email = form.get("email");
        const password = form.get("password");

        const newErrors = validate({
            firstName,
            lastName,
            phone,
            email,
            password
        });

        if (Object.values(newErrors).some(error => error !== "")) {
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Hasła nie pasują do siebie.', {
                toastId: 'passwordMismatchError'
            });
            return;
        }

        try {
            const authUser = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(authUser.user, {
                displayName: firstName + ' ' + lastName,
                phoneNumber: phone,
            });
            toast.success('Użytkownik został pomyślnie zarejestrowany!', {
                toastId: 'registrationSuccess'
            });
            await addDoc(collection(db, "users"), { firstName, lastName, phone, email, id: authUser.user.uid });
            navigate('/');
        } catch (error) {
            toast.error('Rejestracja nie powiodła się', {
                toastId: 'registrationError'
            });
        }
    };

    const togglePasswordVisibility = (field) => {
        if (field === 'password') {
            setPasswordVisible(!passwordVisible);
        } else if (field === 'confirmPassword') {
            setConfirmPasswordVisible(!confirmPasswordVisible);
        }
    };

    return (
        <div className={styles.registerModule}>
            <div className={styles.registerForm}>
                <h1 className={styles.welcomeTitle}>Witaj w <span className={styles.fourTino}>4TINO</span></h1>
                <p className={styles.loginLink}>Masz już konto? <Link className={styles.link} to="/login">Zaloguj się</Link></p>
                <div className={styles.registerTitle}>Rejestracja</div>
                <form className={styles.form} onSubmit={register} >
                    <input type="text" name="name" placeholder="Imię" required className={Boolean(errors.firstName) ? styles.fieldError : null} />
                    <input type="text" name="lastName" placeholder="Nazwisko" required className={Boolean(errors.lastName) ? styles.fieldError : null} />
                    <input type="tel" name="phone" placeholder="Numer telefonu" required className={Boolean(errors.phone) ? styles.fieldError : null} />
                    <input type="email" name="email" placeholder="Adres e-mail: example@gmail.com" required className={Boolean(errors.email) ? styles.fieldError : null} autoComplete="off"/>
                    
                    <div className={styles.inputContainer}>
                        <input 
                            type={passwordVisible ? "text" : "password"} 
                            name="password" 
                            placeholder="Wpisz hasło" 
                            required 
                            className={Boolean(errors.password) ? styles.fieldError : null} 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                        />
                        <button type="button" onClick={() => togglePasswordVisibility('password')} className={styles.togglePasswordButton}>
                            <img src={passwordVisible ? hideIcon : showIcon} alt={passwordVisible ? "Hide" : "Show"} />
                        </button>
                    </div>
                    
                    <div className={styles.inputContainer}>
                        <input 
                            type={confirmPasswordVisible ? "text" : "password"} 
                            name="confirmPassword" 
                            placeholder="Potwierdź hasło" 
                            required 
                            className={Boolean(errors.password) ? styles.fieldError : null} 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            autoComplete="new-password"
                        />
                        <button type="button" onClick={() => togglePasswordVisibility('confirmPassword')} className={styles.togglePasswordButton}>
                            <img src={confirmPasswordVisible ? hideIcon : showIcon} alt={confirmPasswordVisible ? "Hide" : "Show"} />
                        </button>
                    </div>

                    <div className={styles.buttonContainer}>
                        <TERipple rippleColor="light">
                            <button
                                type="submit"
                                className={`buttonCss blok px-6 py-3 text-base font-semibold leading-normal text-white transition duration-150 ease-in-out bg-custom-green hover:bg-custom-green-hover focus:bg-custom-green-hover focus:outline-none focus:ring-0 active:bg-custom-green-active mt-10 mb-8`}
                            >
                                Rejestracja
                            </button>
                        </TERipple>
                    </div>
                </form>
            </div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover style={{ marginTop: '120px' }} />
        </div>
    );
}

export default Register;