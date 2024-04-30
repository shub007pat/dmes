const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderNo: {
        type: String,
        required: true,
        unique: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    orderBy: String,
    shipTo: String,
    container: {
        type: String,
        default: 'NA'
    },
    parts: [{
        partSerialNo: String,
        partName: String,
        quantity: Number,
        unitPrice: Number,
        totalAmount: Number
    }],
    status: {
        type: String,
        default: 'Pending'
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
