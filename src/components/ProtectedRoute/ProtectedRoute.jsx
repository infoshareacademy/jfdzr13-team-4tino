import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext/UserContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useUser();

    if (!user) {
        // Użytkownik nie jest zalogowany
        return <Navigate to="/login" />;
    }
    if (user.email === 'admin@admin.com') {
        // Użytkownik jest administratorem
        return children;
    } else {
        // Użytkownik nie jest administratorem
        return <Navigate to="/" />;
    }
};

export default ProtectedRoute;
