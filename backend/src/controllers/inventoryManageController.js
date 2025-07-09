import Inventory from "../models/inventoryManagementModel.js";
import { translateToEnglish } from "../utils/translate.js";
import { sendSMS } from "../utils/sms.js";
import { smsTemplates } from "../utils/smsTemplates.js";
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
    } = req.body;

    // Basic validation
    if (!vendor || !itemName || !category || !quantity || !unit || !pricePerUnit) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ Translate to English and normalize inputs
    itemName = (await translateToEnglish(itemName)).trim();
    category = (await translateToEnglish(category)).trim().toLowerCase();
    category = normalizeCategory(category);           // <-- Normalize category
    unit = (await translateToEnglish(unit)).trim().toLowerCase();
    unit = normalizeUnit(unit);                         // <-- Normalize unit
    source = (await translateToEnglish(source)).trim().toLowerCase();

    if (category === "other" && customCategory) {
      customCategory = (await translateToEnglish(customCategory)).trim();
    } else {
      customCategory = undefined;
    }

    if (unit === "other" && customUnit) {
      customUnit = (await translateToEnglish(customUnit)).trim();
    } else {
      customUnit = undefined;
    }

    if (notes) {
      notes = (await translateToEnglish(notes)).trim();
    }

    const newItem = new Inventory({
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

    await newItem.save();

    const vendorDoc = await Vendor.findById(vendor);
    if (vendorDoc && vendorDoc.businessPhone){
      try{
        await sendSMS(
          vendorDoc.businessPhone,
          smsTemplates.inventoryAdded(itemName)
        );
      } catch(smsError){
        console.error("Failed to send inventory add SMS", smsError.message);
      }
    }
    res.status(201).json({ message: "Item added", item: newItem });

  } catch (error) {
    console.error("Error adding inventory item:", error);
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

    if (updatedItem) {
      const vendorDoc = await Vendor.findById(updatedItem.vendor);
      if (vendorDoc && vendorDoc.businessPhone) {
        try {
          await sendSMS(
            vendorDoc.businessPhone,
            smsTemplates.inventoryUpdated(updatedItem.itemName)
          );
        } catch (smsError) {
          console.error("Failed to send inventory update SMS:", smsError.message);
        }
      }
      res.status(200).json({ message: "Item updated", item: updatedItem });
    } else {
      return res.status(404).json({ message: "Item not found" });
    }


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
