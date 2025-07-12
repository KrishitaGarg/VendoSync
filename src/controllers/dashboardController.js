import Inventory from "../models/inventoryManagementModel.js";
import Vendor from "../models/vendorModel.js";

/**
 * @desc Get total inventory items of a vendor
 * @route GET /api/dashboard/total-inventory?vendorId=xxx
 */

export const getTotalInventory = async (req,res) =>{
  try{
    const {vendorId} = req.query;
    if(!vendorId) return res.status(400).json({message: "vendorId is required"});
    const count=await Inventory.countDocuments({vendor: vendorId});
    res.status(200).json({totalInventory: count});
  } catch (error){
    console.error("Error fetching total inventory",error);
    res.status(500).json({message: "Server Error"});
  }
};

/**
 * @desc    Get nearby vendors based on location
 * @route   GET /api/dashboard/nearby?vendorId=xxx&radius=5
 */
export const getNearbyVendors = async (req, res) => {
  try {
    const { vendorId, radius } = req.query;

    if (!vendorId) {
      return res.status(400).json({ message: "Vendor ID is required" });
    }

    // Fetch requesting vendor's coordinates
    const requestingVendor = await Vendor.findById(vendorId);
    if (!requestingVendor || !requestingVendor.location) {
      return res.status(404).json({ message: "Requesting vendor not found or location missing" });
    }

    const [lng, lat] = requestingVendor.location.coordinates;

    // Radius in kilometers (Mongo expects meters)
    const nearbyVendors = await Vendor.find({
      _id: { $ne: vendorId }, // exclude self
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat]
          },
          $maxDistance: (radius || 21) * 1000 // default 5 km
        }
      }
    }).select("-password");

    res.status(200).json(nearbyVendors);
  } catch (error) {
    console.error("Error fetching nearby vendors:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};