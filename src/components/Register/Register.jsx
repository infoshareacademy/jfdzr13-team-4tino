import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext/UserContext';
import styles from "./Register.module.css";


function Register() {

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate();
    const { user } = useUser(); // Pobierz usera z kontekstu

    useEffect(() => {
        // Przekierowujemy na /admin, jeśli użytkownik jest już zalogowany i jest administratorem, jeśli nie, na homepage
        if (user) {
            if (user.email === 'admin@admin.com') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        }
    }, [user, navigate]);

    const auth = getAuth();

    const newErrors = {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: ""
    }

    const validate = (fields) => {

        const nameRegex = /^[A-Za-z]{2,30}$/
        const phone = /(?:\+48)?[\s-]?(\d{3})[\s-]?(\d{3})[\s-]?(\d{3})/
        const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const password = /^(?=.*[A-Za-z].*[A-Za-z].*[A-Za-z].*[A-Za-z].*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/


        setErrors(newErrors)

        if (nameRegex.test(fields.firstName) === false) {
            newErrors.firstName = "jest problem"
        }
        if (nameRegex.test(fields.lastName) === false) {
            newErrors.lastName = "jest problem"
        }
        if (phone.test(fields.phone) === false) {
            newErrors.phone = "jest problem"
        }
        if (email.test(fields.email) === false) {
            newErrors.email = "jest problem"
        }
        if (password.test(fields.password) === false) {
            newErrors.password = "jest problem"
        }

        setErrors(newErrors)

    }

    const register = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const firstName = form.get("name");
        const lastName = form.get("lastName");
        const phone = form.get("phone");
        const email = form.get("email");
        const password = form.get("password");
        validate({
            firstName,
            lastName,
            phone,
            email,
            password
        });
        //console.log("validate errors: ", newErrors.firstName, newErrors.lastName, newErrors.phone, newErrors.email, newErrors.password)


        //console.log("warunek:", (Boolean(errors.firstName || errors.lastName || errors.phone || errors.email || errors.password) === false))
        // console.log("warunek: ",
        //     !(
        //         newErrors.firstName ||
        //         newErrors.lastName ||
        //         newErrors.phone ||
        //         newErrors.email ||
        //         newErrors.password
        //     ))
        if (!(
            newErrors.firstName ||
            newErrors.lastName ||
            newErrors.phone ||
            newErrors.email ||
            newErrors.password
        )) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((authUser) => {
                    updateProfile(authUser.user, {
                        displayName: firstName + ' ' + lastName,
                        phoneNumber: phone,
                    });
                    toast.success('Użytkownik został pomyślnie zarejestrowany!', {
                        hideProgressBar: true
                    });
                    addDoc(collection(db, "users"), { firstName, lastName, phone, email, id: authUser.user.uid });
                })
        }

    }
    return (
        <div className={styles.registerModule}>
            <div className={styles.registerForm}>
                <h1 className={styles.welcomeTitle}>Witaj w <span className={styles.fourTino}>4TINO</span></h1>
                <p className={styles.loginLink}>Masz już konto? <Link className={styles.link} to="/login">Zaloguj się</Link></p>
                <div className={styles.registerTitle}>Rejestracja</div>
                <form className={styles.form} onSubmit={register}>
                    <input type="text" name="name" placeholder="Imię" required className={Boolean(errors.firstName) ? styles.fieldError : null} />
                    <input type="text" name="lastName" placeholder="Nazwisko" required className={Boolean(errors.lastName) ? styles.fieldError : null} />
                    <input type="tel" name="phone" placeholder="Telefon" required className={Boolean(errors.phone) ? styles.fieldError : null} />
                    <input type="email" name="email" placeholder="Adres email: example@gmail.com" required className={Boolean(errors.email) ? styles.fieldError : null} />
                    <input type="password" name="password" placeholder="Hasło" required className={Boolean(errors.password) ? styles.fieldError : null} />
                    <button className={styles.button} type="submit">Zarejestruj</button>
                </form>
            </div>
        </div>
    );
}

export default Register;