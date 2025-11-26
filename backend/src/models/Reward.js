const mongoose = require('mongoose');
const rewardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  points: Number,
  reason: String,
  date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Reward', rewardSchema);
