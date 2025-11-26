const router = require('express').Router();
const { createWaste, updateStatus, getWaste, listWaste } = require('../controllers/wasteController');
const auth = require('../middlewares/auth');
router.post('/', auth, createWaste);
router.patch('/:id/status', auth, updateStatus);
router.get('/:id', auth, getWaste);
router.get('/', auth, listWaste);

module.exports = router;
