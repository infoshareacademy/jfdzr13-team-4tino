import {
  collection,
  doc,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useUser } from "../../../context/UserContext/UserContext";
import { db } from "../../../firebase";
import {
  Ripple,
  Tooltip,
  initTWE,
} from "tw-elements";
import '../../../tailwind.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
          onUpdateLatestOrderDate(ordersList[0].time);
        }

        setOrders(ordersList);
      } catch (error) {
        console.error("Błąd pobierania zamówień", error);
      }
    };

    fetchOrders();
  }, [user, onUpdateLatestOrderDate]);

  useEffect(() => {
    initTWE({ Ripple, Tooltip});
  }, []);

  const handleCancelOrder = async (id) => {
    try {
      const orderRef = doc(db, "orders", id);
      await updateDoc(orderRef, {
        status: "anulowane przez Klienta",
      });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id
            ? { ...order, status: "anulowane przez Klienta" }
            : order
        )
      );

      toast.success("Zgłoszono anulację zamówienia. Czekaj na potwierdzenie anulacji.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeButton: false,
        style: {
          marginTop: "200px",
        },
      });

      console.log("Zamówienie zostało pomyślnie anulowane!");
    } catch (error) {
      console.error("Błąd podczas anulowania zamówienia:", error);
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
                {order.status === "przyjęto do realizacji" && (
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    className={styles.cancelButton}
                  >
                    X
                  </button>
                )}
                {order.status === "anulowane przez Klienta" && (
                  <a
                    class="inline-block rounded-full bg-symbol-green px-3 py-1 pb-1 pt-1 text-s font-bold leading-normal text-gray-700 transition duration-150 ease-in-out hover:bg-gray-200 ml-2"
                    data-twe-toggle="tooltip"
                    data-twe-placement="top"
                    data-twe-ripple-init
                    data-twe-ripple-color="light"
                    title="Zgłoszono anulację zamówienia. Czekaj na potwierdzenie anulacji."
                  >
                    ?
                  </a>
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




// import { collection, doc, getDocs, query, where, updateDoc } from "firebase/firestore";
// import React, { useEffect, useState } from "react";
// import { useUser } from "../../../context/UserContext/UserContext";
// import { db } from "../../../firebase";
// import styles from "./OrderTable.module.css";
// import { toast } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";

// const formatDate = (date) => {
//   const options = {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   };
//   return date.toLocaleDateString(undefined, options);
// };

// const OrderTable = ({ onUpdateLatestOrderDate }) => {
//   const { user } = useUser();
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         if (!user) return;

//         const ordersRef = collection(db, "orders");
//         const q = query(ordersRef, where("email", "==", user.email));
//         const querySnapshot = await getDocs(q);

//         const ordersList = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           orderId: doc.data().orderId,
//           time: doc.data().date ? doc.data().date.toDate() : null,
//           status: doc.data().status,
//           price: doc.data().price,
//           tree: doc.data().tree,
//           tablet: doc.data().tablet,
//           dedication: doc.data().dedication,
//           location: doc.data().location,
//         }));

//         ordersList.sort((a, b) => b.time - a.time);

//         if (ordersList.length > 0) {
//           onUpdateLatestOrderDate(ordersList[0].time); // Aktualizacja daty ostatniego zamówienia
//         }

//         setOrders(ordersList);
//       } catch (error) {
//         console.error("Błąd pobierania zamówień", error);
//       }
//     };

//     fetchOrders();
//   }, [user, onUpdateLatestOrderDate]);

//   const handleCancelOrder = async (id) => {
//     try {
//       const orderRef = doc(db, "orders", id);
//       await updateDoc(orderRef, {
//         status: "anulowane przez Klienta",
//       });

//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order.id === id ? { ...order, status: "anulowane przez Klienta" } : order
//         )
//       );

//       toast.success("Zgłoszono anulację zamówienia. Czekaj na potwierdzenie anulacji.",
//       {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: true,
//         closeButton: false,
//         style: {
//           marginTop: "200px"
//         }
//       });

//       console.log("Zamówienie zostało pomyślnie anulowane!");
//     } catch (error) {
//       console.error("Błąd podczas anulowania zamówienia:", error);
//     }
//   };

//   return (
//     <div>
//       <table className={styles.orderTable}>
//         <thead>
//           <tr>
//             <th>Nr zamówienia</th>
//             <th>Data złożenia zamówienia</th>
//             <th>Stan realizacji</th>
//             <th>Cena</th>
//             <th>Drzewo</th>
//             <th>Tabliczka</th>
//             <th>Dedykacja</th>
//             <th>Lokalizacja</th>
//             <th>Anuluj</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order) => (
//             <tr key={order.id}>
//               <td>{order.orderId}</td>
//               <td>
//                 {order.time instanceof Date
//                   ? formatDate(order.time)
//                   : "Błąd podczas pobierania daty"}
//               </td>
//               <td>{order.status}</td>
//               <td>{order.price} zł</td>
//               <td>{order.tree}</td>
//               <td>{order.tablet}</td>
//               <td>{order.dedication}</td>
//               <td>{order.location}</td>
//               <td>
//                 {order.status === "przyjęto do realizacji" && ( // Warunek sprawdzający status
//                   <button
//                     onClick={() => handleCancelOrder(order.id)}
//                     className={styles.cancelButton}
//                   >
//                     X
//                   </button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default OrderTable;
