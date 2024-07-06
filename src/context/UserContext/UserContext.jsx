import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore, onSnapshot } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase.js";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    const db = getFirestore();
    let unsubscribeUserDoc;

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setLoadingState(true);
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);

        // Set up a real-time listener for changes in the user document
        unsubscribeUserDoc = onSnapshot(userDocRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            setUser({ ...currentUser, ...docSnapshot.data() });
          } else {
            setUser(currentUser);
          }
          setLoadingState(false);
        });
      } else {
        setUser({});
        setLoadingState(false);
      }
    });

    // Cleanup the onSnapshot listener when the component unmounts
    return () => {
      if (unsubscribeUserDoc) {
        unsubscribeUserDoc();
      }
      unsubscribeAuth();
    };
  }, []);

  const reloadUser = async () => {
    setLoadingState(true);
    const currentUser = auth.currentUser;
    if (currentUser) {
      const db = getFirestore();
      const userDoc = await getDoc(doc(db, "users", currentUser.uid));
      if (userDoc.exists()) {
        setUser({ ...currentUser, ...userDoc.data() });
      } else {
        setUser(currentUser);
      }
    }
    setLoadingState(false);
  };

  if (loadingState) {
    return null; // Możesz tutaj wstawić komponent ładowania
  }

  const resetUser = () => {
    setUser({});
  };

  return (
    <UserContext.Provider value={{ user, resetUser, reloadUser }}>
      {children}
    </UserContext.Provider>
  );
};