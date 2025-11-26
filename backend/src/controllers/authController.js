const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendMail } = require('../services/mailer');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { name, email, password, role, address, city, coords } = req.body;
  const kycDocFile = req.file;
  if (!name || !email || !password || !role) return res.status(400).json({ message: 'Missing fields.' });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash, role, kycDocFile, address, city, coords, status: 'PENDING' });

  // Notify ULB admins & super admins

  
  const admins = await User.find({ role: { $in: ['ULB_ADMIN', 'SUPER_ADMIN'] }, status: 'ACTIVE' });
  admins.forEach(admin => sendMail({ to: admin.email, subject: 'New Registration Pending', html: `Review at /admin/registrations/${user._id}` }));
  console.log(req.body)
  res.status(201).json({ message: 'Registration pending admin approval.' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'User not found.' });
  if (user.status !== 'ACTIVE') return res.status(403).json({ message: 'User not active.' });
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(401).json({ message: 'Incorrect password.' });

  const payload = { id: user._id, role: user.role };
  const jwtSecret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

  res.json({ token, refreshToken, user });
};

exports.refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const data = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const token = jwt.sign({ id: data.id, role: data.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch {
    res.status(401).json({ message: 'Invalid refresh token.' });
  }
};

exports.me = async (req, res) => {
  res.json({ user: req.user });
};
