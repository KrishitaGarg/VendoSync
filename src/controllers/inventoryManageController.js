import Inventory from "../models/inventoryManageModel.js";
import { translateToEnglish } from "../utils/translate.js";

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

    // ✅ Basic validation
    if (!vendor || !itemName || !category || !quantity || !unit || !pricePerUnit) {
      return res.status(400).json({ message: "Missing required fields" });
    }

  itemName = await translateToEnglish(itemName);

    // Translate and normalize enums
    const translatedCategory = await translateToEnglish(category);
    category = translatedCategory.toLowerCase();

    const translatedUnit = await translateToEnglish(unit);
    unit = translatedUnit.toLowerCase();

    const translatedSource = await translateToEnglish(source);
    source = translatedSource.toLowerCase();

    // Translate custom fields if 'other'
    if (category === "other") {
      customCategory = await translateToEnglish(customCategory);
    }

    if (unit === "other") {
      customUnit = await translateToEnglish(customUnit);
    }

    if (notes) {
      notes = await translateToEnglish(notes);
    }

    const newItem = new Inventory({
      vendor,
      itemName,
      category,
      customCategory: category === "other" ? customCategory : undefined,
      quantity,
      unit,
      customUnit: unit === "other" ? customUnit : undefined,
      pricePerUnit,
      expiryInDays,
      expiryDate,
      source,
      notes,
    });

    await newItem.save();
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
 * @desc    Update an inventory item
 * @route   PUT /api/inventory/:id
 */
export const updateInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // 🔁 Translate if updated
    if (updates.itemName) {
      updates.itemName = await translateToEnglish(updates.itemName);
    }
    if (updates.category === "other" && updates.customCategory) {
      updates.customCategory = await translateToEnglish(updates.customCategory);
    } else {
      updates.customCategory = undefined;
    }

    if (updates.unit !== "other") {
      updates.customUnit = undefined;
    }

    const updatedItem = await Inventory.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item updated", item: updatedItem });
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
