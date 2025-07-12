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
 * @desc Get nearby vendors with distance in kilometers
 * @route GET /api/dashboard/nearby?vendorId=xxx&radius=21
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

    // Use aggregation to get distance and exclude password
    const nearbyVendors = await Vendor.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [lng, lat]
          },
          distanceField: "distanceInMeters",
          spherical: true,
          maxDistance: (radius || 5) * 1000,
          query: {
            _id: { $ne: requestingVendor._id }
          }
        }
      },
      {
        $addFields: {
          distanceInKm: {
            $round: [{ $divide: ["$distanceInMeters", 1000] }, 2]
          }
        }
      },
      {
        $unset: "password"
      }
    ]);

    res.status(200).json({
      totalNearbyVendors: nearbyVendors.length,
      vendors: nearbyVendors
    });
  } catch (error) {
    console.error("Error fetching nearby vendors:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
