const mongoose = require('mongoose');
const rewardOfferSchema = new mongoose.Schema({
  type: { type: String, required: true },      // Coupon/offer name
  pointsRequired: { type: Number, required: true },
  description: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('RewardOffer', rewardOfferSchema);
