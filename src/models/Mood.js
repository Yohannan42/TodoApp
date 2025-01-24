import mongoose from "mongoose";

const moodSchema = new mongoose.Schema({
  date: { type: String, required: true }, // Store the date in "YYYY-MM-DD" format
  mood: { type: String, required: true }, // The mood for that day
});
moodSchema.index({ date: 1 }); 
const Mood = mongoose.model("Mood", moodSchema);

export default Mood;
