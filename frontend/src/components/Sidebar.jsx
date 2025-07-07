import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBoxes,
  FaChartBar,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-blue-600 text-white flex flex-col p-6">
      <h2 className="text-2xl font-bold mb-10">VendoSync</h2>
      <nav className="flex flex-col gap-4">
        <Link
          to="/dashboard"
          className={`flex items-center gap-3 p-2 rounded hover:bg-blue-500 ${
            isActive("/dashboard") ? "bg-blue-500" : ""
          }`}
        >
          <FaHome /> Dashboard
        </Link>
        <Link
          to="/inventory"
          className={`flex items-center gap-3 p-2 rounded hover:bg-blue-500 ${
            isActive("/inventory") ? "bg-blue-500" : ""
          }`}
        >
          <FaBoxes /> Inventory
        </Link>
        <Link
          to="/analytics"
          className="flex items-center gap-3 hover:bg-blue-500 p-2 rounded"
        >
          <FaChartBar /> Analytics
        </Link>
        <Link
          to="/nearby-vendors"
          className={`flex items-center gap-3 p-2 rounded hover:bg-blue-500 ${
            isActive("/nearby-vendors") ? "bg-blue-500" : ""
          }`}
        >
          <FaUsers /> Nearby Vendors
        </Link>
        <Link
          to="/vendor-pooling"
          className={`flex items-center gap-3 p-2 rounded hover:bg-blue-500 ${
            isActive("/vendor-pooling") ? "bg-blue-500" : ""
          }`}
        >
          <FaUsers /> Vendor Pooling
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
  );
}
