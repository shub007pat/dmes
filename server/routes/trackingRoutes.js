const express = require('express');
const Tracking = require('../models/Tracking'); // Assuming the model is saved as Tracking.js
const router = express.Router();

// Get tracking details by tracking number
router.get('/:trackingNumber', async (req, res) => {
    try {
        const trackingInfo = await Tracking.findOne({ trackingNumber: req.params.trackingNumber });
        if (!trackingInfo) {
            return res.status(404).json({ message: 'Tracking information not found' });
        }
        res.json(trackingInfo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    let { trackingNumber, updates, orderDetails } = req.body;

    // Convert time strings to Date objects
    updates = updates.map(update => ({
        ...update,
        time: new Date(`1970-01-01T${update.time}:00`) // Adjust date as necessary
    }));

    try {
        const newTracking = new Tracking({
            trackingNumber,
            updates,
            orderDetails
        });
        await newTracking.save();
        res.status(201).json(newTracking);
    } catch (error) {
        console.error("Error adding tracking:", error); // Log detailed error
        res.status(400).json({ message: "Error adding tracking information: " + error.message });
    }
});




module.exports = router;
