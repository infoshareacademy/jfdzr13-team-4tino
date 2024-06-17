// Importowanie funkcji SDK Firebase, których potrzebujesz
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react'; // Importowanie useState i useEffect z React

// Konfiguracja Twojej aplikacji Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDiWFFyJsuRygOMasakt2Tn60RRnXJfm-8",
  authDomain: "fourtino2024.firebaseapp.com",
  projectId: "fourtino2024",
  storageBucket: "fourtino2024.appspot.com",
  messagingSenderId: "508480827908",
  appId: "1:508480827908:web:9cdcc2e8b48d1172d1bb51"
};

// Inicjalizacja aplikacji Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Uzyskanie instancji Firestore
const db = getFirestore(firebaseApp);

// Uzyskanie instancji autoryzacji
const auth = getAuth(firebaseApp);

// Hook useAuth reagujący na zmiany stanu autoryzacji
export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return { currentUser };
};

// Eksportowanie instancji autoryzacji oraz aplikacji Firebase
export { auth, db, firebaseApp }; // Dodanie eksportu db

