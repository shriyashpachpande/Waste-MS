const router = require('express').Router();
const { listItems, createOrder, addItem, deleteItem } = require('../controllers/shopController');
const auth = require('../middlewares/auth');
const roles = require('../middlewares/roles');

// Public list
router.get('/items', listItems);
// Order
router.post('/order', auth, createOrder);
// Admin-only add/delete
router.post('/items', auth, roles('ULB_ADMIN', 'SUPER_ADMIN'), addItem);
router.delete('/items/:id', auth, roles('ULB_ADMIN', 'SUPER_ADMIN'), deleteItem);
module.exports = router;
