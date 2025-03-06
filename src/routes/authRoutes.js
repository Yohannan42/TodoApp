import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// **✅ Register a new user**
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      // **Check if user already exists**
      const userExists = await User.findOne({ email });
      if (userExists) return res.status(400).json({ error: "Email already exists" });

      // **Hash the password before saving**
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // **Create new user**
      const user = new User({ email, password: hashedPassword });
      await user.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Registration Error:", error);
      res.status(500).json({ error: "Server error during registration" });
    }
  }
);

// **✅ Login User**
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").exists().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      // **Find user by email**
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: "Invalid email or password" });

      // **Check if password matches**
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

      // **Generate JWT token**
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.json({ token, userId: user._id });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ error: "Server error during login" });
    }
  }
);

export default router;
