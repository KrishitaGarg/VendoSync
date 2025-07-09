import Admin from "../models/adminModel.js";
import asyncHandler from "express-async-handler"; 
import generateToken from "../utils/generateToken.js"; 

/**
 * @desc    Register a new admin
 * @route   POST /api/admin/signup
 * @access  Public (or protected for only superadmins if needed)
 */
export const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    return res.status(400).json({ message: "Admin already exists with this email" });
  }

  const newAdmin = await Admin.create({ name, email, password });

  res.status(201).json({
    _id: newAdmin._id,
    name: newAdmin.name,
    email: newAdmin.email,
    role: newAdmin.role,
    token: generateToken(newAdmin._id),
  });
});

/**
 * @desc    Login admin
 * @route   POST /api/admin/login
 * @access  Public
 */
export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email }).select("+password");
  if (!admin) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await admin.matchPassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.status(200).json({
    _id: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    token: generateToken(admin._id),
  });
});
