const express = require('express');
const ShiftManager = require('../models/ShiftManager');
const router = express.Router();

// Get all shifts
router.get('/', async (req, res) => {
    try {
        const shifts = await ShiftManager.find();
        res.json(shifts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single shift by ID
router.get('/:id', async (req, res) => {
    try {
        const shift = await ShiftManager.findById(req.params.id);
        if (!shift) {
            return res.status(404).json({ message: 'Shift not found' });
        }
        res.json(shift);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new shift
router.post('/', async (req, res) => {
    const { name, shiftTime, staffAssigned, status } = req.body;
    const newShift = new ShiftManager({
        name,
        shiftTime,
        staffAssigned, // Expecting an array of staff IDs
        status
    });

    try {
        await newShift.save();
        res.status(201).json(newShift);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a shift
router.put('/:id', async (req, res) => {
    try {
        const updatedShift = await ShiftManager.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedShift);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a shift
router.delete('/:id', async (req, res) => {
    try {
        await ShiftManager.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Shift deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
