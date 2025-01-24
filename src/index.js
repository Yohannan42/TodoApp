import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import navigationRoutes from "./routes/navigationRoutes.js";
import moodRoutes from "./routes/moodRoutes.js"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Allow both frontend URLs
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/navigation", navigationRoutes);
app.use("/api/moods", moodRoutes); 

// Root route
app.get("/", (req, res) => {
    res.send("Welcome to the My Project Backend!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
