import React from 'react';
import styles from './OrderTable.module.css';

const OrderTable = ({ data }) => {
  return (
    <table className={styles.customTable}>
      <thead>
        <tr>
          <th>Numer zamówienia</th>
          <th>Rodzaj zamówienia</th>
          <th>Cena</th>
          <th>Stan realizacji</th>
          <th>Usuń</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.orderType}</td>
            <td>{row.price}</td>
            <td>{row.status}</td>
            <td>{row.delete}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
