const mongoose = require('mongoose');

const shiftManagerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    shiftTime: {
        start: { type: Date, required: true },
        end: { type: Date, required: true }
    },
    status: {
        type: String,
        enum: ['Started', 'Completed'],
        default: 'Started'
    }
}, { timestamps: true });

const ShiftManager = mongoose.model('ShiftManager', shiftManagerSchema);

module.exports = ShiftManager;
