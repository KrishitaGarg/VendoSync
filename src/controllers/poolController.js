import Pool from "../models/poolModel.js";
import Vendor from "../models/vendorModel.js";
import { translateToEnglish } from "../utils/translate.js";

/**
 * @desc    Create a new pooling request
 * @route   POST /api/pools/create
 */
export const createPool = async (req, res) => {
  try {
    const { createdBy, items } = req.body;

    if (!createdBy || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Missing createdBy or items" });
    }

    // Normalize & translate item names and units
    const translatedItems = await Promise.all(
    items.map(async (item) => ({
        itemName: (await translateToEnglish(item.itemName)).trim().toLowerCase(),
        quantity: item.quantity,
        unit: (await translateToEnglish(item.unit)).trim().toLowerCase(),
        pricePerUnit: item.pricePerUnit,  // ✅ Include this
    }))
    );


    const creator = await Vendor.findById(createdBy);
    if (!creator) {
      return res.status(404).json({ message: "Creator vendor not found" });
    }

    const newPool = new Pool({
      createdBy,
      items: translatedItems,
      location: creator.location, // Pull from vendor profile
      vendorsInvolved: [createdBy],
    });

    await newPool.save();
    res.status(201).json({ message: "Pool created successfully", pool: newPool });
  } catch (error) {
    console.error("Error creating pool:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Join an existing pool
 * @route   POST /api/pools/:id/join
 */
export const joinPool = async (req, res) => {
  try {
    const { id } = req.params;
    const { vendorId } = req.body;

    if (!vendorId) {
      return res.status(400).json({ message: "Missing vendorId" });
    }

    const pool = await Pool.findById(id);
    if (!pool) {
      return res.status(404).json({ message: "Pool not found" });
    }
    
    if (!Array.isArray(pool.vendors)) {
      pool.vendorsInvolved = [];
    }

    if (pool.vendors.includes(vendorId)) {
      return res.status(400).json({ message: "Vendor already joined this pool" });
    }

    pool.vendors.push(vendorId);
    await pool.save();

    res.status(200).json({ message: "Vendor joined pool", pool });
  } catch (error) {
    console.error("Error joining pool:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    List all pools (with optional nearby filter)
 * @route   GET /api/pools
 */
export const listPools = async (req, res) => {
  try {
    const { lat, lng, radiusInKm = 5 } = req.query;

    let query = {};

    // Optional: Nearby filtering if lat/lng provided
    if (lat && lng) {
      query.location = {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: radiusInKm * 1000, // convert to meters
        },
      };
    }

    const pools = await Pool.find(query).populate("createdBy", "firstName lastName businessEmail");
    res.status(200).json(pools);
  } catch (error) {
    console.error("Error listing pools:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};