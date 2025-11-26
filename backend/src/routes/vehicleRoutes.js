const router = require('express').Router();
const {
  listVehicles, createVehicle, editVehicle, deleteVehicle,
  updateLocation
} = require('../controllers/vehicleController');
const auth = require('../middlewares/auth');
const roles = require('../middlewares/roles');

// Public for map
router.get('/', listVehicles);
// Search by regNo
router.get('/search', listVehicles);

// CRUD admin only
router.post('/', auth, roles('ULB_ADMIN', 'SUPER_ADMIN'), createVehicle);
router.put('/:id', auth, roles('ULB_ADMIN', 'SUPER_ADMIN'), editVehicle);
router.delete('/:id', auth, roles('ULB_ADMIN', 'SUPER_ADMIN'), deleteVehicle);

// Location update by tracker/worker
router.post('/:id/location', auth, updateLocation);
router.put('/:id/location', updateLocation);
module.exports = router;
