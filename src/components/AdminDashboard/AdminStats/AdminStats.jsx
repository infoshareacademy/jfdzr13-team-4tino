import { BarChart, PieChart } from '@mui/x-charts';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db, useAuth } from '../../../firebase';
import styles from './AdminStats.module.css';

const AdminStats = () => {
    const { currentUser } = useAuth();
    const [ordersData, setOrdersData] = useState([]);
    const [firstName, setFirstName] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            if (currentUser) {
                try {
                    const docRef = doc(db, 'users', currentUser.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        console.log('Dane użytkownika:', userData);
                        setFirstName(userData.firstName);
                    } else {
                        console.log('Dane użytkownika nie znalezione');
                    }
                } catch (error) {
                    console.error('Błąd pobierania danych użytkownika: ', error);
                }
            }
        };

        const fetchOrders = async () => {
            if (currentUser) {
                try {
                    const q = query(collection(db, 'orders'));
                    const querySnapshot = await getDocs(q);
                    const ordersData = querySnapshot.docs.map(doc => ({
                        ...doc.data()
                    }));
                    console.log('Pobrane zamówienia:', ordersData);
                    setOrdersData(ordersData);
                } catch (error) {
                    console.error('Błąd pobierania zamówień: ', error);
                }
            }
        };

        fetchUserData();
        fetchOrders();
    }, [currentUser]);

    const processOrdersData = (orders) => {
        const treeCounts = {};
        const locationCounts = {};
        const tabletCounts = {};
        const statusCounts = {};

        orders.forEach(order => {
            const tree = order.tree;
            const location = order.location;
            const tablet = order.tablet;
            const status = order.status;

            if (tree) {
                treeCounts[tree] = (treeCounts[tree] || 0) + 1;
            }
            if (location) {
                locationCounts[location] = (locationCounts[location] || 0) + 1;
            }
            if (tablet) {
                tabletCounts[tablet] = (tabletCounts[tablet] || 0) + 1;
            }
            if (status) {
                statusCounts[status] = (statusCounts[status] || 0) + 1;
            }
        });

        const treeNames = Object.keys(treeCounts);
        const treeValues = Object.values(treeCounts);

        const locationNames = Object.keys(locationCounts);
        const locationValues = Object.values(locationCounts);

        const tabletNames = Object.keys(tabletCounts);
        const tabletValues = Object.values(tabletCounts);

        const statusNames = Object.keys(statusCounts);
        const statusValues = Object.values(statusCounts);

        console.log(treeNames, treeValues);
        console.log(locationNames, locationValues);
        console.log(tabletNames, tabletValues);
        console.log(statusNames, statusValues);

        return { treeNames, treeValues, locationNames, locationValues, tabletNames, tabletValues, statusNames, statusValues };
    };

    const { treeNames, treeValues, locationNames, locationValues, tabletNames, tabletValues, statusNames, statusValues } = processOrdersData(ordersData);
    const palette = ['#57AB27', '#7ca45a', '#B8D698', '#DDEBCE', '#2a412f'];
    const totalLocations = locationValues.reduce((acc, value) => acc + value, 0);
    const totalStatus = statusValues.reduce((acc, value) => acc + value, 0);

    return (
        <div className={styles.container}>
            <div className={styles.panel}>
                <Link to="/admin" className={styles.link}>
                    <p className={styles.orderText}>Zamówienia</p>
                </Link>
                <Link to="/admin/stats" className={styles.link}>
                    <p className={styles.dataText}>Statystyki</p>
                </Link>
            </div>
            <div className={styles.main}>
                <h1 className={styles.h1}>Witaj {firstName} 😊</h1>
                <p>Yeah Science!</p>
                <h2 className={styles.h2}>Statystyki</h2>
                <div className={styles.chartContainer}>
                    <p>Rozkład statusów zamówień</p>
                    <PieChart
                        colors={palette}
                        series={[
                            {
                                id: 'Statuses',
                                data: statusNames.map((name, index) => ({
                                    id: name,
                                    value: statusValues[index],
                                    label: `${name} (${((statusValues[index] / totalStatus) * 100).toFixed(0)}%)`
                                })),
                                highlightScope: { faded: 'global', highlighted: 'item' },
                                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            },
                        ]}
                        width={800}
                        height={300}
                    />
                    <p>Najpopularniejsze lokalizacje</p>
                    <PieChart
                        colors={palette}
                        series={[
                            {
                                id: 'Locations',
                                data: locationNames.map((name, index) => ({
                                    id: name,
                                    value: locationValues[index],
                                    label: `${name} (${((locationValues[index] / totalLocations) * 100).toFixed(0)}%)`
                                })),
                                highlightScope: { faded: 'global', highlighted: 'item' },
                                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            },
                        ]}
                        width={800}
                        height={300}
                    />
                    <p>Najpopularniejsze drzewa</p>
                    <BarChart
                        xAxis={[
                            {
                                id: 'Trees',
                                data: treeNames,
                                scaleType: 'band',
                            },
                        ]}
                        series={[
                            {
                                data: treeValues,
                                color: '#57AB27'
                            },
                        ]}
                        width={700}
                        height={300}
                    />
                    <p>Najpopularniejsze tabliczki</p>
                    <BarChart
                        xAxis={[
                            {
                                id: 'Tablets',
                                data: tabletNames,
                                scaleType: 'band',
                            },
                        ]}
                        series={[
                            {
                                data: tabletValues,
                                color: '#7ca45a'
                            },
                        ]}
                        width={700}
                        height={300}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminStats;
