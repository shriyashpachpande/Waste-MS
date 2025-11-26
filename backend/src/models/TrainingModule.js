const mongoose = require('mongoose');
const trainingModuleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videos: [{ type: String }],
  lessons: [{ type: String }],
  mcqs: [{
    question: String,
    options: [String],
    correct: Number
  }],
  passingScore: Number,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
module.exports = mongoose.model('TrainingModule', trainingModuleSchema);
