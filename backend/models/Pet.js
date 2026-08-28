const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // Dog, Cat, Bird, etc.
  age: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, default: '' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pet', petSchema);