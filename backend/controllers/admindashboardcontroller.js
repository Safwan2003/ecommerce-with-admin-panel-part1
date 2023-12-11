const Admin = require('../models/admin');

// Get Admin Details
const getAdminDetails = async (req, res) => {
  try {
    const adminId = req.params.adminId; // Assuming you are passing adminId in the URL
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Customize the response according to the required admin details
    const { _id, username, phoneNumber, /* Add other fields as needed */ } = admin;
    const adminDetails = { _id, username, phoneNumber /* Add other fields */ };

    res.status(200).json({ admin: adminDetails });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Admin Details
const updateAdminDetails = async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const { username, phoneNumber, /* Add other fields for update */ } = req.body;

    const admin = await Admin.findByIdAndUpdate(
      adminId,
      { username, phoneNumber /* Add other fields for update */ },
      { new: true }
    );

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Customize the response according to the updated admin details
    const { _id, username: updatedUsername, phoneNumber: updatedPhoneNumber /* Add other updated fields */ } = admin;
    const updatedAdminDetails = { _id, username: updatedUsername, phoneNumber: updatedPhoneNumber /* Add other updated fields */ };

    res.status(200).json({ admin: updatedAdminDetails });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Admin Account
const deleteAdminAccount = async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const deletedAdmin = await Admin.findByIdAndDelete(adminId);

    if (!deletedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json({ message: 'Admin account deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Other dashboard-related functionalities can be added here

module.exports = {
  getAdminDetails,
  updateAdminDetails,
  deleteAdminAccount,
  // Add other functions for admin dashboard here
};
