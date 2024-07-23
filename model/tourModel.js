const mongoose = require('mongoose');

// Tour schema
const tourSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  rating: { type: Number, default: 4.5 },
  price: { type: Number, required: [true, 'A tour must have a name'] },
});

// Tour model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
