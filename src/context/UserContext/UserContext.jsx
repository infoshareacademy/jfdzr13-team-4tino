import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase.js";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingState, setLoadingState] = useState(true);
  useEffect(() => {
    setLoadingState(true);
    const login = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoadingState(false);
    });
    return login;
  }, []);

  useEffect(() => {
    setLoadingState(true);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUser({ ...user, ...userDoc.data() });
        }
      } else {
        setUser(null);
      }
      setLoadingState(false);
    });
    return unsubscribe;
  }, []);

  if (loadingState) {
    return null; // albo loader :shrug:
  }

  const resetUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, resetUser }}>
      {children}
    </UserContext.Provider>
  );
};
