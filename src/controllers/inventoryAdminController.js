import Inventory from "../models/inventoryManagementModel.js";
import Vendor from "../models/vendorModel.js";

/**
 * @desc    Admin - Get all inventories with optional filters
 * @route   GET /api/admin/inventories
 * @access  Private (Admin)
 */
export const getAllInventoriesForAdmin = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      lowStock,
      expired,
      firstNameName,
    } = req.query;

    const query = {};

    // Filter by item name (search)
    if (search) {
      query.itemName = { $regex: search, $options: "i" };
    }

    // Filter by low stock
    if (lowStock === "true") {
      query.quantity = { $lt: 15 };
    }

    // Filter by expired items
    if (expired === "true") {
      query.expiryDate = { $lt: new Date() };
    }

    // Filter by vendor first name
    if (vendorFirstName) {
      const matchingVendors = await Vendor.find({
        firstName: { $regex: firstName, $options: "i" },
      }).select("_id");

      const vendorIds = matchingVendors.map((v) => v._id);

      query.vendor = { $in: vendorIds };
    }

    const skip = (page - 1) * limit;

    const inventories = await Inventory.find(query)
      .populate("vendor", "firstName lastName businessEmail location")
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Inventory.countDocuments(query);

    res.status(200).json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      inventories,
    });
  } catch (error) {
    console.error("Error fetching inventories:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
