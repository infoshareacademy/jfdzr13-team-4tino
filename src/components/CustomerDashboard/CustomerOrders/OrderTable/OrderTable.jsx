import React from 'react';
import styles from './OrderTable.module.css';

const OrderTable = ({ data, onDelete }) => {
  return (
    <table className={styles.customTable}>
      <thead>
        <tr>
          <th>Numer zamówienia</th>
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
            <td>{row.id}</td>
            <td>{row.treeType}</td>
            <td>{row.tabletType}</td>
            <td>{row.dedicationType}</td>
            <td>{row.price}</td>
            <td>{row.status}</td>
            <td>
              <button onClick={() => onDelete(row.id)} className={styles.deleteButton}>
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
