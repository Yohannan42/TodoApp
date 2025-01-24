import express from "express";
import { getNavigationItems } from "../controllers/navigation/navigationController.js";

const router = express.Router();

// Endpoint to fetch navigation items
router.get("/", getNavigationItems);

export default router;
