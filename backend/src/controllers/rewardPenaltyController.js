const Reward = require('../models/Reward');
const Penalty = require('../models/Penalty');
const User = require('../models/User');

exports.awardPoints = async (req, res) => {
  const { userId, points, reason } = req.body;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'Not found' });
  user.points += points;
  await user.save();
  await Reward.create({ userId, points, reason });
  res.json({ awarded: true });
};


// Existing code...
exports.getUserRewards = async (req, res) => {
  const userId = req.user._id; // userId from auth middleware after login
  const rewards = await Reward.find({ userId }).sort({ date: -1 }); // recent first
  res.json(rewards);
};




exports.issuePenalty = async (req, res) => {
  const { userId, amount, reason } = req.body;
  await Penalty.create({ userId, amount, reason, paid: false });
  res.json({ penalized: true });
};
