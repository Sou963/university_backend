const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  courseCode: String,
  courseTitle: String,
  credit: Number,
  mark: Number,
  grade: String,
  gradePoint: Number
},{ _id:false });

const registrationSchema = new mongoose.Schema({

  studentId:{
    type:String,
    required:true
  },

  semesterRegistrationId:{
    type:String,
    required:true
  },

  semester:String,

  subjects:[subjectSchema]

},{timestamps:true});

// Use a dedicated model/collection for results (avoid clashing with Course model)
module.exports = mongoose.model("Result", registrationSchema);
