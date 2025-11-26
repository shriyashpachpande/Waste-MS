const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['CITIZEN', 'WORKER', 'GREEN_CHAMPION', 'ULB_ADMIN', 'SUPER_ADMIN'], required: true },
  status: { type: String, enum: ['PENDING', 'ACTIVE', 'REJECTED'], default: 'PENDING' },
  kycDocs: [{ type: String }], // cloud/local URLs
  address: String,
  city: String,
  coords: { lat: Number, lon: Number },
  points: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('User', userSchema);
