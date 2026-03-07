const express = require("express");
const router = express.Router();
const Auth = require("../model/auth");

// Add User
router.post("/add", async (req, res) => {
  try {
    const user = new Auth(req.body);
    await user.save();
    res.json({ message: "Auth User Added" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Users
router.get("/", async (req, res) => {
  const users = await Auth.find();
  res.json(users);
});

module.exports = router;
