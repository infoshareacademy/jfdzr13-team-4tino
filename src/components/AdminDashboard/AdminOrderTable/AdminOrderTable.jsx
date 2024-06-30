import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useUser } from "../../.././context/UserContext/UserContext";
import { db } from "../../.././firebase";
import styles from "./AdminOrderTable.module.css";

const formatDate = (date) => {
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
};

const AdminOrderTable = () => {
    const { user } = useUser();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                if (!user) return;

                const ordersRef = collection(db, "orders");
                const q = query(ordersRef);
                const querySnapshot = await getDocs(q);

                const ordersList = querySnapshot.docs.map((doc) => ({
                    id: doc.id, // Zapisz id dokumentu, ale użyj właściwego pola orderId dla numeru zamówienia
                    orderId: doc.data().orderId,
                    time: doc.data().date ? doc.data().date.toDate() : "Error fetching date",
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

        fetchOrders();
    }, [user]);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "orders", id));
            setOrders(prevOrders => prevOrders.filter(order => order.id !== id));
            console.log("Order successfully deleted!");
        } catch (error) {
            console.error("Error deleting order:", error);
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
                            <td>{order.orderId}</td> {/* Używamy orderId z danych dokumentu */}
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
                            <td>
                                <button
                                    onClick={() => handleDelete(order.id)} // Używamy id dokumentu do usunięcia
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

export default AdminOrderTable;
