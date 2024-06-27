import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext/UserContext';
import { TERipple } from "tw-elements-react";

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
        <TERipple rippleColor="light">
        <button
            type="button"
            onClick={handleLogout}
            className={`buttonCss blok px-6 py-3 text-base font-semibold leading-normal text-white transition duration-150 ease-in-out bg-custom-green hover:bg-custom-green-hover focus:bg-custom-green-hover focus:outline-none focus:ring-0 active:bg-custom-green-active m-5`}
        >
            Wyloguj się
        </button>
        </TERipple>
    );
};

export default Logout;