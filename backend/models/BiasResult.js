const mongoose = require('mongoose');

const biasResultSchema = new mongoose.Schema({
  modelName: { type: String, required: true },
  metricType: { type: String, enum: ['WEAT', 'StereoSet', 'CrowS-Pairs'], required: true },
  score: { type: Number, required: true },
  details: { type: Object },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BiasResult', biasResultSchema);
