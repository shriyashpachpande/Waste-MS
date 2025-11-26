const Vehicle = require('../models/Vehicle');
const Route = require('../models/Route');

exports.listVehicles = async (req, res) => {
  try {
    const user = req.user || null;

    // Worker-only filtering
    if (req.query.workerOnly && user?.role === "WORKER") {
      const result = await Vehicle.find({ driverId: user._id });
      return res.json(result);
    }

    // Filter by regNo
    if (req.query.regNo) {
      const v = await Vehicle.findOne({ regNo: req.query.regNo });
      return res.json(v ? [v] : []);
    }

    // All vehicles
    const vehicles = await Vehicle.find()
      .populate("routeId")
      .populate("driverId");

    res.json(vehicles);
  } catch (err) {
    console.error("VehicleController error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.createVehicle = async (req, res) => {
  const v = await Vehicle.create({
    ...req.body,
    lastUpdate: new Date()
  });
  res.json(v);
};
exports.editVehicle = async (req, res) => {
  const v = await Vehicle.findByIdAndUpdate(req.params.id, {
    ...req.body,
    lastUpdate: new Date()
  }, { new: true });
  res.json(v);
};
exports.deleteVehicle = async (req, res) => {
  await Vehicle.findByIdAndDelete(req.params.id);
  res.json({ deleted: true });
};
exports.updateLocation = async (req, res) => {
  const { lat, lon } = req.body;
  const vehicle = await Vehicle.findById(req.params.id);
  if (!vehicle) return res.status(404).json({ message: 'Not found' });
  vehicle.currentCoords = { lat, lon };
  vehicle.lastUpdate = new Date();
  await vehicle.save();
  res.json(vehicle);
};
