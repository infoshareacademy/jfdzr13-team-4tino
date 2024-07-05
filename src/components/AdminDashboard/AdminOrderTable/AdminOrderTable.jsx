import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUser } from "../../../context/UserContext/UserContext";
import { db } from "../../../firebase";
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
    const [sortConfig, setSortConfig] = useState({ key: 'time', direction: 'descending' });

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                if (!user) return;

                const ordersRef = collection(db, "orders");
                const q = query(ordersRef);
                const querySnapshot = await getDocs(q);

                const ordersList = await Promise.all(querySnapshot.docs.map(async (doc) => {
                    const orderData = doc.data();
                    const userRef = collection(db, "users");
                    const userQuery = query(userRef, where("email", "==", orderData.email));
                    const userSnapshot = await getDocs(userQuery);
                    const userData = userSnapshot.docs[0]?.data();

                    return {
                        id: doc.id, // Zapisz id dokumentu, ale użyj właściwego pola orderId dla numeru zamówienia
                        orderId: orderData.orderId,
                        time: orderData.date ? orderData.date.toDate() : "Error fetching date",
                        status: orderData.status,
                        price: orderData.price,
                        tree: orderData.tree,
                        tablet: orderData.tablet,
                        dedication: orderData.dedication,
                        location: orderData.location,
                        email: orderData.email,
                        firstName: userData?.firstName || "Unknown",
                        lastName: userData?.lastName || "Unknown",
                        payment: orderData.payment
                    };
                }));

                setOrders(ordersList);
            } catch (error) {
                console.error("Error fetching orders", error);
            }
        };

        fetchOrders();
    }, [user]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            const orderDoc = doc(db, "orders", id);
            const newPaymentStatus = newStatus === "anulowane przez Klienta" ? "zwrócona" : undefined;
            const updateData = { status: newStatus };
            if (newPaymentStatus) {
                updateData.payment = newPaymentStatus;
            }
            await updateDoc(orderDoc, updateData);
            setOrders(prevOrders => prevOrders.map(order => order.id === id ? { ...order, status: newStatus, payment: newPaymentStatus || order.payment } : order));
            console.log("Order status successfully updated!");
            toast.success('Status pomyślnie zmieniony', {
                hideProgressBar: true,
                autoClose: 3000,
                style: { marginTop: '120px' }
            });
        } catch (error) {
            console.error("Error updating order status:", error);
            toast.error('Błąd zmiany statusu', {
                hideProgressBar: true,
                autoClose: 3000,
                style: { marginTop: '120px' }
            });
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "orders", id));
            setOrders(prevOrders => prevOrders.filter(order => order.id !== id));
            console.log("Order successfully deleted!");
            toast.warning('Zamówienie usunięte!', {
                hideProgressBar: true,
                autoClose: 3000,
                style: { marginTop: '120px' }
            });
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    };

    const sortData = (orders, config) => {
        return [...orders].sort((a, b) => {
            if (a[config.key] < b[config.key]) {
                return config.direction === 'ascending' ? -1 : 1;
            }
            if (a[config.key] > b[config.key]) {
                return config.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedOrders = sortData(orders, sortConfig);

    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? '▲' : '▼';
        }
        return '';
    };

    const statuses = ["przyjęto do realizacji", "w trakcie realizacji", "zrealizowano", "anulowane przez Klienta"];

    return (
        <div>
            <table className={styles.orderTable}>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('orderId')}>
                            Nr zamówienia {getSortIcon('orderId')}
                        </th>
                        <th onClick={() => handleSort('time')}>
                            Data złożenia zamówienia {getSortIcon('time')}
                        </th>
                        <th>Stan realizacji</th>
                        <th onClick={() => handleSort('price')}>
                            Cena {getSortIcon('price')}
                        </th>
                        <th>Drzewo</th>
                        <th>Tabliczka</th>
                        <th>Dedykacja</th>
                        <th>Lokalizacja</th>
                        <th>Email</th>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Płatność</th>
                        <th>Anuluj</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedOrders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.orderId}</td>{/* Używamy orderId z danych dokumentu */}
                            <td>
                                {order.time instanceof Date
                                    ? formatDate(order.time)
                                    : order.time}
                            </td>
                            <td>
                                <select
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                    className={`${styles.statusDropdown} ${order.status === "anulowane przez Klienta" ? styles.disabled : ""}`}
                                    disabled={order.status === "anulowane przez Klienta"}
                                >
                                    {statuses.map((status) => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </td>
                            <td>{order.price} zł</td>
                            <td>{order.tree}</td>
                            <td>{order.tablet}</td>
                            <td>{order.dedication}</td>
                            <td>{order.location}</td>
                            <td>{order.email}</td>
                            <td>{order.firstName}</td>
                            <td>{order.lastName}</td>
                            <td>{order.payment}</td>
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