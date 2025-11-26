const router = require('express').Router();
const { listRoutes, createRoute, editRoute, deleteRoute } = require('../controllers/routeController');
const auth = require('../middlewares/auth');
const roles = require('../middlewares/roles');

// Public list
router.get('/', listRoutes);

// Admin-only CRUD
router.post('/', auth, roles('ULB_ADMIN', 'SUPER_ADMIN'), createRoute);
router.put('/:id', auth, roles('ULB_ADMIN', 'SUPER_ADMIN'), editRoute);
router.delete('/:id', auth, roles('ULB_ADMIN', 'SUPER_ADMIN'), deleteRoute);

module.exports = router;
