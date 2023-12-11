const Admin = require("../models/admin");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require('bcryptjs');

const adminSignup = async (req, res, next) => {
  try {
    const { adminname, password, phoneNumber } = req.body;
    const existingAdmin = await Admin.findOne({ phoneNumber });
    
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({
      adminname,
      password: hashedPassword,
      phoneNumber,
    });

    const token = createSecretToken(admin._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res.status(201).json({
      message: "Admin signed up successfully",
      success: true,
      admin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const adminSignin = async (req, res, next) => {
  try {
    const { phoneNumber, password } = req.body;
    if (!phoneNumber || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    console.log('Incoming phoneNumber:', phoneNumber); // Log incoming phone number for debugging
    console.log('Incoming password:', password); // Log incoming password for debugging

    const user = await Admin.findOne({ phoneNumber });
    console.log('User fetched from DB:', user); // Log fetched user for debugging

    if (!user) {
      return res.status(401).json({ message: 'Incorrect phone number or password' });
    }

    console.log('Stored password hash:', user.password); // Log the stored password hash for comparison

    const auth = await bcrypt.compare(password, user.password);
    console.log('Authentication result:', auth); // Log authentication result for debugging

    if (!auth) {
      return res.status(401).json({ message: 'Incorrect password or phoneNumber' });
    }

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res.status(200).json({ message: "User logged in successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = { adminSignup, adminSignin };
