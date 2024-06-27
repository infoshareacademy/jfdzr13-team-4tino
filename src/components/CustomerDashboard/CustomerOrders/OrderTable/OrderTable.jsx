import React from 'react';
import styles from './OrderTable.module.css';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../../firebase'; 

const OrderTable = ({ data, onDelete }) => {
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'orders', id));
      if (onDelete) {
        onDelete(id);
      } else {
        console.error('onDelete function is not defined');
      }
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  return (
    <table className={styles.customTable}>
      <thead>
        <tr>
          <th>Data zamówienia</th>
          <th>Rodzaj drzewa</th>
          <th>Rodzaj tabliczki</th>
          <th>Rodzaj dedykacji</th>
          <th>Cena</th>
          <th>Stan realizacji</th>
          <th>Anuluj</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td>{new Date(row.date).toLocaleDateString()}</td> {/* Konwersja daty na lokalny format */}
            <td>{row.tree}</td>
            <td>{row.tablet}</td>
            <td>{row.dedication}</td>
            <td>{row.price}</td>
            <td>{row.status}</td>
            <td>
              <button
                onClick={() => handleDelete(row.id)}
                className={styles.deleteButton}
              >
                X
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;


// const OrderTable = ({ data, onDelete }) => {
//   return (
//     <table className={styles.customTable}>
//       <thead>
//         <tr>
//           <th>Numer zamówienia</th>
//           <th>Rodzaj drzewa</th>
//           <th>Rodzaj tabliczki</th>
//           <th>Rodzaj dedykacji</th>
//           <th>Cena</th>
//           <th>Stan realizacji</th>
//           <th>Anuluj</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((row) => (
//           <tr key={row.id}>
//             <td>{row.date}</td>
//             <td>{row.tree}</td>
//             <td>{row.tablet}</td>
//             <td>{row.dedication}</td>
//             <td>{row.price}</td>
//             <td>{row.status}</td>
//             <td>
//               <button
//                 onClick={() => {
//                   console.log('Button clicked, row id:', row.id);
//                   if (onDelete) {
//                     onDelete(row.id);
//                   } else {
//                     console.error('onDelete function is not defined');
//                   }
//                 }}
//                 className={styles.deleteButton}
//               >
//                 X
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default OrderTable;
