const Admin = require("../models/admin");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.adminVerification = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const admin = await Admin.findById(data.id);
      if (admin) return res.json({ status: true, admin: admin.adminname });
      else return res.json({ status: false });
    }
  });
};
