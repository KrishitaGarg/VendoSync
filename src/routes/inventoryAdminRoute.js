import express from "express";
import { getAllInventoriesForAdmin } from "../controllers/inventoryAdminController.js";
import { protectAdmin } from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

// Admin-only inventory access
router.get("/", protectAdmin, getAllInventoriesForAdmin);

export default router;
