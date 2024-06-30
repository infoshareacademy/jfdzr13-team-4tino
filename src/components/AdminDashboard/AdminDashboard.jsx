import { collection, deleteDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db, useAuth } from '../../firebase';
import styles from './AdminDashboard.module.css';
import AdminOrderTable from './AdminOrderTable/AdminOrderTable';


const AdminDashboard = () => {
    const { currentUser } = useAuth();
    const [data, setData] = useState([]);
    const [firstName, setFirstName] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            if (currentUser) {
                try {
                    const docRef = doc(db, 'users', currentUser.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        console.log('Dane użytkownika:', userData);
                        setFirstName(userData.firstName);
                    } else {
                        console.log('Dane użytkownika nie znalezione');
                    }
                } catch (error) {
                    console.error('Błąd pobierania danych użytkownika: ', error);
                }
            }
        };

        const fetchOrders = async () => {
            if (currentUser) {
                try {
                    const q = query(collection(db, 'orders'));
                    const querySnapshot = await getDocs(q);
                    const ordersData = querySnapshot.docs.map(doc => ({
                        // id: doc.id,
                        ...doc.data()
                    }));
                    console.log('Pobrane zamówienia:', ordersData);
                    setData(ordersData);
                } catch (error) {
                    console.error('Błąd pobierania zamówień: ', error);
                }
            }
        };

        fetchUserData();
        fetchOrders();
    }, [currentUser]);

    const handleDelete = async (id) => {
        console.log('handleDelete called with id:', id);
        try {
            await deleteDoc(doc(db, 'orders', id));
            console.log('Document successfully deleted');
            setData(data.filter(order => order.id !== id));
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.panel}>
                <Link to="/admin" className={styles.link}>
                    <p className={styles.orderText}>Zamówienia</p>
                </Link>
            </div>
            <div className={styles.main}>
                <h1 className={styles.h1}>Witaj {firstName} 😊</h1>
                <p>Sprawdź jak idzie nam zmiana planety na lepsze!</p>
                <h2 className={styles.h2}>Wszystkie zamówienia</h2>
                <div>
                    <AdminOrderTable data={data} onDelete={handleDelete} />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
