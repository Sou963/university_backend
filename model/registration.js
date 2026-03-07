const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth"
  },
  level: String,
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  }],
  totalCredit: Number
}, { timestamps: true });

module.exports = mongoose.model("registration", registrationSchema);
