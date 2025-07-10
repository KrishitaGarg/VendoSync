import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const VendorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  legalBusinessName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  market: {
    type: String,
    required: true,
    default: "India",
  },
  countryOfIncorporation: {
    type: String,
    required: true,
  },
  taxId: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  businessEmail: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`,
    },
  },
  businessPhone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: function (v) {
        const phoneNumber = parsePhoneNumberFromString(v);
        return phoneNumber ? phoneNumber.isValid() : false;
      },
      message: props => `${props.value} is not a valid international phone number!`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
},{
  timestamps: true,
});

VendorSchema.index({ location: "2dsphere" });

// Hash password before saving
VendorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Password comparison method
VendorSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Vendor = mongoose.model("Vendor", VendorSchema);
export default Vendor;
