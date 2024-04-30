const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    modules: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module'
    }]
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
