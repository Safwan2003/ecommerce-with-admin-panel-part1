const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
require("dotenv").config();

const cookieParser = require("cookie-parser");
const { MONGO_URL, PORT } = process.env;

// Connect to MongoDB
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => console.error(err));

// CORS middleware (apply it before defining routes)

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// Body parser middleware
app.use(express.json());
app.use(cookieParser());

// Define routes
app.use('/api', require('./routes/adminRoutes')); // Admin routes
app.use('/api/client', require('./routes/clientRoutes'));
app.use('/api/product', require('./routes/productRoutes'));
app.use('/api/sales', require('./routes/salesRoutes'));

// Include authRoutes if available
try {
  const authRoutes = require('./routes/authRoutes');
  app.use('/api/auth', authRoutes);
} catch (error) {
  console.error('Error loading authRoutes:', error);
}

// Error handling middleware (handle errors after route definitions)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
