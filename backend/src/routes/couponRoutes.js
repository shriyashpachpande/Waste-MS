const router = require('express').Router();
const { redeemCoupon } = require('../controllers/couponController');
const auth = require('../middlewares/auth');

router.post('/redeem', auth, redeemCoupon);
module.exports = router;
