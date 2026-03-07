const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
const path = require("path");
const cors = require("cors");
const authRoutes = require("./route/auth");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Ensure DB connection for every request in serverless runtime
app.use(async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }
    next();
  } catch (err) {
    next(err);
  }
});

app.get("/", (req, res) => {
  res.send("server is running");
});
async function startServer() {
  await connectDB();
}
app.use('/api/semester',require('./route/semesterroutes'));
app.use('/api/auth',authRoutes);
app.use('/api/semreg',require('./route/authRouter'));
app.use('/api/courses',require('./route/regRouter'));
//financial route
app.use('/api/financial',require('./route/financial'));
//waiver route
app.use('/api/waiver',require('./route/waiver'));
//cost package route
app.use('/api/package',require('./route/cost_package'));
//result route
app.use('/api/result_info',require('./route/result'));
//payment route
app.use('/api/payment',require('./route/payments'));

// html files_____________________________________________________
//show and input academic schedule
app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, './public/semester.html'));
});
//show and input courses
app.get('/course', (req, res) => {
  res.sendFile(path.join(__dirname, './public/course.html'));
});
//input financial details
app.get('/financial',(req, res) => {
  res.sendFile(path.join(__dirname, './public/financial.html'));
});
//show financial details
app.get('/financialshow',(req, res) => {
  res.sendFile(path.join(__dirname, './public/financialshow.html'));
});
//input waiver details
app.get('/waiver',(req, res) => {
  res.sendFile(path.join(__dirname, './public/waiver.html'));
});
//input cost package details
app.get('/cost',(req, res) => {
  res.sendFile(path.join(__dirname, './public/cost_input_p.html'));
});
//show result details
app.get('/result',(req, res) => {
  res.sendFile(path.join(__dirname, './public/result.html'));
});
//show payment details
app.get('/payment',(req, res) => {
  res.sendFile(path.join(__dirname, './public/payment.html'));
});
//dashboard
app.get('/dashboard',(req, res) => {
  res.sendFile(path.join(__dirname, './public/dashboard.html'));
});

// Basic error handler so serverless doesn't crash the invocation
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

startServer();

// if (require.main === module) {
//   app.listen(port, () => {
//     console.log(`server is running on port http://localhost:${port}`);
//   });
// }

module.exports = app;
