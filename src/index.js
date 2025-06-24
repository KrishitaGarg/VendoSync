import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import vendorRoute from "./routes/vendorRoute.js";
import inventoryRoutes from "./routes/inventoryManageRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/vendors", vendorRoute);
app.use("/api/inventory", inventoryRoutes);


app.get("/", (req, res) => {
    res.send("W-Setu backend is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
