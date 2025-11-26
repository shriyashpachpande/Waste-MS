const mongoose = require('mongoose');
const couponSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  code: String,
  voucherType: String,
  pointsRedeemed: Number,
  claimed: { type: Boolean, default: false },
  issuedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Coupon', couponSchema);
