const express = require('express');
const router = express.Router();
const Part = require('../models/Part');
const web3 = require('../web3/initWeb3');
const contractABI = require('../build/contracts/PartRegistry.json');
const contractAddress = '0x4886227E003BF58464C18D83676D42d49Dee9109'; 

const contract = new web3.eth.Contract(contractABI.abi, contractAddress);

// Get all parts
router.get('/', async (req, res) => {
    try {
        const parts = await Part.find();
        res.json(parts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const { partSerialNo, partName, length, width, unitPrice, addedBy } = req.body;
    const newPart = new Part({
        partSerialNo,
        partName,
        length,
        width,
        unitPrice,
        addedBy
    });

    const accounts = await web3.eth.getAccounts();

    try {
        await newPart.save();

        await contract.methods.addPart(newPart._id.toString(),partSerialNo, partName, length.toString(), width.toString(), unitPrice.toString()).send({ from: accounts[0], gas: 500000  });

        res.status(201).json(newPart);
    } catch (error) {
        console.error("Blockchain interaction failed", error);
        res.status(400).json({ message: "Blockchain interaction failed: " + error.message });
    }
});

// Get a single part by ID
router.get('/:id', async (req, res) => {
    try {
      const item = await Part.findById(req.params.id);
      if (!item) {
        return res.status(404).send('Item not found');
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Update a part
router.put('/:id', async (req, res) => {
    try {
        const updatedPart = await Part.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a part
router.delete('/:id', async (req, res) => {
    try {
        await Part.findByIdAndDelete(req.params.id);
        res.status(200).send('Part deleted');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
