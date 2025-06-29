import express from "express";
import { getTotalInventory } from "../controllers/dashboardController.js";
import { getNearbyVendors } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/total-inventory", getTotalInventory);
router.get("/nearby", getNearbyVendors);

export default router;
