import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from 'qrcode';
import { jsPDF } from 'jspdf';
import { Link, useNavigate } from 'react-router-dom';

function ShippingLabels() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchPackedOrders();
    }, []);

    useEffect(() => {
        setFilteredOrders(
            orders.filter(order =>
                order.orderNo.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, orders]);

    const fetchPackedOrders = async () => {
        try {
            const response = await axios.get('/api/orders/packed');
            setOrders(response.data);
            setFilteredOrders(response.data);  // Initialize filtered orders with all orders
        } catch (error) {
            console.error('Error fetching packed orders:', error);
        }
    };

    const generatePDF = async (order) => {
        try {
            const canvas = document.createElement('canvas');
            await QRCode.toCanvas(canvas, `Order: ${order.orderNo}, Container: ${order.container}`, {
                width: 200
            });
            const imgData = canvas.toDataURL('image/png');

            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 10, 10, 180, 160);
            pdf.text(`Order No: ${order.orderNo}`, 10, 180);
            pdf.save(`Shipping-Label-${order.orderNo}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
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
            <h1>Shipping Labels</h1>
            <input
                type="text"
                placeholder="Search by Order No..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ marginBottom: '10px' }}
            />
            <table>
                <thead>
                    <tr>
                        <th>Order No</th>
                        <th>Container No</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map(order => (
                        <tr key={order._id}>
                            <td>{order.orderNo}</td>
                            <td>{order.container}</td>
                            <td>
                                <button onClick={() => generatePDF(order)}>
                                    Download Shipping Label
                                </button>
                            </td>
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

export default ShippingLabels;
