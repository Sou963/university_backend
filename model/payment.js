const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentDate: {
    type: String,
    required: true
  },
  receiptNo: {
    type: String,
    required: true
  },
  note: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);