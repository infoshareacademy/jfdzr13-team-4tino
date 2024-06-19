import { collection, getDocs } from 'firebase/firestore';
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
