import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../../firebase';
import styles from '../CustomerOrders/CustomerOrders.module.css';
import CountDownTimer from './CountDownTimer/CountDownTimer';
import OrderTable from './OrderTable/OrderTable';

const CustomerOrders = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, 'orders'));
            const dataList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setData(dataList);
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        console.log('handleDelete called with id:', id);
        try {
            // Usuń dokument z Firestore
            await deleteDoc(doc(db, 'orders', id));
            console.log('Document successfully deleted');
            // Aktualizuj stan, usuwając zamówienie z lokalnych danych
            setData(data.filter(order => order.id !== id));
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.panel}>
                <Link to="/user/orders" className={styles.link}>
                    <p className={styles.orderText}>Zamówienia</p>
                </Link>
                <Link to="/user/data" className={styles.link}>
                    <p className={styles.dataText}>Edytuj dane</p>
                </Link>
            </div>
            <div className={styles.main}>
                <h2 className={styles.h2}>Zamówienia</h2>
                <div>
                    <OrderTable data={data} onDelete={handleDelete} />
                </div>
                <div>
                    <CountDownTimer />
                </div>
            </div>
        </div>
    );
};

export default CustomerOrders;
