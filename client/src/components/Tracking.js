import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Tracking() {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [trackingData, setTrackingData] = useState(null);
    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/api/tracking/${trackingNumber}`);
            setTrackingData(response.data);
        } catch (error) {
            console.error('Failed to fetch tracking data:', error);
            setTrackingData(null); // Clear previous data on error
            alert('Tracking information not found.');
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
            <h1>Tracking Information</h1>
            <input
                type="text"
                value={trackingNumber}
                onChange={e => setTrackingNumber(e.target.value)}
                placeholder="Enter tracking number"
            />
            <button onClick={handleSearch}>Search</button>
            {trackingData && (
                <div>
                    <div className="card">
                        <p>Order No: {trackingData.orderDetails.orderNo}</p>
                        <p>From: {trackingData.orderDetails.from}</p>
                        <p>To: {trackingData.orderDetails.to}</p>
                        <p>Ship Date: {new Date(trackingData.orderDetails.shipDate).toLocaleDateString()}</p>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Location</th>
                                <th>Details</th>
                                <th>Date</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trackingData.updates.map((update, index) => (
                                <tr key={index}>
                                    <td>{update.location}</td>
                                    <td>{update.details}</td>
                                    <td>{new Date(update.date).toLocaleDateString()}</td>
                                    <td>{new Date(update.time).toLocaleTimeString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <footer>
        ©Copyright 2024. Designed by Shubham.
      </footer>
        </div>
    );
}

export default Tracking;
