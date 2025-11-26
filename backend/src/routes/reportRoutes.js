const router = require('express').Router();
const multer = require("multer");
const {
  createReport,
  getReportAction,
  getMyReports,
  getAllReports,
  updateStatus
} = require('../controllers/reportController');
const auth = require('../middlewares/auth');








// Multer storage with original filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "..", "uploads"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.fieldname + "-" + Date.now() + ext;
    cb(null, name);
  },
});

const upload = multer({ storage });

// POST report
router.post("/", auth, upload.array("photos"), createReport);






router.post('/', auth, createReport);
router.get('/me', auth, getMyReports);
router.get('/', auth, getAllReports);
router.get('/:id/action', auth, getReportAction);
// Worker/admin update
router.post('/:id/status', auth, updateStatus);


module.exports = router;


