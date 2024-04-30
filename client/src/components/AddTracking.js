import React, { useState } from 'react';
import axios from 'axios';

function AddTracking() {
    const [trackingData, setTrackingData] = useState({
        trackingNumber: '',
        orderDetails: {
            orderNo: '',
            from: '',
            to: '',
            shipDate: ''
        },
        updates: [{
            location: '',
            details: '',
            date: '',
            time: ''
        }]
    });

    const handleInputChange = (e, section, index) => {
        if (section) {
            const newUpdates = [...trackingData.updates];
            newUpdates[index] = { ...newUpdates[index], [e.target.name]: e.target.value };
            setTrackingData({ ...trackingData, updates: newUpdates });
        } else if (['orderNo', 'from', 'to', 'shipDate'].includes(e.target.name)) {
            setTrackingData({
                ...trackingData,
                orderDetails: { ...trackingData.orderDetails, [e.target.name]: e.target.value }
            });
        } else {
            setTrackingData({ ...trackingData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Example validation: Ensure tracking number is not empty
        if (!trackingData.trackingNumber.trim()) {
            alert('Tracking number is required!');
            return;
        }
        try {
            const response = await axios.post('/api/tracking', {
                ...trackingData
            });
            alert('Tracking information added successfully!');
        } catch (error) {
            console.error('Error adding tracking:', error.response?.data || error.message);
            alert('Failed to add tracking: ' + (error.response?.data.message || error.message));
        }
    };
    

    const addUpdate = () => {
        setTrackingData({
            ...trackingData,
            updates: [...trackingData.updates, { location: '', details: '', date: '', time: '' }]
        });
    };

    const removeUpdate = (index) => {
        const newUpdates = trackingData.updates.filter((_, idx) => idx !== index);
        setTrackingData({ ...trackingData, updates: newUpdates });
    };

    return (
        <div>
            <h1>Add Tracking Information</h1>
            <form onSubmit={handleSubmit}>
                <label>Tracking Number:</label>
                <input
                    type="text"
                    name="trackingNumber"
                    value={trackingData.trackingNumber}
                    onChange={handleInputChange}
                    required
                />

                <h2>Order Details</h2>
                <label>Order No:</label>
                <input
                    type="text"
                    name="orderNo"
                    value={trackingData.orderDetails.orderNo}
                    onChange={(e) => handleInputChange(e)}
                    required
                />
                <label>From:</label>
                <input
                    type="text"
                    name="from"
                    value={trackingData.orderDetails.from}
                    onChange={(e) => handleInputChange(e)}
                    required
                />
                <label>To:</label>
                <input
                    type="text"
                    name="to"
                    value={trackingData.orderDetails.to}
                    onChange={(e) => handleInputChange(e)}
                    required
                />
                <label>Ship Date:</label>
                <input
                    type="date"
                    name="shipDate"
                    value={trackingData.orderDetails.shipDate}
                    onChange={(e) => handleInputChange(e)}
                    required
                />

                <h2>Tracking Updates</h2>
                {trackingData.updates.map((update, index) => (
                    <div key={index}>
                        <label>Location:</label>
                        <input
                            type="text"
                            name="location"
                            value={update.location}
                            onChange={(e) => handleInputChange(e, 'updates', index)}
                            required
                        />
                        <label>Details:</label>
                        <input
                            type="text"
                            name="details"
                            value={update.details}
                            onChange={(e) => handleInputChange(e, 'updates', index)}
                            required
                        />
                        <label>Date:</label>
                        <input
                            type="date"
                            name="date"
                            value={update.date}
                            onChange={(e) => handleInputChange(e, 'updates', index)}
                            required
                        />
                        <label>Time:</label>
                        <input
                            type="time"
                            name="time"
                            value={update.time}
                            onChange={(e) => handleInputChange(e, 'updates', index)}
                            required
                        />
                        {trackingData.updates.length > 1 && (
                            <button type="button" onClick={() => removeUpdate(index)}>Remove Update</button>
                        )}
                    </div>
                ))}
                <button type="button" onClick={addUpdate}>Add Update</button>
                <button type="submit">Submit Tracking</button>
            </form>
        </div>
    );
}

export default AddTracking;
