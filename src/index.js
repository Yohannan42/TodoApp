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
app.use(express.json());

// **✅ Improved CORS Configuration**
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

// **✅ Handle Preflight Requests**
app.options("*", (req, res) => {
    res.sendStatus(200);
});

// **✅ Routes**
app.use("/api/tasks", taskRoutes);
app.use("/api/navigation", navigationRoutes);
app.use("/api/moods", moodRoutes);


// **✅ Root Route**
app.get("/", (req, res) => {
    res.send("Welcome to the My Project Backend!");
});

// **✅ Start Server**
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
