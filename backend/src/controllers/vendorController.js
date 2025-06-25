import Vendor from "../models/vendorModel.js";

/**
 * @desc    Register a new vendor
 * @route   POST /api/vendors
 */
export const registerVendor = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      legalBusinessName,
      market,
      countryOfIncorporation,
      taxId,
      businessEmail,
      businessPhone,
      password,
      confirmPassword,
    } = req.body;

    // Check required fields
    if (
      !firstName ||
      !lastName ||
      !legalBusinessName ||
      !market ||
      !countryOfIncorporation ||
      !taxId ||
      !businessEmail ||
      !businessPhone ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Password match check
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    // Check for existing vendor (by email, phone, or business name)
    const existingVendor = await Vendor.findOne({
      $or: [
        { businessEmail },
        { businessPhone },
        { legalBusinessName },
        { taxId },
      ],
    });
    if (existingVendor) {
      return res
        .status(400)
        .json({ message: "Vendor already exists with same email, phone, business name, or tax ID." });
    }

    // Create vendor
    const vendor = new Vendor({
      firstName,
      lastName,
      legalBusinessName,
      market,
      countryOfIncorporation,
      taxId,
      businessEmail,
      businessPhone,
      password, // Will be hashed in the model pre-save hook
    });

    const savedVendor = await vendor.save();
    // Remove password from response
    const vendorObj = savedVendor.toObject();
    delete vendorObj.password;

    res.status(201).json({ message: "Vendor registered successfully", vendor: vendorObj });
  } catch (error) {
    console.error("Error registering vendor:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Get vendor by ID
 * @route   GET /api/vendors/:id
 */
export const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).select("-password");
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.status(200).json(vendor);
  } catch (error) {
    console.error("Error fetching vendor:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Get all vendors (for admin use)
 * @route   GET /api/vendors
 */
export const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find({}).select("-password");
    res.status(200).json(vendors);
  } catch (error) {
    console.error("Error fetching vendors:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
