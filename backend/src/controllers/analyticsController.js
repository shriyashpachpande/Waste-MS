const WasteRecord = require('../models/WasteRecord');

exports.summary = async (req, res) => {
  const generated = await WasteRecord.countDocuments({ currentStatus: 'GENERATED' });
  const processed = await WasteRecord.countDocuments({ currentStatus: 'COMPLETED' });
  res.json({ generated, processed });
};

exports.segregation = async (req, res) => {
  const segregatedStatuses = ['SEGREGATED_AT_SOURCE', 'FACILITY_SEGREGATION', 'COMPLETED'];
  const segregated = await WasteRecord.countDocuments({
    currentStatus: { $in: segregatedStatuses }
  });
  const total = await WasteRecord.countDocuments({});
  res.json({ segregated, total });
};


exports.leaderboard = async (req, res) => {
  // city param API se lo
  const city = req.query.city;
  // Agar city hai toh usi se filter karo, nahi toh sab show karo!
  const query = city ? { city } : {}; // dynamic filter
  const leaderboard = await require('../models/User')
    .find(query)
    .sort({ points: -1 })
    .limit(10);
  res.json({ leaderboard });
};

exports.complaintsHeatmap = async (req, res) => {
  // aggregate location clusters from WasteReport
  const area = req.query.area;
  const heatmap = await require('../models/WasteReport').aggregate([
    { $match: { /* filter by area if needed */ } },
    { $group: { _id: "$coords", count: { $sum: 1 } } }
  ]);
  res.json({ heatmap });
};

exports.predict = async (req, res) => {
  // Placeholder for ML - load model.json
  const { inputs } = req.body;
  const model = require('../../model.json');
  // Dummy: just echo input
  res.json({ prediction: model.example_output, inputs });
};
