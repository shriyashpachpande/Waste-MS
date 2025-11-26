const WasteReport = require('../models/WasteReport');
const GreenChampionAction = require('../models/GreenChampionAction');

exports.resolveReport = async (req, res) => {
  const report = await WasteReport.findById(req.params.id);
  if (!report) return res.status(404).json({ message: 'Not found' });
  report.status = 'RESOLVED';
  await report.save();
  await GreenChampionAction.create({
    reportId: req.params.id,
    actionBy: req.user._id,
    notes: req.body.notes
  });
  res.json({ message: 'Report resolved' });
};

exports.getAuditLogs = async (req, res) => {
  const logs = await GreenChampionAction.find({ actionBy: req.user._id })
    .populate('reportId')
    .sort({ timestamp: -1 });

  res.json(logs);
};
