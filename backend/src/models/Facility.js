const mongoose = require('mongoose');
const facilitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },  // e.g., Recycling, Composting
  address: String,
  city: String,
  contact: String,
  coords: {
    lat: Number,
    lon: Number
  },
  status: { type: String, default: "active" },    // active, maintenance
  capacity: Number,                               // in tonnes
  description: String,
});
module.exports = mongoose.model('Facility', facilitySchema);
