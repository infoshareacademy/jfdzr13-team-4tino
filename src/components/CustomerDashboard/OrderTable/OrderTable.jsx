import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useUser } from "../../.././context/UserContext/UserContext";
import { db } from "../../.././firebase";
import styles from "./OrderTable.module.css";

const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString(undefined, options);
};

const OrderTable = ({ onUpdateLatestOrderDate }) => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user) return;

        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("email", "==", user.email));
        const querySnapshot = await getDocs(q);

        const ordersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          orderId: doc.data().orderId,
          time: doc.data().date ? doc.data().date.toDate() : null,
          status: doc.data().status,
          price: doc.data().price,
          tree: doc.data().tree,
          tablet: doc.data().tablet,
          dedication: doc.data().dedication,
          location: doc.data().location,
        }));

        ordersList.sort((a, b) => b.time - a.time);

        if (ordersList.length > 0) {
          onUpdateLatestOrderDate(ordersList[0].time); // Aktualizacja daty ostatniego zamówienia
        }

        setOrders(ordersList);
      } catch (error) {
        console.error("Błąd pobierania zamówień", error);
      }
    };

    fetchOrders();
  }, [user, onUpdateLatestOrderDate]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "orders", id));
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
      console.log("Zamówienie zostało pomyślnie usunięte!");
    } catch (error) {
      console.error("Błąd podczas usuwania zamówienia:", error);
    }
  };

  return (
    <div>
      <table className={styles.orderTable}>
        <thead>
          <tr>
            <th>Nr zamówienia</th>
            <th>Data złożenia zamówienia</th>
            <th>Stan realizacji</th>
            <th>Cena</th>
            <th>Drzewo</th>
            <th>Tabliczka</th>
            <th>Dedykacja</th>
            <th>Lokalizacja</th>
            <th>Anuluj</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.orderId}</td>
              <td>
                {order.time instanceof Date
                  ? formatDate(order.time)
                  : "Błąd podczas pobierania daty"}
              </td>
              <td>{order.status}</td>
              <td>{order.price} zł</td>
              <td>{order.tree}</td>
              <td>{order.tablet}</td>
              <td>{order.dedication}</td>
              <td>{order.location}</td>
              <td>
                <button
                  onClick={() => handleDelete(order.id)}
                  className={styles.deleteButton}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;