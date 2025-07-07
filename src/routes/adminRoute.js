import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.post("/signup", registerAdmin);
router.post("/login", loginAdmin);

export default router;
