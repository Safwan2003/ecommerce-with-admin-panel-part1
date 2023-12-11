// const express = require('express');
// const router = express.Router();
// const adminController = require('../controllers/admincontroller');

// // Admin Signup
// router.post('/admin/signup', adminController.adminSignup);

// // Admin Login
// router.post('/admin/login', adminController.adminLogin);

// // Add a new product for an admin
// router.post('/admin/:adminId/products', adminController.addProduct);

// // Get all products for an admin
// router.get('/admin/:adminId/products', adminController.getAllProducts);

// // Update a product for an admin
// router.put('/admin/products/:productId', adminController.updateProduct);

// // Delete a product for an admin
// router.delete('/admin/products/:productId', adminController.deleteProduct);


// router.post('/admin/user', adminController.getUser);

// module.exports = router;







// adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { adminVerification } = require('../middleware/adminmiddleware');

// Define your routes here
router.post('/adminsignup', adminController.adminSignup);
router.post('/adminsignin', adminController.adminSignin);
router.post('/admin', adminVerification); // Ensure the correct middleware or callback function is provided

module.exports = router;


