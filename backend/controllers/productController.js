const Product = require('../models/product');

// Controller methods for product-related operations
const productController = {
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find().populate('admin');
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getProductById: async (req, res) => {
        try {
            const { productId } = req.params;
            const product = await Product.findById(productId).populate('admin');
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createProduct: async (req, res) => {
        try {
            const newProduct = new Product(req.body);
            const savedProduct = await newProduct.save();
            res.status(201).json(savedProduct);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    updateProduct: async (req, res) => {
        try {
            const { productId } = req.params;
            const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(updatedProduct);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const { productId } = req.params;
            const deletedProduct = await Product.findByIdAndDelete(productId);
            if (!deletedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = productController;
