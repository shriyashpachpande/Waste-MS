const router = require('express').Router();
const {
  listFacilities,
  createFacility,
  updateFacility,
  deleteFacility,
} = require('../controllers/facilityController');
const auth = require('../middlewares/auth');
const roles = require('../middlewares/roles');

// List (public, no auth/role protect)
router.get('/', listFacilities);

// CRUD - admin/worker/super only
router.post('/', auth, roles('ULB_ADMIN', 'WORKER', 'SUPER_ADMIN'), createFacility);
router.put('/:id', auth, roles('ULB_ADMIN', 'WORKER', 'SUPER_ADMIN'), updateFacility);
router.delete('/:id', auth, roles('ULB_ADMIN', 'WORKER', 'SUPER_ADMIN'), deleteFacility);

module.exports = router;
