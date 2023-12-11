const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' }
    // Add more fields as needed
});

module.exports = mongoose.model('Sales', salesSchema);
