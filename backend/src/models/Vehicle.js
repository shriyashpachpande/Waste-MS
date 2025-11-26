const mongoose = require('mongoose');
const vehicleSchema = new mongoose.Schema({
  regNo: { type: String, required: true, unique: true },
  type: { type: String, required: true }, // truck, mini, dumper etc.
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  driverName: String,
  driverPhone: String,
  currentCoords: { lat: Number, lon: Number },
  status: { type: String, enum: ['ACTIVE', 'INACTIVE', 'MAINTENANCE'], default: 'ACTIVE' },
  lastUpdate: Date,
  routeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' },
  deviceId: String, // hardware tracker (optional)
});
module.exports = mongoose.model('Vehicle', vehicleSchema);
