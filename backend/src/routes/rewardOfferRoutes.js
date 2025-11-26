const router = require('express').Router();
const { createOffer, getAllOffers, updateOffer, deleteOffer } = require('../controllers/rewardOfferController');
const auth = require('../middlewares/auth');
const roles = require('../middlewares/roles');

// GET all offers
router.get('/', auth, getAllOffers);

// Add offer (admin only)
router.post('/', auth, roles('ULB_ADMIN', 'SUPER_ADMIN'), createOffer);

// Edit offer (admin only)
router.patch('/:id', auth, roles('ULB_ADMIN', 'SUPER_ADMIN'), updateOffer);

// Delete offer (admin only)
router.delete('/:id', auth, roles('ULB_ADMIN', 'SUPER_ADMIN'), deleteOffer);

module.exports = router;
