import express from "express";
import {
  registerVendor,
  getVendorById,
  getAllVendors,
} from "../controllers/vendorController.js";

const router = express.Router();

router.post("/", registerVendor);
router.get("/:id", getVendorById);
router.get("/", getAllVendors);

export default router;
