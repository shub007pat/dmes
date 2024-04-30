const express = require('express');
const router = express.Router();
const Role = require('../models/Role');

// Get all roles
router.get('/', async (req, res) => {
    try {
        const roles = await Role.find().populate('modules');
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const role = await Role.findById(req.params.id).populate('modules');
        if (!role) {
            return res.status(404).send('Role not found');
        }
        res.json(role);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new role
router.post('/', async (req, res) => {
    const { name, modules } = req.body;
    const role = new Role({
        name,
        modules
    });

    try {
        await role.save();
        res.status(201).json(role);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a role
router.delete('/:id', async (req, res) => {
    try {
        const role = await Role.findByIdAndDelete(req.params.id);
        if (!role) return res.status(404).send('No role found');
        res.status(200).send('Role deleted');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Updating a role in routes/roles.js
router.put('/:id', async (req, res) => {
    try {
        const updatedRole = await Role.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.json(updatedRole);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


module.exports = router;
