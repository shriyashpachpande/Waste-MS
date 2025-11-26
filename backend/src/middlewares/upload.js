// backend/src/middlewares/upload.js
const multer = require('multer');
const storage = multer.memoryStorage(); // ya destination based as per your saving method
const upload = multer({ storage });
module.exports = upload;
