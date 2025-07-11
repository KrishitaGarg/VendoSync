import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/db.js";
import vendorRoute from "./routes/vendorRoute.js";
import inventoryRoute from "./routes/inventoryManageRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


connectDB();


app.use("/api/vendors", vendorRoute);
app.use("/api/inventory", inventoryRoute);




app.get("/", (req, res) => {
  res.send("W-Setu Core Backend is Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
