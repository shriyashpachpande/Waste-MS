const mongoose = require('mongoose');
const greenChampionActionSchema = new mongoose.Schema({
  reportId: { type: mongoose.Schema.Types.ObjectId, ref: 'WasteReport' },
  actionBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  notes: String,
  timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('GreenChampionAction', greenChampionActionSchema);
