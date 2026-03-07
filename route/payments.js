const express = require("express");
const router = express.Router();
const Payment = require("../model/payment");

// Add a payment
router.post("/add", async (req, res) => {
  try {
    const { studentId, amount, paymentDate, receiptNo, note } = req.body;

    if (!studentId || !amount || !paymentDate || !receiptNo) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const payment = new Payment({ studentId, amount, paymentDate, receiptNo, note });
    await payment.save();

    res.json({ message: "Payment added successfully", payment });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get all payments by student ID
router.get("/student/:studentId", async (req, res) => {
  try {
    const payments = await Payment.find({ studentId: req.params.studentId });

    if (payments.length === 0) {
      return res.status(404).json({ message: "No payments found for this student" });
    }

    res.json({ studentId: req.params.studentId, totalPayments: payments.length, payments });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;