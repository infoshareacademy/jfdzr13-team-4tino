// import { db } from "../../../firebase";
// import {
//   collection,
//   query,
//   where,
//   orderBy,
//   limit,
//   getDocs,
// } from "firebase/firestore";

// export const getLastOrderDate = async (userEmail) => {
//   const ordersRef = collection(db, "orders");
//   const q = query(
//     ordersRef,
//     where("email", "==", userEmail),
//     orderBy("date", "desc"),
//     limit(1)
//   );

//   const querySnapshot = await getDocs(q);
//   if (!querySnapshot.empty) {
//     const lastOrder = querySnapshot.docs[0].data();
//     return lastOrder.date.toDate();
//   }
//   return null;
// };

import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../firebase";

export const getLastOrderDate = async (userEmail) => {
  try {
    const ordersRef = collection(db, "orders");
    const q = query(
      ordersRef,
      where("email", "==", userEmail),
      orderBy("date", "desc"),
      limit(1)
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const lastOrderDoc = querySnapshot.docs[0];
      const lastOrderData = lastOrderDoc.data();
      const lastOrderDate = lastOrderData.date.toDate(); // Convert Firestore Timestamp to JavaScript Date
      return lastOrderDate;
    } else {
      return null; // No orders found
    }
  } catch (error) {
    console.error("Error fetching last order date:", error);
    throw error;
  }
};
