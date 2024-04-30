const express = require('express');
const InventoryItem = require('../models/InventoryItem');
const router = express.Router();
const web3 = require('../web3/initWeb3');
const contractABI = require('../build/contracts/Inventory.json');
const contractAddress = '0xD03baCCFb89E51B2C61C8276Fb07e11881c71E36'; // Replace with your contract's address

const contract = new web3.eth.Contract(contractABI.abi, contractAddress);

// Get all inventory items
router.get('/', async (req, res) => {
  try {
    const items = await InventoryItem.find({});
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new inventory item
router.post('/', async (req, res) => {
  const { partSerialNo, partName, quantity, location, containerNo, status, addedBy, supplier } = req.body;
  try {
    const newItem = new InventoryItem({ partSerialNo, partName, quantity, location, containerNo, status, addedBy, supplier });
    await newItem.save();
    const accounts = await web3.eth.getAccounts();
    await contract.methods.addItem(newItem._id.toString(), partSerialNo, partName, quantity, location, containerNo, status, supplier).send({ from: accounts[0], gas: 500000 });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({
      message: "Failed to execute transaction",
      error: error.message,
      gasNeeded: error.gasNeeded,  // If available
      gasSent: error.gasSent       // If available
  });
    res.status(400).json({ message: error.message });
  }
});

// Get a single inventory item by ID
router.get('/:id', async (req, res) => {
    try {
      const item = await InventoryItem.findById(req.params.id);
      if (!item) {
        return res.status(404).send('Item not found');
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Update an inventory item
  router.put('/:id', async (req, res) => {
    const { status } = req.body;
    try {
      const item = await InventoryItem.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // Updating item status on the blockchain
    const accounts = await web3.eth.getAccounts();
    await contract.methods.updateItemStatus(item._id.toString(), status).send({ from: accounts[0] });

    if (!item) {
      return res.status(404).send('Item not found');
    }
    res.json(item);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const item = await InventoryItem.findByIdAndDelete(req.params.id);
      if (!item) {
        return res.status(404).send('Item not found');
      }
      res.status(200).send(`Deleted item with ID: ${req.params.id}`);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Include routes for updating and deleting later

module.exports = router;
