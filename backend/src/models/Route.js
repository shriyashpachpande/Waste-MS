const mongoose = require('mongoose');
const routeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stops: [{ lat: Number, lon: Number, label: String }],
  area: String,
  polyline: [{ lat: Number, lon: Number }],
});
module.exports = mongoose.model('Route', routeSchema);
