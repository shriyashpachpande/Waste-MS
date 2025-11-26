const mongoose = require('mongoose');
const wasteRecordSchema = new mongoose.Schema({
  generatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String }, // e.g., organic, recyclable
  weightKg: Number,
  statusHistory: [{
    status: {
      type: String,
      enum: ['GENERATED', 'SEGREGATED_AT_SOURCE', 'COLLECTED', 'TRANSPORTING', 'DUMPING_AREA', 'FACILITY_SEGREGATION', 'PROCESSING', 'COMPLETED']
    },
    by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: Date.now },
    coords: { lat: Number, lon: Number },
    photo: String
  }],
  currentStatus: {
    type: String,
    enum: ['GENERATED', 'SEGREGATED_AT_SOURCE', 'COLLECTED', 'TRANSPORTING', 'DUMPING_AREA', 'FACILITY_SEGREGATION', 'PROCESSING', 'COMPLETED'],
    default: 'GENERATED'
  }
});
module.exports = mongoose.model('WasteRecord', wasteRecordSchema);
