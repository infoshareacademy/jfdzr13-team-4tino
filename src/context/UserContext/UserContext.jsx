import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../../firebase.js';

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const login = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return login
    }, []);

    const resetUser = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, resetUser }}>
            {children}
        </UserContext.Provider>
    );
};