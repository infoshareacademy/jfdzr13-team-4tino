import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../CustomerDashboard/CustomerDashboard.module.css';

const CustomerDashboard = () => {

  return (
    <div className={styles.container}>

      <div className={styles.panel}>
        <Link to="/user/orders" className={styles.link}>
          <p>Zamówienia</p>
        </Link>

        <Link to="/user/data" className={styles.link}>
          <p>Edytuj dane</p>
        </Link>


      </div>

      <div className={styles.main}>
        <h1>Witaj Janusz 😊</h1>
        <p>Cieszymy się, że z nami jesteś i pomagasz nam zmieniać świat na lepsze!</p>
        <p>🌳 🌳 🌳 </p>
        <div>
          <OrderTable data={data} />
        </div>
      </div>

    </div>
  );
};

export default CustomerDashboard;