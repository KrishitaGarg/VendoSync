import Inventory from "../models/inventoryManagementModel.js";
import { translateToEnglish } from "../utils/translate.js";
import { smsTemplates } from "../utils/smsTemplates.js";
import { sendSMS } from "../utils/sms.js";
import Vendor from "../models/vendorModel.js";

// Helper functions to normalize enums
const normalizeCategory = (category) => {
  switch (category) {
    case "vegetable":
      return "vegetables";
    default:
      return category;
  }
};

const normalizeUnit = (unit) => {
  switch (unit) {
    case "kilo":
      return "kg";
    default:
      return unit;
  }
};

/**
 * @desc    Add inventory item
 * @route   POST /api/inventory
 */
export const addInventoryItem = async (req, res) => {
  try {
    const items = Array.isArray(req.body) ? req.body : [req.body]; // Handle both array and object
    const inventoryDocs = [];

    for (let item of items) {
      let {
        vendor,
        itemName,
        category,
        customCategory,
        quantity,
        unit,
        customUnit,
        pricePerUnit,
        expiryInDays,
        expiryDate,
        source,
        notes,
      } = item;

      // Basic validation
      if (!vendor || !itemName || !category || !quantity || !unit || !pricePerUnit) {
        return res.status(400).json({ message: "Missing required fields in one or more items" });
      }

      // Translation and normalization
      itemName = (await translateToEnglish(itemName)).trim();
      category = normalizeCategory((await translateToEnglish(category)).trim().toLowerCase());
      unit = normalizeUnit((await translateToEnglish(unit)).trim().toLowerCase());
      source = source ? (await translateToEnglish(source)).trim().toLowerCase() : "local";
      customCategory =
        category === "other" && customCategory
          ? (await translateToEnglish(customCategory)).trim()
          : undefined;
      customUnit =
        unit === "other" && customUnit
          ? (await translateToEnglish(customUnit)).trim()
          : undefined;
      notes = notes ? (await translateToEnglish(notes)).trim() : "";

      inventoryDocs.push({
        vendor,
        itemName,
        category,
        customCategory,
        quantity,
        unit,
        customUnit,
        pricePerUnit,
        expiryInDays,
        expiryDate,
        source,
        notes,
      });
    }

    // Save all items in one go
    const savedItems = await Inventory.insertMany(inventoryDocs);

    // const vendorDoc = await Vendor.findById(savedItems[0].vendor);
    // if (vendorDoc && vendorDoc.businessPhone){
    //   try {
    //     await sendSMS(
    //       vendorDoc.businessPhone,
    //       smsTemplates.inventoryAdded(savedItems[0].itemName)
    //     );
    //   } catch (smsError) {
    //     console.error("Failed to send inventory add SMS", smsError.message);
    //   }
    // }

    res.status(201).json({ message: "Items added successfully", items: savedItems });

  } catch (error) {
    console.error("Error adding inventory items:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Get all inventory items of a vendor
 * @route   GET /api/inventory/:vendorId
 */
export const getVendorInventory = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const items = await Inventory.find({ vendor: vendorId });
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Update inventory item
 * @route   PUT /api/inventory/:id
 */
export const updateInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.itemName) {
      updates.itemName = (await translateToEnglish(updates.itemName)).trim();
    }

    if (updates.category) {
      updates.category = (await translateToEnglish(updates.category)).trim().toLowerCase();
      updates.category = normalizeCategory(updates.category);  // <-- Normalize category

      if (updates.category === "other" && updates.customCategory) {
        updates.customCategory = (await translateToEnglish(updates.customCategory)).trim();
      } else {
        updates.customCategory = undefined;
      }
    }

    if (updates.unit) {
      updates.unit = (await translateToEnglish(updates.unit)).trim().toLowerCase();
      updates.unit = normalizeUnit(updates.unit);  // <-- Normalize unit

      if (updates.unit === "other" && updates.customUnit) {
        updates.customUnit = (await translateToEnglish(updates.customUnit)).trim();
      } else {
        updates.customUnit = undefined;
      }
    }

    if (updates.notes) {
      updates.notes = (await translateToEnglish(updates.notes)).trim();
    }

    const updatedItem = await Inventory.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item updated", item: updatedItem });

    // if (updatedItem) {
    //   const vendorDoc = await Vendor.findById(updatedItem.vendor);
    //   if (vendorDoc && vendorDoc.businessPhone) {
    //     try {
    //       await sendSMS(
    //         vendorDoc.businessPhone,
    //         smsTemplates.inventoryUpdated(updatedItem.itemName)
    //       );
    //     } catch (smsError) {
    //       console.error("Failed to send inventory update SMS:", smsError.message);
    //     }
    //   }
    // }




  } catch (error) {
    console.error("Error updating inventory item:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Delete inventory item
 * @route   DELETE /api/inventory/:id
 */
export const deleteInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Inventory.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully" });

  } catch (error) {
    console.error("Error deleting inventory item:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
