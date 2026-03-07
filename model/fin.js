const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  costHead: {
    type: String,
    required: true
  },
  costAmount: {
    type: Number,
    default: 0
  },
  deductiveAmount: {
    type: Number,
    default: 0
  },
  payable: {
    type: Number,
    default: 0
  },
  paymentDate: {
    type: String
  },
  moneyReceiptNo: {
    type: String
  },
  paidAmount: {
    type: Number,
    default: 0
  }
}, { _id: false });

const financialSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true
  },
  studentName: String,
  program: String,
  semester: String,
  payments: [paymentSchema]
}, { timestamps: true });

module.exports = mongoose.model("Financial", financialSchema);