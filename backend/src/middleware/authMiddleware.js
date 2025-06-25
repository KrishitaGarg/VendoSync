import jwt from "jsonwebtoken";
import Vendor from "../models/vendorModel.js";

const protect = async (req, res, next) => {
  let token;

  
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      
      token = req.headers.authorization.split(" ")[1];

      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      
      req.vendor = await Vendor.findById(decoded.id).select("-password");

      if (!req.vendor) {
        return res.status(401).json({ message: "Vendor not found" });
      }

      next();
    } catch (error) {
      console.error("Token verification failed:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

export default protect;
