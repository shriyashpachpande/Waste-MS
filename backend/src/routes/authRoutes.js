const router = require('express').Router();
const { register, login, refresh, me } = require('../controllers/authController');
const validate = require('../middlewares/validate');
const rateLimit = require('../middlewares/rateLimit');
const upload = require('../middlewares/upload');
const auth = require('../middlewares/auth');
const User = require('../models/User');

router.post('/register', upload.single('kycDocs'), rateLimit, validate, register);
router.post('/login', rateLimit, validate, login);
router.post('/refresh', refresh);
router.get('/me', auth, me);

// router.get("/create-admin", async (req, res) => {
//   try {
//     const bcrypt = require("bcrypt");

//     const hashed = await bcrypt.hash("admin2025", 10);

//     const user = await User.create({
//       name: "Admin User",            // REQUIRED
//       email: "admin@gmail.com",      // REQUIRED
//       passwordHash: hashed,          // MUST MATCH MODEL FIELD NAME
//       role: "SUPER_ADMIN"            // MUST BE FROM ENUM
//     });

//     res.json({ success: true, user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// });




module.exports = router;
