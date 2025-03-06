import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    // **Extract token from Authorization header**
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error("🚨 No valid token in request.");
      return res.status(401).json({ error: "Access denied. No valid token provided." });
    }

    const token = authHeader.split(" ")[1]; // ✅ Extract token properly

    // **Verify the token**
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // **Find the user in the database (without password)**
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ error: "User not found. Authentication failed." });
    }

    req.user = user; // ✅ Attach user to request
    next();
  } catch (error) {
    console.error("🚨 Token Verification Error:", error);
    res.status(401).json({ error: "Invalid token. Authorization denied." });
  }
};

export default authMiddleware;
