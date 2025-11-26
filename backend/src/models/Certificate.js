const mongoose = require('mongoose');
const certificateSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  trainingId: { type: mongoose.Schema.Types.ObjectId, ref: 'TrainingModule' },
  score: Number,
  issuedAt: { type: Date, default: Date.now },
  certificateUrl: String
});
module.exports = mongoose.model('Certificate', certificateSchema);
