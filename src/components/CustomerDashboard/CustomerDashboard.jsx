import { collection, doc, getDoc, getDocs } from 'firebase/firestore'; // Importowanie funkcji Firestore
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db, useAuth } from '../../firebase'; // Importowanie hooka autoryzacji oraz instancji Firebase
import styles from './CustomerDashboard.module.css';
import OrderTable from './CustomerOrders/OrderTable/OrderTable';

const CustomerDashboard = () => {
  const { currentUser } = useAuth(); // Hook autoryzacji do pobrania danych zalogowanego użytkownika
  const [firstName, setFirstName] = useState(''); // Stan na imię użytkownika
  const [data, setData] = useState([]); // Stan na dane zamówień użytkownika

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const docRef = doc(db, 'users', currentUser.uid); // Referencja do dokumentu użytkownika w Firestore
          const docSnap = await getDoc(docRef); // Pobranie danych dokumentu

          if (docSnap.exists()) {
            const userData = docSnap.data(); // Dane użytkownika
            setFirstName(userData.firstName); // Ustawienie firstName na podstawie danych z Firestore
          } else {
            console.log('Dane użytkownika nie znalezione');
          }
        } catch (error) {
          console.error('Błąd pobierania danych użytkownika: ', error);
        }
      }
    };

    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'orders'));
        const ordersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setData(ordersData); // Ustawienie danych zamówień
      } catch (error) {
        console.error('Błąd pobierania zamówień: ', error);
      }
    };

    fetchUserData();
    fetchOrders();
  }, [currentUser]); // Dodanie currentUser do zależności useEffect, aby fetchUserData wywołało się ponownie po zalogowaniu

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

        <h1>Witaj {firstName} 😊</h1>
        <p>Cieszymy się, że z nami jesteś i pomagasz nam zmieniać świat na lepsze!</p>
        <p>🌳 🌳 🌳 </p>

        <h2>Twoje zamówienia:</h2>

        <div>
          <OrderTable data={data} />
        </div>

      </div>
    </div>
  );
};

export default CustomerDashboard;
