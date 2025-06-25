import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaHome,
  FaBoxes,
  FaChartBar,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

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
      <aside className="w-64 bg-blue-600 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-10">VendoSync</h2>
        <nav className="flex flex-col gap-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 hover:bg-blue-500 p-2 rounded"
          >
            <FaHome /> Dashboard
          </Link>
          <Link
            to="/inventory"
            className="flex items-center gap-3 hover:bg-blue-500 p-2 rounded"
          >
            <FaBoxes /> Inventory
          </Link>
          <Link
            to="#"
            className="flex items-center gap-3 hover:bg-blue-500 p-2 rounded"
          >
            <FaChartBar /> Analytics
          </Link>
          <Link
            to="#"
            className="flex items-center gap-3 hover:bg-blue-500 p-2 rounded"
          >
            <FaUsers /> Nearby Vendors
          </Link>
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/signin");
            }}
            className="flex items-center gap-3 hover:bg-red-500 p-2 rounded mt-auto"
          >
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </aside>

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
