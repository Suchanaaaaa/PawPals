const dns = require('dns');

// MongoDB Atlas DNS issue হলে Google DNS ব্যবহার করবে
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// ==========================================
// App Initialize
// ==========================================
const app = express();

// ==========================================
// Middleware
// ==========================================
app.use(cors());
app.use(express.json());

// ==========================================
// Routes Import
// ==========================================
const authRoutes = require('./routes/authRoutes');
const petRoutes = require('./routes/petRoutes');
const adoptionRoutes = require('./routes/adoptionRoutes');

// ==========================================
// Routes
// ==========================================
app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/adoptions', adoptionRoutes);

// ==========================================
// MongoDB Atlas Connection
// ==========================================
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MONGO_URI is not defined in environment variables');
} else {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log('MongoDB Atlas Connected successfully!');
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
    });
}

// ==========================================
// Test Route
// ==========================================
app.get('/', (req, res) => {
  res.json({
    message: 'PawPals Backend API is running successfully!'
  });
});

// ==========================================
// Vercel Export
// ==========================================
module.exports = app;

// ==========================================
// Local Development Server
// ==========================================
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};