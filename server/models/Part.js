const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
    partSerialNo: {
        type: String,
        required: true,
        unique: true
    },
    partName: {
        type: String,
        required: true
    },
    length: Number,
    width: Number,
    unitPrice: {
        type: Number,
        required: true
    },
    addDate: { type: Date, default: Date.now },
    addedBy: { type: String, required: true }
});

const Part = mongoose.model('Part', partSchema);

module.exports = Part;
