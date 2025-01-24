import express from "express";
import { getTasks, createTask, deleteTask, updateTask, filterTasks  } from "../controllers/taskController.js";


const router = express.Router();


router.get("/", getTasks);
router.post("/", createTask);
router.delete("/:id", deleteTask);
//router.get("/weekly-stats", getWeeklyStats);
router.get("/filters", filterTasks);
export default router;
router.put("/:id", updateTask); 
