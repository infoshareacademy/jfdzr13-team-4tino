import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext/UserContext';

const Logout = () => {
    const navigate = useNavigate();
    const { resetUser } = useUser();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            resetUser();
            toast.success('Wylogowano pomyślnie', {
                hideProgressBar: true,
                autoClose: 1000
            });
            navigate('/');
        } catch (error) {
            toast.error('Błąd podczas wylogowywania', {
                hideProgressBar: true,
                autoClose: 1000
            });
        }
    };

    return (
        <button onClick={handleLogout}>
            Wyloguj się
        </button>
    );
};

export default Logout;