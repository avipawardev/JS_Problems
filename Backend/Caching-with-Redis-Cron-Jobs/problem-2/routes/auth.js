const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    const token = signToken(user._id);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.correctPassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = signToken(user._id);
  res.json({ token });
});

module.exports = router;
