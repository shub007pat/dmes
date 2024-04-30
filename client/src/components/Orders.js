import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('/api/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleDelete = async (orderId) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            try {
                await axios.delete(`/api/orders/${orderId}`);
                fetchOrders();
            } catch (error) {
                console.error('Failed to delete order:', error);
            }
        }
    };

    const handleLogout = () => {
        // Implement logout logic here
        console.log("Logout action here");
        navigate('/login');
      };

    const filteredOrders = orders.filter(order => order.orderNo.includes(searchTerm));

    return (
        <div className="container">
            <header>
            <div onClick={() => navigate('/dashboard')} className="app-name">DMES</div>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </header>
            <h1>Orders</h1>
            <input type="text" placeholder="Search by Order No" onChange={e => setSearchTerm(e.target.value)} />
            <button onClick={() => navigate('/add-order')}>Add Order</button>
            <table>
                <thead>
                    <tr>
                        <th>Order No</th>
                        <th>Order Date</th>
                        <th>Ordered By</th>
                        <th>Ship To</th>
                        <th>Part No</th>
                        <th>Part Name</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total Amount</th>
                        <th>Container</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.flatMap((order) =>
                        order.parts.map((part, index) => (
                        <tr key={`${order._id}_${index}`}>
                            <td>{order.orderNo}</td>
                            <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                            <td>{order.orderBy}</td>
                            <td>{order.shipTo}</td>
                            <td>{part.partSerialNo}</td>
                            <td>{part.partName}</td>
                            <td>{part.quantity}</td>
                            <td>{part.unitPrice}</td>
                            <td>{part.totalAmount}</td>
                            <td>{order.container}</td>
                            <td>{order.status}</td>
                            <td>
                            <button onClick={() => navigate(`/edit-order/${order._id}`)}>Edit</button>
                            <button onClick={() => handleDelete(order._id)}>Delete</button>
                            </td>
                        </tr>
                        ))
                    )}
                </tbody>
            </table>
            <footer>
                ©Copyright 2024. Designed by Shubham.
            </footer>
        </div>
    );
}

export default Orders;
