import React from "react";
import {
  FaHome,
  FaBoxes,
  FaChartBar,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminId");
    localStorage.removeItem("role");
    navigate("/admin/signin");
  };

  return (
    <aside className="w-64 bg-indigo-700 text-white flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-8">W-Setu Admin</h2>
      <nav className="flex flex-col gap-4">
        <a
          href="/admin/dashboard"
          className="flex items-center gap-2 hover:bg-indigo-600 p-2 rounded"
        >
          <FaHome /> Dashboard
        </a>
        <a
          href="/admin/inventory"
          className="flex items-center gap-2 hover:bg-indigo-600 p-2 rounded"
        >
          <FaBoxes /> Inventory
        </a>
        <a
          href="/admin/analytics"
          className="flex items-center gap-2 hover:bg-indigo-600 p-2 rounded"
        >
          <FaChartBar /> Analytics
        </a>
        <a
          href="/admin/vendors"
          className="flex items-center gap-2 hover:bg-indigo-600 p-2 rounded"
        >
          <FaUsers /> Vendors
        </a>
        <a
          href="/admin/route-map"
          className="flex items-center gap-2 hover:bg-indigo-600 p-2 rounded"
        >
          <FaMapMarkerAlt /> Smart Route
        </a>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 hover:bg-red-600 p-2 rounded mt-auto"
        >
          <FaSignOutAlt /> Logout
        </button>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
