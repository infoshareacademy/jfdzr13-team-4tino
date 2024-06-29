import { Timestamp, addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { toast } from "react-toastify";

export const addOrderToFirestore = async (
  user,
  selectedTree,
  selectedTablet,
  selectedLocation,
  selectedDedication
) => {
  if (!user || !user.email) {
    console.error("Nie może pobrać emaila");
    return;
  }

  if (
    !selectedTree ||
    !selectedTablet ||
    !selectedDedication ||
    !selectedLocation
  ) {
    toast.error("Wymagane są wszystkie elementy zamówienia", {
      hideProgressBar: true,
      style: { marginTop: "120px" },
      autoClose: 3000,
    });
    return;
  }

  try {
    const orderId = await generateOrderId();
    const collectionRef = collection(db, "orders");
    const time = Timestamp.now();

    await addDoc(collectionRef, {
      orderId,
      email: user.email,
      date: time,
      status: "przyjęto do realizacji",
      price: selectedTree.price,
      tree: selectedTree.name,
      tablet: selectedTablet.name,
      dedication: selectedDedication,
      location: selectedLocation,
    });

    toast.success("Zamówienie złożone pomyślnie", {
      hideProgressBar: true,
      style: { marginTop: "120px" },
      autoClose: 3000,
    });
  } catch (error) {
    console.error("Błąd podczas dodawania:", error);
    throw error;
  }
};

const generateOrderId = async () => {
  try {
    const ordersSnapshot = await getDocs(collection(db, "orders"));
    const count = ordersSnapshot.size + 1;
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear().toString().slice(-2);
    return `${count}${month < 10 ? "0" + month : month}${year}`;
  } catch (error) {
    console.error("Błąd podczas sklejania id", error);
    throw error;
  }
};
