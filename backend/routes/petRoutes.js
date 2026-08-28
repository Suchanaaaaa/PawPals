const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const auth = require('../middleware/authMiddleware');

// ১. সব পেট দেখতে (Public Route)
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find().populate('owner', 'name email');
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ২. নতুন পেট যোগ করতে (Protected Route - লগইন থাকা আবশ্যক)
router.post('/add', auth, async (req, res) => {
  const { name, category, age, gender, location, description, image } = req.body;
  try {
    const newPet = new Pet({
      name,
      category,
      age,
      gender,
      location,
      description,
      image,
      owner: req.user.id
    });
    await newPet.save();
    res.status(201).json({ message: 'Pet added successfully!', pet: newPet });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ৩. একক পোষা প্রাণীর বিস্তারিত তথ্য পেতে (id দিয়ে ফেচ করা)
router.get('/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate('owner', 'name email');
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    res.json(pet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ৪. পোষা প্রাণীর পোস্ট ডিলিট করতে (Protected Route)
router.delete('/:id', auth, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) return res.status(404).json({ message: 'Pet not found' });

    // শুধুমাত্র পোস্ট প্রদানকারী ব্যবহারকারীই ডিলিট করতে পারবে
    if (pet.owner.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized action' });
    }

    await pet.deleteOne();
    res.json({ message: 'Pet removed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;