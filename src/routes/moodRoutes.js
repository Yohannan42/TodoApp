import express from "express";
import { getMoods, saveMood } from "../controllers/moodController.js";

const router = express.Router();

// Get all moods
router.get("/", getMoods);

// Save or update a mood
router.post("/", saveMood);

export default router;
