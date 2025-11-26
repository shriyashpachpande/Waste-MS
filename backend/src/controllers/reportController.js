const WasteReport = require('../models/WasteReport');
const { uploadPhoto } = require('../services/photoStorage');
const User = require('../models/User');

/* (1) File a new report (+10 points!) */
// exports.createReport = async (req, res) => {
//   const { coords, description } = req.body;
//   let photos = [];
//   if (req.files) {
//     photos = await Promise.all(req.files.map(async f => await uploadPhoto(f)));
//   }
//   // Assign to random active Green Champion in user's city
//   const champions = await User.find({ role: 'GREEN_CHAMPION', status: 'ACTIVE', city: req.user.city });
//   const assignedTo = champions.length ? champions[Math.floor(Math.random() * champions.length)]._id : null;
//   const report = await WasteReport.create({ reporterId: req.user._id, photos, coords, description, assignedTo });

//   // Add +10 points to user
//   await User.findByIdAndUpdate(req.user._id, { $inc: { points: 10 } });

//   res.json(report);
// };

exports.createReport = async (req, res) => {
  try {
    // Description
    const description = req.body.description || "";

    // Coords
    let coords = { lat: 0, lon: 0 };
    if (req.body.coords) {
      try {
        coords = JSON.parse(req.body.coords);
      } catch (err) { coords = { lat: 0, lon: 0 }; }
    }

    // Photos optional
    const photos = req.files ? req.files.map(f => "/uploads/" + f.filename) : [];

    // Assign champion
    const champions = await User.find({ role: "GREEN_CHAMPION", status: "ACTIVE", city: req.user.city });
    const assignedTo = champions.length ? champions[Math.floor(Math.random() * champions.length)]._id : null;

    // Create report
    const report = await WasteReport.create({
      reporterId: req.user._id,
      photos,
      coords,
      description,
      assignedTo
    });

    // Add +10 points
    await User.findByIdAndUpdate(req.user._id, { $inc: { points: 10 } });

    res.json({ message: "Report filed! +10 points.", report });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};


// exports.createReport = async (req, res) => {
//   // 🔹 coords parse karna (FormData se string ke roop me)
//   let coords = { lat: 0, lon: 0 };
//   if (req.body.coords) {
//     try {
//       coords = JSON.parse(req.body.coords);
//     } catch (err) {
//       coords = { lat: 0, lon: 0 };
//     }
//   }

//   // 🔹 description
//   const description = req.body.description || "";

//   // 🔹 photos (optional)
//   let photos = [];
//   if (req.files && req.files.length > 0) {
//     photos = await Promise.all(req.files.map(f => uploadPhoto(f)));
//   }

//   // 🔹 assign champion
//   const champions = await User.find({ role: 'GREEN_CHAMPION', status: 'ACTIVE', city: req.user.city });
//   const assignedTo = champions.length ? champions[Math.floor(Math.random() * champions.length)]._id : null;

//   const report = await WasteReport.create({
//     reporterId: req.user._id,
//     photos,
//     coords,
//     description,
//     assignedTo
//   });

//   await User.findByIdAndUpdate(req.user._id, { $inc: { points: 10 } });

//   res.json({ message: "Report filed! +10 points.", report });
// };


/* (2) My reports (user) */
exports.getMyReports = async (req, res) => {
  const reports = await WasteReport.find({ reporterId: req.user._id });
  res.json(reports);
};

/* (3) Admin/worker/all reports (user will only see their own - backend protects) */
exports.getAllReports = async (req, res) => {
  let filter = {};
  if (req.user.role === 'USER') filter = { reporterId: req.user._id };
  const reports = await WasteReport.find(filter);
  res.json(reports);
};

/* (4) Report details (only reporter, admin, worker) */
exports.getReportAction = async (req, res) => {
  const report = await WasteReport.findById(req.params.id);
  if (!report) return res.status(404).json({ message: 'Not found' });

  // Only reporter, worker, admin can see
  if (
    req.user.role === 'USER' &&
    String(report.reporterId) !== String(req.user._id)
  ) {
    return res.status(403).json({ message: "Access denied." });
  }
  res.json(report);
};

/* (5) Worker/Admin can update status */
exports.updateStatus = async (req, res) => {
  if (
    req.user.role !== 'WORKER' &&
    req.user.role !== 'GREEN_CHAMPION' &&
    req.user.role !== 'ADMIN'
  ) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const statuses = ['PENDING', 'IN_PROGRESS', 'RESOLVED'];
  const { status } = req.body;
  if (!statuses.includes(status)) return res.status(400).json({ message: 'Invalid status' });

  const report = await WasteReport.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  res.json(report);
};
