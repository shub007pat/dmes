const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  warehouseNumber: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  addedDate: { type: Date, default: Date.now },
  addedBy: { type: String, required: true },
  status: { type: String, enum: ['Full', 'Empty', 'Closed'], default: 'Empty' },
});

const Warehouse = mongoose.model('Warehouse', warehouseSchema);

module.exports = Warehouse;
