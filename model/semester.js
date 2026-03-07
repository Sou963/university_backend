const mongoose = require("mongoose");

const semesterSchema = new mongoose.Schema({
  // Add this field
  semesterName: { type: String, required: true }, 
  
  registrationStartDate: Date,
  registrationEndDate: Date,
  classStartDate: Date,
  classEndDate: Date,
  firstInstallmentLastDate: Date,
  secondInstallmentLastDate: Date,
  thirdInstallmentLastDate: Date,
  semesterDropLastDate: Date,
  addDropStartDate: Date,
  addDropEndDate: Date,
  midTermStartDate: Date,
  midTermEndDate: Date,
  finalExamStartDate: Date,
  finalExamEndDate: Date,
  terFillUpStartDate: Date,
  terFillUpEndDate: Date,
});

module.exports = mongoose.model("Semester", semesterSchema, "semester_reg");