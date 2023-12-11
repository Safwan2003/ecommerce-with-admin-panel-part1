// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const adminSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true
//   },
//   phoneNumber: {
//     type: String,
//     required: true,
//     unique: true // Ensures each phone number is unique
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   products: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product'
//   }]
// });

// // Hash password before saving to the database
// adminSchema.pre('save', async function (next) {
//   const admin = this;
//   if (admin.isModified('password')) {
//     const hashedPassword = await bcrypt.hash(admin.password, 10); // Salt rounds: 10
//     admin.password = hashedPassword;
//   }
//   next();
// });

// module.exports = mongoose.model('Admin', adminSchema);























// adminModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  adminname: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  // Add other fields as needed
});

module.exports = mongoose.model('Admin', adminSchema);
