const mongoose = require('mongoose');
const penaltySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  buildingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Building' },
  amount: Number,
  reason: String,
  date: { type: Date, default: Date.now },
  paid: { type: Boolean, default: false }
});
module.exports = mongoose.model('Penalty', penaltySchema);
