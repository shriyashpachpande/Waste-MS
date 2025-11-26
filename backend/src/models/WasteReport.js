const mongoose = require('mongoose');

const wasteReportSchema = new mongoose.Schema({
  reporterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  photos: [{ type: String }],
  coords: { lat: Number, lon: Number },
  description: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Green Champion/Worker
  status: { type: String, enum: ['PENDING', 'IN_PROGRESS', 'RESOLVED'], default: 'PENDING' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WasteReport', wasteReportSchema);
