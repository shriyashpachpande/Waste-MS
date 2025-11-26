const router = require('express').Router();
const {
  listRegistrations,
  approveRegistration,
  rejectRegistration,
  editUser,
  deleteUser
} = require('../controllers/adminController');
const auth = require('../middlewares/auth');
const roles = require('../middlewares/roles');

// Only admins
router.get('/registrations', auth, roles('ULB_ADMIN', 'SUPER_ADMIN'), listRegistrations);
router.post('/registrations/:id/approve', auth, roles('ULB_ADMIN', 'SUPER_ADMIN'), approveRegistration);
router.post('/registrations/:id/reject', auth, roles('ULB_ADMIN', 'SUPER_ADMIN'), rejectRegistration);
router.put('/users/:id', auth, roles('ULB_ADMIN', 'SUPER_ADMIN'), editUser);
router.delete('/users/:id', auth, roles('ULB_ADMIN', 'SUPER_ADMIN'), deleteUser);

module.exports = router;
