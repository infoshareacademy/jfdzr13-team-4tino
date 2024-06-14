import React, { useEffect, useState } from 'react';
import styles from '../CustomerOrders/CustomerOrders.module.css';
import { Link } from 'react-router-dom';
import OrderTable from './OrderTable/OrderTable';
import { db } from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import CountDownTimer from './CountDownTimer/CountDownTimer';

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

    return (
    <div className={styles.container}>
        <div className={styles.panel}>
        <Link to="/dashboard/customerOrders" className={styles.link}>
            <p className={styles.orderText}>Zamówienia</p>
        </Link>
        <Link to="/dashboard/customerDataEdit" className={styles.link}>
            <p>Edytuj dane</p>
        </Link>
        </div>
        <div className={styles.main}>
        <h1>Zamówienia</h1>
        <p>🌳 🌳 🌳 </p>
        <div>
            <OrderTable data={data} />
        </div>

        <div>
            <CountDownTimer />
        </div>
        </div>
    </div>
    );
};

export default CustomerOrders;
