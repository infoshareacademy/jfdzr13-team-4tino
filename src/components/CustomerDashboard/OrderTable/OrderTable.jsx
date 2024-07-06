import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../../../context/UserContext/UserContext";
import { db } from "../../../firebase";
import '../../../tailwind.css';
import Tooltip from '../Tooltip';
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
          payment: doc.data().payment,
        }));
        ordersList.sort((a, b) => b.time - a.time);
        if (ordersList.length > 0) {
          onUpdateLatestOrderDate(ordersList[0].time);
        }
        setOrders(ordersList);
      } catch (error) {
        console.error("Błąd pobierania zamówień", error);
      }
    };
    fetchOrders();
  }, [user, onUpdateLatestOrderDate]);
  const handleCancelOrder = async (id) => {
    try {
      const orderRef = doc(db, "orders", id);
      await updateDoc(orderRef, {
        payment: "zwrócona",
        status: "anulowane przez Klienta",
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id
            ? { ...order, payment: "zwrócona", status: "anulowane przez Klienta" }
            : order
        )
      );
      toast.success("Zgłoszono anulację zamówienia. Płatność zostanie zwrócona do 14 dni.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeButton: false,
        style: {
          marginTop: "120px",
        },
      });
      console.log("Zamówienie zostało pomyślnie anulowane!");
    } catch (error) {
      console.error("Błąd podczas anulowania zamówienia:", error);
    }
  };
  return (
    <div className={styles.tableContainer}>
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
            <th>Płatność</th>
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
              <td>{order.payment}</td>
              <td>
                {order.status === "przyjęto do realizacji" && (
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    className={styles.cancelButton}
                  >
                    X
                  </button>
                )}
                {order.status === "anulowane przez Klienta" && (
                  <Tooltip message="Zgłoszono anulację zamówienia. Czekaj na potwierdzenie anulacji."
                    position="left">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-full bg-white text-black h-8 w-8 text-center text-sm font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 ml-1"
                    >
                      ?
                    </button>
                  </Tooltip>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default OrderTable;