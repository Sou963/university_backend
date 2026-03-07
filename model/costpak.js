const mongoose = require("mongoose");

const costRateSchema = new mongoose.Schema({
  costHead: String,
  costAmount: Number,
  frequencyType: String
}, { _id: false });

const packageSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true
  },
  packageCode: String,
  packageName: String,
  serialNumber: String,
  currency: String,
  isActive: {
    type: Boolean,
    default: true
  },
  costRates: [costRateSchema]
}, { timestamps: true });

module.exports = mongoose.model("Costpackage", packageSchema);