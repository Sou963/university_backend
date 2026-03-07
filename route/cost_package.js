const express = require("express");
const router = express.Router();
const Package = require("../model/costpak");


// ================= ADD PACKAGE =================
router.post("/add", async (req, res) => {
  try {
    const {
      studentId,
      packageCode,
      packageName,
      serialNumber,
      currency,
      isActive,
      costRates
    } = req.body;

    const newPackage = new Package({
      studentId,
      packageCode,
      packageName,
      serialNumber,
      currency,
      isActive,
      costRates
    });

    await newPackage.save();

    res.json({ message: "Package Added Successfully", newPackage });

  } catch (error) {
    res.status(500).json({ message: "Error adding package", error: error.message });
  }
});


// ================= GET BY STUDENT ID =================
router.get("/student/:studentId", async (req, res) => {
  try {
    const packages = await Package.find({ studentId: req.params.studentId });

    if (!packages.length) {
      return res.status(404).json({ message: "No package found" });
    }

    res.json(packages);

  } catch (error) {
    res.status(500).json({ message: "Error fetching package", error: error.message });
  }
});

module.exports = router;