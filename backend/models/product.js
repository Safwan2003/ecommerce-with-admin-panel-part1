const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productname: String,
    price: Number,
    admin: String , // Reference to the Admin collection
    description: String,
    category: String,
    images: [String]
    // Add more fields as needed
});

module.exports = mongoose.model('Product', productSchema);
