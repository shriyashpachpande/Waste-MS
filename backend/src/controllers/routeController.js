const Route = require('../models/Route');
exports.listRoutes = async (req, res) => {
  res.json(await Route.find());
};
exports.createRoute = async (req, res) => {
  res.json(await Route.create(req.body));
};
exports.editRoute = async (req, res) => {
  res.json(await Route.findByIdAndUpdate(req.params.id, req.body, { new: true }));
};
exports.deleteRoute = async (req, res) => {
  await Route.findByIdAndDelete(req.params.id);
  res.json({ deleted: true });
};
