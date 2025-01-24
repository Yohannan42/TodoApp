import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    date: { type: String }, // Store date as a string (e.g., "2025-01-02")
  time: { type: String },
  priority: { type: String, enum: ["High", "Medium", "Low"] }, // Priority
  status: { type: String, enum: ["Pending", "Completed", "Overdue"] }, // Status
},
{
    timestamps: true, // Automatically manage createdAt and updatedAt
}
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
