const mongoose = require('mongoose');
const recyclingCentreSchema = new mongoose.Schema({
  name: String,
  coords: { lat: Number, lon: Number },
  contact: String
});
module.exports = mongoose.model('RecyclingCentre', recyclingCentreSchema);
