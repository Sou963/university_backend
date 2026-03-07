const express = require("express");
const router = express.Router();
const Financial = require("../model/fin");

// ================= ADD FINANCIAL DATA =================
router.post("/add", async (req, res) => {
  try {
    const financial = new Financial(req.body);
    await financial.save();
    res.json({ message: "Financial Data Saved", financial });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= GET BY STUDENT ID =================
router.get("/student/:studentId", async (req, res) => {
  try {
    const data = await Financial.find({ studentId: req.params.studentId });

    if (!data.length) {
      return res.status(404).json({ message: "No financial record found" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;