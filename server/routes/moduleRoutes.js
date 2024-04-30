const express = require('express');
const router = express.Router();
const Module = require('../models/Module');

// Get all modules
router.get('/', async (req, res) => {
    try {
        const modules = await Module.find();
        res.json(modules);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new module
router.post('/', async (req, res) => {
    const module = new Module({
        name: req.body.name,
        description: req.body.description
    });
    try {
        const newModule = await module.save();
        res.status(201).json(newModule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a module
router.delete('/:id', async (req, res) => {
    try {
        const module = await Module.findByIdAndDelete(req.params.id);
        if (!module) return res.status(404).send('No module found');
        res.status(200).send('Module deleted');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
