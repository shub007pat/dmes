const mongoose = require('mongoose');

const containerSchema = new mongoose.Schema({
  containerNumber: { type: String, required: true },
  containerType: { type: String, enum: ['box', 'pallet box', 'bag', 'basket', 'bin'], required: true },
  addedDate: { type: Date, default: Date.now },
  addedBy: { type: String, required: true },
  status: { type: String, enum: ['ok', 'defective'], required: true }
});

module.exports = mongoose.model('Container', containerSchema);
