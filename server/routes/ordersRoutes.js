const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const web3 = require('../web3/initWeb3');
const contractABI = require('../build/contracts/OrderRegistry.json');
const contractAddress = '0x9BB323e6eEc83A8eB8c188f8BcCb9568493d545F'; 

const contract = new web3.eth.Contract(contractABI.abi, contractAddress);

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all packed orders
router.get('/packed', async (req, res) => {
    try {
        const packedOrders = await Order.find({ status: 'Packed' });
        res.json(packedOrders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



router.get('/:id', async (req, res) => {
    try {
        const orders = await Order.findById(req.params.id);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new order
router.post('/', async (req, res) => {
    const { orderBy, shipTo, parts, status } = req.body;
    const orderDate = Date.now;
    const orderNo = "ORD-" + Date.now(); // Simple unique order number generator
    const newOrder = new Order({
        orderNo,
        orderBy,
        shipTo,
        parts,
        status
    });
    try {

    await newOrder.save();
    const accounts = await web3.eth.getAccounts();

    await contract.methods.addOrder(
        newOrder._id.toString(),
        orderNo,
        orderDate.toString(),
        orderBy,
        shipTo,
        parts.map(part => part.partSerialNo),
        parts.map(part => part.partName),
        parts.map(part => part.quantity),
        parts.map(part => part.unitPrice)
    ).send({ from: accounts[0], gas: 500000 })
    .then(result => console.log('Transaction successful:', result))
    .catch(err => {
        console.error('Blockchain transaction failed:', err);
        res.status(500).json({ message: "Blockchain transaction failed: " + err.message });
    });
        
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/packorder/:orderNo', async (req, res) => {
    try {
        const { orderNo } = req.params;
        const order = await Order.findOne({ orderNo: orderNo });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: "Error fetching order by number: " + error.message });
    }
});

// Update an order
router.put('/:id', async (req, res) => {
    const { status, parts, container } = req.body;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status, parts, container }, { new: true });
        res.json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/orderMatch/:partSerialNo', async (req, res) => {
    const { partSerialNo, status } = req.params;
    let query = {};

    if (status) {
        query.status = status;
    }

    if (partSerialNo) {
        // Add a condition to match any order where at least one part has the specified serial number
        query['parts.partSerialNo'] = partSerialNo;
    }

    try {
        const orders = await Order.find(query);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Delete an order
router.delete('/:id', async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).send('Order deleted');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
