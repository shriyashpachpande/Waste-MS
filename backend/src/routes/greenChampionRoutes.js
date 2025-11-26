// const router = require('express').Router();
// const { resolveReport } = require('../controllers/greenChampionController');
// const auth = require('../middlewares/auth');
// const roles = require('../middlewares/roles');

// router.post('/reports/:id/resolve', auth, roles('GREEN_CHAMPION', 'ULB_ADMIN', 'SUPER_ADMIN'), resolveReport);

// module.exports = router;



const router = require('express').Router();
const { resolveReport, getAuditLogs } = require('../controllers/greenChampionController');
const auth = require('../middlewares/auth');
const roles = require('../middlewares/roles');

// resolve report
router.post(
  '/reports/:id/resolve',
  auth,
  roles('GREEN_CHAMPION', 'ULB_ADMIN', 'SUPER_ADMIN'),
  resolveReport
);

// NEW: audit logs
router.get(
  '/audit-logs',
  auth,
  roles('GREEN_CHAMPION', 'ULB_ADMIN', 'SUPER_ADMIN'),
  getAuditLogs
);

module.exports = router;
