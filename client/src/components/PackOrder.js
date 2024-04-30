import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PackOrder() {
    const [orderNo, setOrderNo] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handlePackOrder = async () => {
        try {
            const orderResponse = await axios.get(`/api/orders/packorder/${orderNo}`);
            console.log(orderResponse);
            const order = orderResponse.data;

            if (order.status === 'Packed') {
                setError('Order is already packed');
            } else if (order.status === 'Completed') {
                // Update order status to 'Packed'
                const containerNumber = `CN-${Date.now()}`;
                await axios.put(`/api/orders/${order._id}`, { ...order, status: 'Packed', container: containerNumber });
                

                // Create a new container
                  // Simple example to generate a unique container number
                const newContainer = {
                    containerNumber: containerNumber,
                    containerType: 'box',
                    addedBy: 'Admin',
                    status: 'ok'
                };
                //await axios.put(`/api/orders/${order._id}`, { ...order, container: containerNumber });
                console.log("Attempting to create container with data:", newContainer);
                const containerResponse = await axios.post('/api/containers', newContainer);
                console.log("Container created:", containerResponse.data);
                

                alert('Order packed successfully, Container Created!');
                navigate('/packing');
            } else {
                setError('Order is not completed so cannot be packed');
            }
        } catch (error) {
            setError(error.response?.data.message || 'Failed to pack order');
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
            <h1>Pack Order</h1>
            <input
                type="text"
                value={orderNo}
                onChange={e => setOrderNo(e.target.value)}
                placeholder="Enter Order No"
            />
            <button onClick={handlePackOrder}>Pack Order</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <footer>
                ©Copyright 2024. Designed by Shubham.
            </footer>
        </div>
    );
}

export default PackOrder;
