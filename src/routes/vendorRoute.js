import express from "express";
import { registerVendor, getAllVendors } from "../controllers/vendorController.js";

const router = express.Router();

router.post("/register", registerVendor);
router.get("/", getAllVendors);

export default router;
