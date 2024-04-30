import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Packing() {
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPackedOrders();
    }, []);

    useEffect(() => {
        filterOrders();
    }, [search, orders]);

    const fetchPackedOrders = async () => {
        try {
            const response = await axios.get('/api/orders/packed');
            setOrders(response.data);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        }
    };

    const filterOrders = () => {
        if (search) {
            const filtered = orders.filter(order => order.orderNo.includes(search));
            setFilteredOrders(filtered);
        } else {
            setFilteredOrders(orders);
        }
    };

    const handleLogout = () => {
        // Implement logout logic here
        console.log("Logout action here");
        navigate('/login');
      };

    return (
        <div className="container">
            <header>
            <div onClick={() => navigate('/dashboard')} className="app-name">DMES</div>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </header>
            <h1>Packing</h1>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by Order No"
            />
            <button onClick={() => navigate(`/packorder`)}>Pack</button>
            <table>
                <thead>
                    <tr>
                        <th>Order No</th>
                        <th>Ship To</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map((order) => (
                        <tr key={order._id}>
                            <td>{order.orderNo}</td>
                            <td>{order.shipTo}</td>
                            <td>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <footer>
                ©Copyright 2024. Designed by Shubham.
            </footer>
        </div>
    );
}

export default Packing;
