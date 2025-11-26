const router = require('express').Router();
const {
  summary,
  segregation,
  leaderboard,
  complaintsHeatmap,
  predict
} = require('../controllers/analyticsController');
const auth = require('../middlewares/auth');

router.get('/summary', auth, summary);
router.get('/segregation', auth, segregation);
router.get('/leaderboard', auth, leaderboard);
router.get('/complaints-heatmap', auth, complaintsHeatmap);
router.post('/predict', auth, predict);

module.exports = router;
