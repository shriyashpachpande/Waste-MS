const User = require('../models/User');
const { sendMail } = require('../services/mailer');

exports.listRegistrations = async (req, res) => {
  const pending = await User.find({ status: 'PENDING' });
  res.json(pending);
};

exports.approveRegistration = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user || user.status !== 'PENDING') return res.status(404).json({ message: 'Not found or not pending.' });
  user.status = 'ACTIVE';
  await user.save();
  sendMail({
    to: user.email,
    subject: 'Your Registration Approved',
    html: `Welcome to Smart Waste Management Platform! Access your dashboard.`
  });
  res.json({ message: 'User approved.' });
};

exports.rejectRegistration = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user || user.status !== 'PENDING') return res.status(404).json({ message: 'Not found or not pending.' });
  user.status = 'REJECTED';
  await user.save();
  sendMail({
    to: user.email,
    subject: 'Registration Rejected',
    html: `Unfortunately, your registration was rejected. Reason: ${req.body.reason || 'KYC/Info incomplete.'}`
  });
  res.json({ message: 'User rejected.' });
};

// Admin can edit or delete users
exports.editUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted.' });
};
