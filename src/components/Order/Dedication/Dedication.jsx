import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import styles from "./Dedication.module.css";

function DedicationsHere({ onSelectDedication }) {
  const [dedicationData, setDedicationData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDedicationData() {
      try {
        const docRef = doc(db, "dedications2", "M3LjT5JD5Dv070gPDBeG");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const rawData = docSnap.data().dedykacje;
          const data = Object.keys(rawData).map((key) => ({
            id: key,
            text: rawData[key],
          }));
          setDedicationData(data);
        } else {
          console.log("Document does not exist");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDedicationData();
  }, []);

  if (loading) {
    return <div>Ładowanie...</div>;
  }

  return (
    <div className={styles.here}>
      <select
        onChange={(e) => onSelectDedication(e.target.value)}
        className={styles.dedicationSelect}
      >
        <option value="">Wybierz dedykację</option>
        {dedicationData.map((item) => (
          <option key={item.id} value={item.text}>
            {item.text}
          </option>
        ))}
      </select>
    </div>
  );
}

const Dedication = ({ onSelectDedication }) => {
  const [selectedDedication, setSelectedDedication] = useState("");
  const [customDedication, setCustomDedication] = useState("");

  const handleSelectDedication = (dedication) => {
    setSelectedDedication(dedication);
    setCustomDedication(""); // Clear custom dedication if an existing one is selected
  };

  const handleCustomDedicationChange = (e) => {
    setCustomDedication(e.target.value);
    setSelectedDedication(""); // Clear selected dedication if custom dedication is being typed
  };

  const handleConfirmDedication = () => {
    onSelectDedication(customDedication || selectedDedication);
  };

  return (
    <div className={styles.dedication}>
      <h2>Wybierz dedykację lub napisz coś od siebie</h2>
      <div className={styles.dedicationArea}>
        <div className={styles.existing}>
          <DedicationsHere onSelectDedication={handleSelectDedication} />
        </div>
        <div className={styles.custom}>
          <input
            size={50}
            maxLength="40"
            type="text"
            className={styles.customInput}
            value={customDedication}
            onChange={handleCustomDedicationChange}
          />
          <p className={styles.warning}>Max 40 znaków</p>
        </div>
      </div>
      <button onClick={handleConfirmDedication}>Potwierdź dedykację</button>
    </div>
  );
};

export default Dedication;
