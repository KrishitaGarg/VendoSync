import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
    validate: {
      validator: function (v) {
        return /^[6-9]\d{9}$/.test(v); // 10-digit Indian mobile numbers
      },
      message: props => `${props.value} is not a valid Indian phone number!`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

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
