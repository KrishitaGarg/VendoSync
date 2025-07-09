import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  unit: {
    type: String,
    enum: ["kg", "litre", "packet", "piece", "dozen", "other"],
    required: true,
  },
  pricePerUnit: {
    type: Number,
    required: true,
    min: 0,
  }
});

const poolSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  vendors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
  ],
  items: [itemSchema], 
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], 
      required: true,
    },
  },
  status: {
    type: String,
    enum: ["open", "closed", "fulfilled"],
    default: "open",
  },
}, {
  timestamps: true,
});

poolSchema.index({ location: "2dsphere" });

const Pool = mongoose.model("Pool", poolSchema);

export default Pool;
