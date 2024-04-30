const express = require('express');
const axios = require('axios');  // Ensure axios is installed and imported
const Order = require('../models/Order');
const router = express.Router();

router.post('/:orderNo', async (req, res) => {
    const { orderNo } = req.params;

    try {
        // Find the order
        const order = await Order.findOne({ orderNo });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if the order is completed and not already packed
        if (order.status !== 'Completed') {
            return res.status(400).json({ message: 'Order is not in a state that can be packed' });
        }

        // Create a unique container number
        const containerNumber = `CN-${new Date().getTime()}`;

        // Call the container creation API
        const containerResponse = await axios.post('http://localhost:5000/api/containers', {
            containerNumber,
            containerType: 'box',  // Assuming 'box' is a valid type
            addedBy: 'Admin',  // Assuming a fixed user 'Admin'
            status: 'ok'
        });

        if (containerResponse.status !== 201) {
            throw new Error('Failed to create container');
        }

        // Update the order status to 'Packed'
        order.status = 'Packed';
        await order.save();

        res.status(201).json({ message: 'Order packed and container created', container: containerResponse.data });
    } catch (error) {
        console.error('Error packing order:', error.message);
        res.status(500).json({ message: 'Error packing order: ' + error.message });
    }
});

module.exports = router;
