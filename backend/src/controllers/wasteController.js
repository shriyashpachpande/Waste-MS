const WasteRecord = require('../models/WasteRecord');
const { uploadPhoto } = require('../services/photoStorage');
const logger = require('../utils/logger');
const geo = require('../utils/geo');
const audit = require('../utils/audit');

exports.createWaste = async (req, res) => {
  try {
    const { type, weightKg, lat, lon } = req.body;
    logger.info(`User ${req.user._id} creating waste record`);

    const record = await WasteRecord.create({
      generatorId: req.user._id,
      type,
      weightKg,
      statusHistory: [{
        status: 'GENERATED',
        by: req.user._id,
        timestamp: new Date(),
        coords: lat && lon ? { lat, lon } : undefined,
        photo: null
      }],
      currentStatus: 'GENERATED'
    });

    audit.auditTrail({
      userId: req.user._id,
      action: 'CREATE_WASTE',
      resource: record._id,
      outcome: 'success'
    });

    res.json(record);
  } catch (err) {
    logger.error(`Failed to create waste: ${err.message}`);
    audit.auditTrail({
      userId: req.user?._id,
      action: 'CREATE_WASTE',
      resource: '-',
      outcome: `error: ${err.message}`
    });
    res.status(500).json({ message: "Failed to create waste record." });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status, coords, lat, lon } = req.body;
    let photoUrl = null;
    if (req.file) photoUrl = await uploadPhoto(req.file);
    const record = await WasteRecord.findById(req.params.id);
    if (!record) return res.status(404).json({ message: 'Not found' });

    if (record.statusHistory.length && lat && lon) {
      const last = record.statusHistory[record.statusHistory.length - 1];
      if (last.coords) {
        const dist = geo.haversine(last.coords.lat, last.coords.lon, lat, lon);
        logger.info(`Status update distance for waste ${record._id}: ${dist} km`);
      }
    }

    record.statusHistory.push({
      status,
      by: req.user._id,
      timestamp: new Date(),
      coords: lat && lon ? { lat, lon } : coords,
      photo: photoUrl
    });
    record.currentStatus = status;
    await record.save();

    audit.auditTrail({
      userId: req.user._id,
      action: 'UPDATE_WASTE_STATUS',
      resource: req.params.id,
      outcome: 'success'
    });
    res.json(record);
  } catch (err) {
    logger.error(`Failed to update waste: ${err.message}`);
    audit.auditTrail({
      userId: req.user?._id,
      action: 'UPDATE_WASTE_STATUS',
      resource: req.params.id,
      outcome: `error: ${err.message}`
    });
    res.status(500).json({ message: "Failed to update waste record." });
  }
};

exports.getWaste = async (req, res) => {
  try {
    const record = await WasteRecord.findById(req.params.id);
    if (!record) return res.status(404).json({ message: 'Not found' });
    res.json(record);
  } catch (err) {
    logger.error(`Error fetching waste: ${err.message}`);
    res.status(500).json({ message: "Error fetching waste record." });
  }
};

exports.listWaste = async (req, res) => {
  try {
    const { area, status } = req.query;
    const query = {};

    // Area/location and status filter    
    if (area) query['location'] = area;
    if (status) query['currentStatus'] = status;

    if (req.user.role === "CITIZEN") {
      // Citizen: only own records
      query['generatorId'] = req.user._id;
    } else if (req.user.role === "WORKER") {
      // Worker: assigned area AND status filter
      // Example: req.user.assignedArea exists (string code/name)
      if (req.user.assignedArea) {
        query['location'] = req.user.assignedArea;
      }
      // Worker sees only relevant statuses
      const statusList = ["PENDING", "GENERATED", "COLLECTED"];
      if (!status) {
        query['currentStatus'] = { $in: statusList };
      }
    }
    // Admin — no filter, see all

    const records = await WasteRecord.find(query);
    res.json(records);
  } catch (err) {
    logger.error(`Error listing waste: ${err.message}`);
    res.status(500).json({ message: "Error listing waste records." });
  }
};
