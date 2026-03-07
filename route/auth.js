const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../model/user");

const router = express.Router();

// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { name, userId, password } = req.body;

    if (!name || !userId || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await User.findOne({ userId });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      userId,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Registration successful",
      user: {
        name: user.name,
        userId: user.userId,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { userId, password } = req.body;

    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        userId: user.userId,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

// ================= SHOW ALL USERS =================
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // password hide

    res.json({
      message: "User list fetched successfully",
      total: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
      error: error.message
    });
  }
});

// ================= SHOW SINGLE USER BY ID =================
router.get("/show:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user",
      error: error.message
    });
  }
});

module.exports = router;