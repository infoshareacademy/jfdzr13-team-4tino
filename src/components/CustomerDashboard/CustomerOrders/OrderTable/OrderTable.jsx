import React, { useEffect, useState } from "react";
import styles from "./OrderTable.module.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useUser } from "../../../../context/UserContext/UserContext";

const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
    // optionally, you can add time ^
  };
  return date.toLocaleDateString(undefined, options);
};

const OrderTable = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("email", "==", user.email));
        const querySnapshot = await getDocs(q);

        const ordersList = querySnapshot.docs.map((doc) => ({
          orderId: doc.data().orderId, // assuming orderId is correctly stored in Firestore
          time: doc.data().date
            ? doc.data().date.toDate()
            : "Error fetching date",
          status: doc.data().status,
          price: doc.data().price,
          tree: doc.data().tree,
          tablet: doc.data().tablet,
          dedication: doc.data().dedication,
          location: doc.data().location,
        }));

        setOrders(ordersList);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  return (
    <div>
      <table className={styles.orderTable}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Time</th>
            <th>Status</th>
            <th>Price</th>
            <th>Tree</th>
            <th>Tablet</th>
            <th>Dedication</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>
                {order.time instanceof Date
                  ? formatDate(order.time)
                  : order.time}
              </td>
              <td>{order.status}</td>
              <td>{order.price} zł</td>
              <td>{order.tree}</td>
              <td>{order.tablet}</td>
              <td>{order.dedication}</td>
              <td>{order.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
