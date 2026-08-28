const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET_KEY = 'secretkey';

// =========================
// Register
// =========================
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Normal users are created with role = user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'user'
    });

    // JWT contains user id and role
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      SECRET_KEY,
      {
        expiresIn: '1d'
      }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

// =========================
// Login
// =========================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: 'User not found'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid credentials'
      });
    }

    // JWT contains user id and role
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      SECRET_KEY,
      {
        expiresIn: '1d'
      }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

module.exports = router;
