import Vendor from "../models/vendorModel.js";

/**
 * @route   POST /api/vendors/register
 * @desc    Register a new vendor
 */
export const registerVendor = async (req, res) => {
  try {
    console.log("📥 Request body:", req.body);

    const {
      userName,
      phone,
      language,
      coordinates,
      
      aadhaar,
      pan,
    } = req.body;

    // Check for existing vendor
    const existingVendor = await Vendor.findOne({ phone });
    if (existingVendor) {
      return res.status(400).json({ message: "Vendor already exists" });
    }

    const newVendor = new Vendor({
      userName,
      phone,
      language,
      
      aadhaar,
      pan,
      location: {
        type: "Point",
        coordinates,
      },
      isVerified: true 
    });

    await newVendor.save();
    res.status(201).json({ message: "Vendor registered successfully", vendor: newVendor });
  } catch (error) {
    console.error("❌ Error in registerVendor:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * @route   GET /api/vendors
 * @desc    Get all vendors
 */
export const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json(vendors);
  } catch (error) {
    console.error("❌ Error in getAllVendors:", error);
    res.status(500).json({ error: error.message });
  }
};
