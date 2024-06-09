// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiWFFyJsuRygOMasakt2Tn60RRnXJfm-8",
  authDomain: "fourtino2024.firebaseapp.com",
  projectId: "fourtino2024",
  storageBucket: "fourtino2024.appspot.com",
  messagingSenderId: "508480827908",
  appId: "1:508480827908:web:9cdcc2e8b48d1172d1bb51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);