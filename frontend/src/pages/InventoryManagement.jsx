import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaHome,
  FaBoxes,
  FaChartBar,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import Sidebar from "../components/Sidebar";

export default function InventoryManagement() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const vendorId = localStorage.getItem("vendorId");

  useEffect(() => {
    if (!token || !vendorId) {
      navigate("/signin");
    }
  }, [token, vendorId, navigate]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-semibold mb-8">📦 Inventory Dashboard</h2>

        <div className="flex gap-6">
          <Link to="/add-item">
            <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
              ➕ Add New Item
            </button>
          </Link>

          <Link to="/item-list">
            <button className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition">
              📋 View Items List
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
