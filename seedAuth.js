const mongoose = require("mongoose");
const Auth = require("./model/auth");
const dotenv=require("dotenv");
dotenv.config();
mongoose.connect(process.env.MONGO_URL);

Auth.create({
  name: "Sourav",
  studentId: "20231234",
  email: "sourav@gmail.com",
  role: "student"
}).then(() => {
  console.log("Auth Collection Created");
  mongoose.disconnect();
});
