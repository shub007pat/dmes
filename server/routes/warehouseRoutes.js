const express = require('express');
const Warehouse = require('../models/Warehouse'); // Replace with your actual import
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const warehouses = await Warehouse.find();
    res.json(warehouses);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/', async (req, res) => {
  const warehouse = new Warehouse(req.body);
  try {
    const newWarehouse = await warehouse.save();
    res.status(201).json(newWarehouse);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    if (!warehouse) return res.status(404).send('Warehouse not found');
    res.json(warehouse);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const warehouse = await Warehouse.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(warehouse);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Warehouse.findByIdAndDelete(req.params.id);
    res.status(200).send('Warehouse deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
