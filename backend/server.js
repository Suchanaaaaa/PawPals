const dns = require('dns');
// Node.js DNS Resolver-কে Google DNS ব্যবহার করতে বাধ্য করা হচ্ছে
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use(cors());

// Auth Route
app.use('/api/auth', authRoutes);

// MongoDB Atlas Connection String
const MONGO_URI = 'mongodb+srv://tasfiakhanamsuchona_db_user:3vdljeNYk1FkP1Ym@cluster0.e0ulzum.mongodb.net/pawpals?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Atlas Connected Successfully!'))
  .catch(err => console.log('DB Connection Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));