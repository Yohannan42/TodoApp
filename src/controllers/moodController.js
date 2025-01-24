import Mood from "../models/Mood.js";

// Get all moods
export const getMoods = async (req, res) => {
  try {
    const moods = await Mood.find();
    res.status(200).json(moods);
  } catch (error) {
    res.status(500).json({ message: "Error fetching moods", error });
  }
};

// Save or update a mood
export const saveMood = async (req, res) => {
  try {
    const { date, mood } = req.body;

    // Check if a mood already exists for the given date
    const existingMood = await Mood.findOne({ date });

    if (existingMood) {
      // Update the mood
      existingMood.mood = mood;
      await existingMood.save();
      res.status(200).json(existingMood);
    } else {
      // Create a new mood entry
      const newMood = new Mood({ date, mood });
      await newMood.save();
      res.status(201).json(newMood);
    }
  } catch (error) {
    res.status(500).json({ message: "Error saving mood", error });
  }
};
