const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    jobNo: { type: String, required: true, unique: true },
    partSerialNo: { type: String, required: true },
    partName: { type: String, required: true },
    addDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed', 'Accepted', 'Rejected'], default: 'Pending' },
    operationStatus: { type: String, required: true },
    orderNo: { type: String, required: true },
    note: { type: String }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
