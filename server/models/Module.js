const mongoose = require('mongoose');

// Define the schema for the module
const moduleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true // Ensures module names are unique
    },
    description: {
        type: String,
        required: false // Optional field for additional details
    }
});

// Create the model from the schema
const Module = mongoose.model('Module', moduleSchema);

module.exports = Module;
