import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/adminController.js";
import { getAllVendors } from "../controllers/vendorController.js";
import { protectAdmin } from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

// Public routes
router.post("/signup", registerAdmin);
router.post("/login", loginAdmin);

// 🔐 Protected route example (Admin-only)
router.get("/vendors", protectAdmin, getAllVendors);  // Example: Admin can fetch list of vendors

export default router;
