import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.ObjectId,
    ref: "Vendor",
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "vegetables",
      "vegetable",   // added variant
      "fruits",
      "grains",
      "snacks",
      "beverages",
      "household",
      "other",
    ],
    required: true,
  },
  customCategory: {
    type: String,
    required: function () {
      return this.category === "other";
    },
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, "Quantity cannot be negative"],
  },
  unit: {
    type: String,
    enum: [
      "kg",
      "kilo",     // added variant
      "litre",
      "dozen",
      "packet",
      "piece",
      "other",
    ],
    required: true,
  },
  customUnit: {
    type: String,
    required: function () {
      return this.unit === "other";
    },
  },
  pricePerUnit: {
    type: Number,
    required: true,
    min: [0, "Price cannot be negative"],
  },
  expiryInDays: {
    type: Number,
    default: null,
  },
  source: {
    type: String,
    enum: ["local", "walmart", "cooperative", "other"],
    default: "local",
  },
  notes: {
    type: String,
    default: "",
  },
}, {
  timestamps: true,
});

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;
