import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../../firebase.js';

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loadingState, setLoadingState] = useState(true)

    useEffect(() => {
        setLoadingState(true)
        const login = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoadingState(false)
        });
        return login
    }, []);

    if (loadingState) {
        return
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