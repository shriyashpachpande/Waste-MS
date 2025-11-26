const router = require('express').Router();
const {
  listModules,
  getModule,
  createModule,
  submitQuiz,
  getCertificate
} = require('../controllers/trainingController');
const auth = require('../middlewares/auth');
const roles = require('../middlewares/roles');

router.get('/', auth, listModules);
router.get('/:id', auth, getModule);
router.post('/', auth, roles('ULB_ADMIN', 'SUPER_ADMIN'), createModule);
router.post('/:id/submit-quiz', auth, submitQuiz);
router.get('/:id/certificate', auth, getCertificate);

module.exports = router;
