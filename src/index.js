import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/db.js";
import vendorRoute from "./routes/vendorRoute.js";
import inventoryRoute from "./routes/inventoryManageRoute.js";
import dashboardRoute from "./routes/dashboardRoute.js";

dotenv.config();

const app = express();
app.use(cors({
  origin: "http://localhost:3000",  // Allow requests from your React dev server
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());


connectDB();


app.use("/api/vendors", vendorRoute);
app.use("/api/inventory", inventoryRoute);
app.use("/api/dashboard", dashboardRoute);




app.get("/", (req, res) => {
  res.send("W-Setu Core Backend is Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
