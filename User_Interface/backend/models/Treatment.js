const mongoose = require('mongoose');

const TreatmentSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  status: {
    type: String
  },
  tests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'test' }],
  date: {
    type: Date,
    default: Date.now()
  },
  summary: {
    type: String
  }
});

const Treatment = mongoose.model('treatment', TreatmentSchema);

module.exports = { Treatment };
