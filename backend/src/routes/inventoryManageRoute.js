import express from "express";

import {
    addInventoryItem,
    getVendorInventory,
    updateInventoryItem,
    deleteInventoryItem,
} from "../controllers/inventoryManageController.js";

const router=express.Router();

router.post("/",addInventoryItem);
router.get("/:vendorId", getVendorInventory);
router.put("/:id",updateInventoryItem);
router.delete("/:id",deleteInventoryItem);

export default router;