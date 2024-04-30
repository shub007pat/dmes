const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
  partSerialNo: { type: String, required: true, unique: true },
  partName: { type: String, required: true },
  quantity: { type: Number, required: true },
  location: { type: String, required: true },
  containerNo: { type: String, required: true },
  status: { type: String, required: true },
  addDate: { type: Date, default: Date.now },
  addedBy: { type: String, required: true },
  supplier: { type: String, required: true }
});

const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);

module.exports = InventoryItem;
