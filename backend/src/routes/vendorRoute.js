import express from "express";
import {
  registerVendor,
  signInVendor,
  getVendorById,
  getAllVendors,
} from "../controllers/vendorController.js";
import protect from "../middleware/authMiddleware.js"; 

const router = express.Router();

// Public Routes
router.post("/", registerVendor);          
router.post("/signin", signInVendor); 

// Protected Routes
router.get("/:id", protect, getVendorById); 
router.get("/", protect, getAllVendors);    
export default router;
