import express from "express";
import {
  createPool,
  joinPool,
  listPools,
} from "../controllers/poolController.js";

const router = express.Router();

// Create a new pooling request
router.post("/create", createPool);

// Join an existing pool
router.post("/:id/join", joinPool);

// List all pools (optional: nearby filtering via query params)
router.get("/", listPools);

export default router;
