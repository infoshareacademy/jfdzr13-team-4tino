import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext/UserContext';

const UserProtectedRoute = ({ children }) => {
    const { user } = useUser();

    if (user.email != 'admin@admin.com') {
        // Użytkownik nie jest administratorem
        return children;
    }
    if (!user) {
        // Użytkownik nie jest zalogowany
        return <Navigate to="/login" />;
    }
    else {
        // Użytkownik jest administratorem
        return <Navigate to="/admin" />;
    }
};

export default UserProtectedRoute;
