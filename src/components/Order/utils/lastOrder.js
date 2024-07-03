import { db } from "../../../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";

export const getLastOrderDate = async (userEmail) => {
  const ordersRef = collection(db, "orders");
  const q = query(
    ordersRef,
    where("email", "==", userEmail),
    orderBy("date", "desc"),
    limit(1)
  );

  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const lastOrder = querySnapshot.docs[0].data();
    return lastOrder.date.toDate();
  }
  return null;
};
