import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { TERipple } from "tw-elements-react";
import { db } from "../../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import "../../../tailwind.css";
import styles from "../CustomerDataEdit/CustomerDataEdit.module.css";

const CustomerDataEdit = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(user ? user.email : "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setFirstName(userData.firstName);
            setLastName(userData.lastName);
            setPhone(userData.phone);
            setEmail(userData.email);
          } else {
            console.error("No user data found");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error(
            `Wystąpił problem podczas pobierania danych użytkownika: ${error.message}`,
            { hideProgressBar: true, style: { marginTop: "120px" } }
          );
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
      confirmPassword: "",
    };

    const nameRegex = /^[A-Z][a-z]{1,29}$/;
    const phoneRegex = /(?:\+48)?[\s-]?(\d{3})[\s-]?(\d{3})[\s-]?(\d{3})/;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!nameRegex.test(fields.firstName)) {
      newErrors.firstName = " ";
      toast.error("Nieprawidłowe Imię", {
        hideProgressBar: true,
        style: { marginTop: "120px" },
      });
    }
    if (!nameRegex.test(fields.lastName)) {
      newErrors.lastName = " ";
      toast.error("Nieprawidłowe Nazwisko", {
        hideProgressBar: true,
        style: { marginTop: "120px" },
      });
    }
    if (!phoneRegex.test(fields.phone)) {
      newErrors.phone = " ";
      toast.error("Nieprawidłowy numer telefonu", {
        hideProgressBar: true,
        style: { marginTop: "120px" },
      });
    }

    setErrors(newErrors);
    return newErrors;
  };

  const updateUserData = async (e) => {
    e.preventDefault();

    const newErrors = validate({ firstName, lastName, phone });
    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          firstName,
          lastName,
          phone,
          email,
        },
        { merge: true }
      );

      toast.success("Dane użytkownika zostały zaktualizowane", {
        hideProgressBar: true,
        style: { marginTop: "120px" },
      });

      if (newPassword) {
        if (newPassword !== confirmPassword) {
          toast.error("Hasła nie pasują do siebie", {
            hideProgressBar: true,
            style: { marginTop: "120px" },
          });
          return;
        }

        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword
        );
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);

        toast.success("Hasło zostało zaktualizowane", {
          hideProgressBar: true,
          style: { marginTop: "120px" },
        });
      }
    } catch (error) {
      toast.error(`Aktualizacja danych nie powiodła się: ${error.message}`, {
        hideProgressBar: true,
        style: { marginTop: "120px" },
      });
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
          <form className={styles.form} onSubmit={updateUserData}>
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
                {errors.firstName && (
                  <p className={styles.errorText}>{errors.firstName}</p>
                )}
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
                {errors.lastName && (
                  <p className={styles.errorText}>{errors.lastName}</p>
                )}
              </div>
              <div className={styles.inputType}>
                <p>Telefon</p>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Telefon"
                  required
                  className={`${errors.phone ? styles.fieldError : null}`}
                />
                {errors.phone && (
                  <p className={styles.errorText}>{errors.phone}</p>
                )}
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
                {errors.currentPassword && (
                  <p className={styles.errorText}>{errors.currentPassword}</p>
                )}
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
                {errors.newPassword && (
                  <p className={styles.errorText}>{errors.newPassword}</p>
                )}
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
                {errors.confirmPassword && (
                  <p className={styles.errorText}>{errors.confirmPassword}</p>
                )}
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
