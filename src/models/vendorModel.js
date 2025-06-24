import mongoose from "mongoose";
const VendorSchema = new mongoose.Schema({
    userName:{
        type: String,
        required:true,
        unique:true,
        insex:true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        validate: {
        validator: function (v) {
            return /^[6-9]\d{9}$/.test(v); // Validates 10-digit Indian numbers
        },
        message: props => `${props.value} is not a valid Indian phone number!`,
        },
    },
    language: {
        type: String,
        required: true,
        default: "Hindi"
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point"
        },
        coordinates: {
            type: [Number],
            default: undefined // Optional: explicitly show it's optional
        }
    },

    
    aadhaar: String,
    pan: String,

    trustScore: { type: Number, default: 0 },

    isVerified: { type: Boolean, default: false }, 

    registeredAt: { type: Date, default: Date.now },
});

VendorSchema.index({ location: "2dsphere" });

const Vendor = mongoose.model("Vendor", VendorSchema);
export default Vendor;