const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); // Node.js DNS error রোধ করার জন্য

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// ১. App initialize
const app = express();

// ২. Middleware
app.use(cors());
app.use(express.json());

// ৩. Routes import
const authRoutes = require('./routes/authRoutes');
const petRoutes = require('./routes/petRoutes');
const adoptionRoutes = require('./routes/adoptionRoutes');

// ৪. Routes use
app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/adoptions', adoptionRoutes);

// ৫. Server & MongoDB configuration
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// MongoDB Atlas connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB Atlas Connected successfully!');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// ৬. Server listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});