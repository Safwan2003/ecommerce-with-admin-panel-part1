const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    username: String,
    phonenumber: Number,
    password: String,
    sales: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sales' }]
    // Add more fields as needed
});

module.exports = mongoose.model('Client', clientSchema);
