const Facility = require('../models/Facility');

// List (public)
exports.listFacilities = async (req, res) => {
  res.json(await Facility.find());
};

// Create (admin/worker only)
exports.createFacility = async (req, res) => {
  const facility = await Facility.create(req.body);
  res.json(facility);
};

// Edit (admin/worker only)
exports.updateFacility = async (req, res) => {
  const updated = await Facility.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// Delete (admin/worker only)
exports.deleteFacility = async (req, res) => {
  await Facility.findByIdAndDelete(req.params.id);
  res.json({ deleted: true });
};
