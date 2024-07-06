import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../firebase';
import CountDownTimer from './CountDownTimer/CountDownTimer';
import styles from './CustomerDashboard.module.css';
import OrderTable from './OrderTable/OrderTable';

const CustomerDashboard = () => {
  const { currentUser } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [latestOrderDate, setLatestOrderDate] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          setFirstName(currentUser.displayName || 'User');
        } catch (error) {
          console.error('Błąd pobierania danych użytkownika: ', error);
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <Link to="/user" className={styles.link}>
          <p className={styles.orderText}>Zamówienia</p>
        </Link>
        <Link to="/user/data" className={styles.link}>
          <p className={styles.dataText}>Edytuj&nbsp;dane</p>
        </Link>
      </div>
      <div className={styles.main}>
        <h1 className={styles.h1}>Witaj {firstName} 😊</h1>
        <p>Cieszymy się, że z nami jesteś i&nbsp;pomagasz nam zmieniać świat na&nbsp;lepsze!</p>
        <div className={styles.timer}>
          {/* Przekazanie latestOrderDate i setLatestOrderDate do OrderTable */}
          <CountDownTimer latestOrderDate={latestOrderDate} />
        </div>
        <h2 className={styles.h2}>Zamówienia</h2>
        <div>
          {/* Przekazanie onUpdateLatestOrderDate do OrderTable */}
          <OrderTable onUpdateLatestOrderDate={setLatestOrderDate} />
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
