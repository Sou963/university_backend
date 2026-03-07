const express = require("express");
const router = express.Router();
const Waiver = require("../model/waiver");

// ================= ADD WAIVER =================
router.post("/add", async (req, res) => {
  try {
    const { studentId, waiverCode, waiverName, totalAllowedWaiver, isActive } =
      req.body;

    const waiver = new Waiver({
      studentId,
      waiverCode,
      waiverName,
      totalAllowedWaiver,
      isActive,
    });

    await waiver.save();

    res.json({
      message: "Waiver Added Successfully",
      waiver,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding waiver",
      error: error.message,
    });
  }
});

// ================= GET WAIVER BY STUDENT ID =================
router.get("/student/:studentId", async (req, res) => {
  try {
    const waiver = await Waiver.find({ studentId: req.params.studentId });

    if (!waiver.length) {
      return res.status(404).json({
        message: "No waiver found for this student",
      });
    }

    res.json(waiver);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching waiver",
      error: error.message,
    });
  }
});

module.exports = router;
