const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student"
  }
}, { timestamps: true });

module.exports = mongoose.model("auth", authSchema);
