import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../../firebase.js';  // Upewnij się, że `db` jest poprawnie zaimportowane

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loadingState, setLoadingState] = useState(true);

    useEffect(() => {
        setLoadingState(true);
        const login = onAuthStateChanged(auth, async (authUser) => {
            if (authUser) {
                const userDoc = await getDoc(doc(db, 'users', authUser.uid));
                if (userDoc.exists()) {
                    setUser({ uid: authUser.uid, ...userDoc.data() });
                } else {
                    setUser(authUser);
                }
            } else {
                setUser(null);
            }
            setLoadingState(false);
        });
        return login;
    }, []);

    if (loadingState) {
        return null;  // Lub wyświetl jakiś komponent ładowania
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

// import { onAuthStateChanged } from 'firebase/auth';
// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { auth } from '../../firebase.js';

// const UserContext = createContext();

// export const useUser = () => {
//     return useContext(UserContext);
// };

// export const UserProvider = ({ children }) => {
//     const [user, setUser] = useState();
//     const [loadingState, setLoadingState] = useState(true)

//     useEffect(() => {
//         setLoadingState(true)
//         const login = onAuthStateChanged(auth, (user) => {
//             setUser(user);
//             setLoadingState(false)
//         });
//         return login
//     }, []);

//     if (loadingState) {
//         return
//     }

//     const resetUser = () => {
//         setUser(null);
//     };

//     return (
//         <UserContext.Provider value={{ user, resetUser }}>
//             {children}
//         </UserContext.Provider>
//     );
// };