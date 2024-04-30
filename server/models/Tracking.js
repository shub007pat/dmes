const mongoose = require('mongoose');

const trackingSchema = new mongoose.Schema({
    trackingNumber: { type: String, required: true },
    updates: [{
        location: String,
        details: String,
        date: Date,
        time: Date
    }],
    orderDetails: {
        orderNo: String,
        from: String,
        to: String,
        shipDate: Date
    }
});

const Tracking = mongoose.model('Tracking', trackingSchema);

module.exports = Tracking;
