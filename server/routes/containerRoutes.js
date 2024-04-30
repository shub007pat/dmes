const express = require('express');
const Container = require('../models/Container');
const router = express.Router();

// Get all containers
router.get('/', async (req, res) => {
    try {
        const containers = await Container.find({});
        res.json(containers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single container by ID
router.get('/:id', async (req, res) => {
    try {
        const container = await Container.findById(req.params.id);
        if (!container) {
            return res.status(404).json({ message: 'Container not found' });
        }
        res.json(container);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new container
router.post('/', async (req, res) => {
    console.log("Received container creation request with data:", req.body);
    try {
        const newContainer = new Container(req.body);
        await newContainer.save();
        res.status(201).json(newContainer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a container
router.put('/:id', async (req, res) => {
    try {
        const updatedContainer = await Container.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedContainer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a container
router.delete('/:id', async (req, res) => {
    try {
        await Container.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Container deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
