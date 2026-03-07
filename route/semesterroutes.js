const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Semester = require("../model/semester");

// POST /add
router.post("/add", async (req, res) => {
  try {
    const fields = [
      "semesterName", // Add this
      "registrationStartDate","registrationEndDate",
      "classStartDate","classEndDate",
      "firstInstallmentLastDate","secondInstallmentLastDate","thirdInstallmentLastDate",
      "semesterDropLastDate","addDropStartDate","addDropEndDate",
      "midTermStartDate","midTermEndDate",
      "finalExamStartDate","finalExamEndDate",
      "terFillUpStartDate","terFillUpEndDate"
    ];

    const data = {};
    fields.forEach(f => {
      if (req.body[f]) {
        // Only convert to Date if it's NOT the semesterName
        data[f] = f === "semesterName" ? req.body[f] : new Date(req.body[f]);
      }
    });

    const semesterDoc = new Semester(data);
    await semesterDoc.save();

    res.json({
      message: "Semester added successfully",
      database: mongoose.connection.name,
      collection: Semester.collection.name
    });
  } catch (err) {
    res.status(500).json({ message: "Error adding semester", error: err.message });
  }
});

// GET /show
router.get("/show", async (req, res) => {
  try {
    const data = await Semester.find();
    res.json({
      database: mongoose.connection.name, // your DB name
      collection: Semester.collection?.name || "unknown", // your collection name
      total: data.length,
      data,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching semesters", error: err.message });
  }
});

module.exports = router;
