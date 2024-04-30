const mongoose = require('mongoose');

const processStepsSchema = new mongoose.Schema({
    mainPartSerialNo: { type: String, required: true },
    mainPartName: { type: String, required: true },
    steps: [
        {
            type: { type: String, required: true, enum: ['part', 'operation'] },
            partSerialNo: String,
            partName: String,
            quantity: Number,
            operationDescription: String,
            units: String
        }
    ],
    addedBy: { type: String, required: true }
});

const ProcessSteps = mongoose.model('ProcessSteps', processStepsSchema);

module.exports = ProcessSteps;
