const express = require('express');
const router = express.Router();

const AdoptionRequest = require('../models/AdoptionRequest');
const Pet = require('../models/Pet');
const auth = require('../middleware/authMiddleware');
const adminAuth = require('../middleware/adminMiddleware');


// ==========================================
// 1. Submit Adoption Request
// ==========================================
router.post('/request/:petId', auth, async (req, res) => {
  try {
    const { message, phone, address } = req.body;

    // Check pet exists
    const pet = await Pet.findById(req.params.petId);

    if (!pet) {
      return res.status(404).json({
        message: 'Pet not found'
      });
    }

    // Only available pets can be adopted
    if (pet.status !== 'Available') {
      return res.status(400).json({
        message: 'This pet is not available for adoption'
      });
    }

    // Owner cannot adopt their own pet
    if (pet.owner.toString() === req.user.id) {
      return res.status(400).json({
        message: 'You cannot adopt your own pet'
      });
    }

    // Check if this user already requested this pet
    const existingRequest = await AdoptionRequest.findOne({
      pet: req.params.petId,
      adopter: req.user.id,
      status: 'Pending'
    });

    if (existingRequest) {
      return res.status(400).json({
        message: 'You already submitted an adoption request for this pet'
      });
    }

    const request = new AdoptionRequest({
      pet: req.params.petId,
      adopter: req.user.id,
      message,
      phone,
      address,
      status: 'Pending'
    });

    await request.save();

    res.status(201).json({
      message: 'Adoption request submitted successfully!',
      request
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});


// ==========================================
// 2. Get My Adoption Requests
// ==========================================
router.get('/my-requests', auth, async (req, res) => {
  try {
    const requests = await AdoptionRequest.find({
      adopter: req.user.id
    })
      .populate('pet')
      .populate('adopter', 'name email');

    res.json(requests);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});


// ==========================================
// 3. ADMIN - Get All Adoption Requests
// ==========================================
router.get('/admin/all', adminAuth, async (req, res) => {
  try {
    const requests = await AdoptionRequest.find()
      .populate('pet')
      .populate('adopter', 'name email');

    res.json(requests);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});


// ==========================================
// 4. ADMIN - Approve Adoption Request
// ==========================================
router.put('/admin/approve/:id', adminAuth, async (req, res) => {
  try {
    const request = await AdoptionRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: 'Adoption request not found'
      });
    }

    if (request.status !== 'Pending') {
      return res.status(400).json({
        message: 'This request has already been processed'
      });
    }

    const pet = await Pet.findById(request.pet);

    if (!pet) {
      return res.status(404).json({
        message: 'Pet not found'
      });
    }

    // Pet must still be available
    if (pet.status !== 'Available') {
      return res.status(400).json({
        message: 'This pet is no longer available'
      });
    }

    // Approve selected request
    request.status = 'Approved';
    await request.save();

    // Pet becomes adopted
    pet.status = 'Adopted';
    await pet.save();

    // Reject other pending requests for same pet
    await AdoptionRequest.updateMany(
      {
        pet: request.pet,
        _id: { $ne: request._id },
        status: 'Pending'
      },
      {
        $set: { status: 'Rejected' }
      }
    );

    res.json({
      message: 'Adoption approved successfully!',
      request,
      pet
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});


// ==========================================
// 5. ADMIN - Reject Adoption Request
// ==========================================
router.put('/admin/reject/:id', adminAuth, async (req, res) => {
  try {
    const request = await AdoptionRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: 'Adoption request not found'
      });
    }

    if (request.status !== 'Pending') {
      return res.status(400).json({
        message: 'This request has already been processed'
      });
    }

    request.status = 'Rejected';

    await request.save();

    res.json({
      message: 'Adoption request rejected successfully!',
      request
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});


module.exports = router;
