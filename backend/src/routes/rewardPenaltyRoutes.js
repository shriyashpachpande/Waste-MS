const router = require('express').Router();
const { awardPoints, issuePenalty } = require('../controllers/rewardPenaltyController');
const auth = require('../middlewares/auth');
const roles = require('../middlewares/roles');
const { getUserRewards } = require('../controllers/rewardPenaltyController');

router.post('/reward', auth, roles('ULB_ADMIN', 'SUPER_ADMIN'), awardPoints);
router.post('/penalty', auth, roles('ULB_ADMIN', 'SUPER_ADMIN'), issuePenalty);
router.get('/reward', auth, getUserRewards); // <-- Add this new route!

module.exports = router;
