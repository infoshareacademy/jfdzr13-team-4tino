import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext/UserContext';



const UserDashboard = () => {
    const navigate = useNavigate();
    const { user } = useUser(); // Pobierz usera z kontekstu

    useEffect(() => {
        // Przekierowujemy na /admin, jeśli użytkownik jest już zalogowany i jest administratorem, jeśli nie, na homepage
        if (user) {
            if (user.email === 'admin@admin.com') {
                navigate('/admin');
            } else {
                navigate('/user');
            }
        } else {
            navigate('/login');
        }
    }, [user, navigate]);


    return (
        <p1>UserDashboard</p1>
    )
}

export default UserDashboard