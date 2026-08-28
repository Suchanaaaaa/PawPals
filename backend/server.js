const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); // Node.js DNS error রোধ করার জন্য

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// ১. আগে app ইনিশিয়ালাইজ করতে হবে
const app = express();

// ২. মিডলওয়্যার
app.use(cors());
app.use(express.json());

// ৩. রাউট ইমপোর্ট
const authRoutes = require('./routes/authRoutes');
const petRoutes = require('./routes/petRoutes');

// ৪. রাউটার ব্যবহার
app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);

// ৫. ডাটাবেজ কানেকশন (MongoDB Atlas)
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://tasfiakhanamsuchona_db_user:3vdljeNYk1FkP1Ym@cluster0.e0ulzum.mongodb.net/pawpals?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Atlas Connected successfully!'))
  .catch((err) => console.error('MongoDB connection error:', err));

// ৬. সার্ভার লিসেন
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});