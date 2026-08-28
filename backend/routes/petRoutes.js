const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const auth = require('../middleware/authMiddleware');
const adminAuth = require('../middleware/adminMiddleware');

// ==========================================
// ১. সব Available Pet দেখতে (Public Route)
// ==========================================
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find({ status: 'Available' })
      .populate('owner', 'name email');

    res.json(pets);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});


// ==========================================
// ২. নতুন Pet যোগ করা (Protected Route)
// ==========================================
// নতুন Pet-এর status automatically "Pending" হবে
router.post('/add', auth, async (req, res) => {
  const {
    name,
    category,
    age,
    gender,
    location,
    description,
    image
  } = req.body;

  try {
    const newPet = new Pet({
      name,
      category,
      age,
      gender,
      location,
      description,
      image,
      owner: req.user.id,
      status: 'Pending'
    });

    await newPet.save();

    res.status(201).json({
      message: 'Pet submitted successfully! Waiting for admin approval.',
      pet: newPet
    });

  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
});


// ==========================================
// ৩. ADMIN - Pending Pets দেখা
// ==========================================
router.get('/admin/pending', adminAuth, async (req, res) => {
  try {
    const pets = await Pet.find({ status: 'Pending' })
      .populate('owner', 'name email');

    res.json(pets);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});


// ==========================================
// ৪. ADMIN - Pet Approve
// ==========================================
router.put('/admin/approve/:id', adminAuth, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({
        message: 'Pet not found'
      });
    }

    pet.status = 'Available';

    await pet.save();

    res.json({
      message: 'Pet approved successfully!',
      pet
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});


// ==========================================
// ৫. ADMIN - Pet Reject
// ==========================================
router.put('/admin/reject/:id', adminAuth, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({
        message: 'Pet not found'
      });
    }

    pet.status = 'Rejected';

    await pet.save();

    res.json({
      message: 'Pet rejected successfully!',
      pet
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});


// ==========================================
// ৬. Single Pet Details
// ==========================================
router.get('/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id)
      .populate('owner', 'name email');

    if (!pet) {
      return res.status(404).json({
        message: 'Pet not found'
      });
    }

    res.json(pet);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});


// ==========================================
// ৭. Pet Delete (Owner Only)
// ==========================================
router.delete('/:id', auth, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({
        message: 'Pet not found'
      });
    }

    // শুধুমাত্র Pet owner delete করতে পারবে
    if (pet.owner.toString() !== req.user.id) {
      return res.status(401).json({
        message: 'Unauthorized action'
      });
    }

    await pet.deleteOne();

    res.json({
      message: 'Pet removed successfully'
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});


module.exports = router;

