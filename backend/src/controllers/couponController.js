const Coupon = require('../models/Coupon');
const User = require('../models/User');

// Coupon redemption endpoint
exports.redeemCoupon = async (req, res) => {
  const userId = req.user._id;
  const { voucherType } = req.body;

  // Step 1: Find voucher details
  const available = couponRewards.find(x => x.type === voucherType);
  if (!available) return res.status(400).json({ message: "Invalid reward type" });

  // Step 2: Check points
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });
  if (user.points < available.pointsRequired) return res.status(400).json({ message: "Not enough points" });

  // Step 3: Deduct points, create coupon
  user.points -= available.pointsRequired;
  await user.save();

  const code = voucherType.substring(0,3).toUpperCase() + Math.floor(Math.random()*1000000);
  const coupon = await Coupon.create({
    userId,
    code,
    voucherType,
    pointsRedeemed: available.pointsRequired,
    claimed: true
  });

  res.json({ coupon });
};
