import Task from "../models/Task.js";
import dayjs from "dayjs";

// Get all tasks
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error });
    }
};

// Create a new task
// Create a new task
export const createTask = async (req, res) => {
    try {
        const { title, date, time, priority, status } = req.body; // Include priority and status
        const newTask = new Task({ 
            title, 
            date, 
            time, 
            priority: priority ,  // Default to "Medium" if not provided
            status: status      // Default to "Pending" if not provided
        });

        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: "Error creating task", error });
    }
};

// Delete a task
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error });
    }
};
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, date, priority, status } = req.body;

        console.log("Updating Task ID:", id, "with Data:", req.body); // Debugging log

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, date, priority, status },
            { new: true } // ✅ Return the updated task
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Error updating task", error });
    }
};

export const filterTasks = async (req, res) => {
    try {
        const { priority, status, search, dueDateRange } = req.query;
        let filter = {};

        if (priority && priority !== "") {
            filter.priority = priority;
        }

        if (status && status !== "") {
            filter.status = status;
        }

        if (search && search !== "") {
            filter.title = { $regex: search, $options: "i" }; // Case-insensitive search
        }

        if (dueDateRange && dueDateRange.includes(",")) {
            const [startDate, endDate] = dueDateRange.split(",");
            if (startDate && endDate && !isNaN(new Date(startDate)) && !isNaN(new Date(endDate))) {
                filter.date = { $gte: startDate, $lte: endDate };
            } else {
                console.error("Invalid date range received:", dueDateRange);
            }
        }

        console.log("Final MongoDB Filter Query:", filter);
        const filteredTasks = await Task.find(filter);
        res.status(200).json(filteredTasks);
    } catch (error) {
        console.error("Error in filterTasks:", error);
        res.status(500).json({ message: "Error filtering tasks", error });
    }
};
