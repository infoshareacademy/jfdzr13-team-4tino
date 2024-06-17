import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import styles from '../CustomerDashboard/CustomerDashboard.module.css';
import OrderTable from './CustomerOrders/OrderTable/OrderTable';

//   return (
//     <table className={styles.customTable}>
//       <thead>
//         <tr>
//           <th>Numer zamówienia</th>
//           <th>Rodzaj zamówienia</th>
//           <th>Cena</th>
//           <th>Stan realizacji</th>
//           <th>Usuń</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((row) => (
//           <tr key={row.id}>
//             <td>{row.id}</td>
//             <td>{row.orderType}</td>
//             <td>{row.price}</td>
//             <td>{row.status}</td>
//             <td>{row.delete}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default OrderTable;

const CustomerDashboard = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'orders'));
        const ordersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setData(ordersData);
      } catch (error) {
        console.error('Error fetching orders: ', error);
      }
    };

    fetchOrders();
  }, []);

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

        <h2>Twoje zamówienia:</h2>

        <div>
          <OrderTable data={data} />
        </div>

      </div>
    </div>
  );
};

export default CustomerDashboard;