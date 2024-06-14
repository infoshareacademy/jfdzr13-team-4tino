import React from 'react';
import styles from '../CustomerDashboard/CustomerDashboard.module.css';
import { Link } from 'react-router-dom';

const CustomerDashboard = () => {
  return (
    <div className={styles.container}>

      <div className={styles.panel}>
        <Link to="/dashboard/customerOrders" className={styles.link}>
          <p>Zamówienia</p>
        </Link>

        <Link to="/dashboard/customerDataEdit" className={styles.link}>
          <p>Edytuj dane</p>
        </Link>
        
        
      </div>

      <div className={styles.main}>
        <h1>Witaj Janusz 😊</h1>
        <p>Cieszymy się, że z nami jesteś i pomagasz nam zmieniać świat na lepsze!</p>
        <p>🌳 🌳 🌳 </p>
      </div>

    </div>
  );
};

export default CustomerDashboard;