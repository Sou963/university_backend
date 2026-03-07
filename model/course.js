const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  mark: Number,
  grade: String,
  gradePoint: Number
}, { _id: false }); // no separate _id for each result

const courseSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true
  },
  courseCode: {
    type: String,
    required: true
  },
  courseTitle: {
    type: String,
    required: true
  },
  level: {
    type: String
  },
  credit: {
    type: Number
  },
  prerequisite: [{
    type: String
  }],
  section: {
    type: String,
    default: "A"
  },
  result: resultSchema // <-- Add result field
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);