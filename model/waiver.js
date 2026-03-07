const mongoose = require("mongoose");

const waiverSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true
  },
  waiverCode: {
    type: String,
    required: true
  },
  waiverName: {
    type: String,
    required: true
  },
  totalAllowedWaiver: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Waiver", waiverSchema);