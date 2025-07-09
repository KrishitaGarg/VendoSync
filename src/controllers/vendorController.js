import Vendor from "../models/vendorModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { sendSMS }  from "../utils/sms.js";
import { SmsCommandContextImpl } from "twilio/lib/rest/supersim/v1/smsCommand.js";
import { smsTemplates }  from "../utils/smsTemplates.js";


/**
 * @desc    Sign in vendor
 * @route   POST /api/vendors/signin
 */
export const signInVendor = async (req, res) => {
  try {
    const { businessEmail, password } = req.body;

    if (!businessEmail || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    const vendor = await Vendor.findOne({ businessEmail }).select("+password");

    if (!vendor) {
      return res.status(400).json({ message: "Vendor not found" });
    }

    const isMatch = await bcrypt.compare(password, vendor.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(vendor._id);
    try {
      await sendSMS(vendor.businessPhone, smsTemplates.signIn());
    } catch(smsError){
      console.error("Sign-in SMS failed", smsError.message);
    }


    res.status(200).json({
      vendorId: vendor._id,
      firstName: vendor.firstName,
      businessEmail: vendor.businessEmail,
      token,
    });
  } catch (error) {
    console.error("Sign in error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


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
      location
    } = req.body;

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
      !confirmPassword ||
      !location
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

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

    const vendor = new Vendor({
      firstName,
      lastName,
      legalBusinessName,
      market,
      countryOfIncorporation,
      taxId,
      businessEmail,
      businessPhone,
      password,
      location,
    });

    const savedVendor = await vendor.save();
    const vendorObj = savedVendor.toObject();
    delete vendorObj.password;

    try{
      await sendSMS(businessPhone, smsTemplates.welcome(firstName));
    } catch(smsError){
      console.error("Registeration SMS failed", smsError.message);

    }


    // ✅ Include token in response
    res.status(201).json({
      message: "Vendor registered successfully",
      vendor: vendorObj,
      token: generateToken(savedVendor._id),
    });
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
