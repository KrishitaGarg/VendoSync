import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBoxes,
  FaChartBar,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import axios from "axios";
import Sidebar from "./AdminSidebar";

export default function Vendors() {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      const adminToken = localStorage.getItem("adminToken");

      if (!adminToken) {
        console.warn("No adminToken found in localStorage");
        return;
      }

      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/admin/vendors`,
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );
        setVendors(res.data || []);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/signin");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">All Vendors</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </header>

        <main className="flex-1 p-6 overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
            <thead className="bg-indigo-700 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Business Name</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Market</th>
              </tr>
            </thead>
            <tbody>
              {vendors.length > 0 ? (
                vendors.map((vendor) => (
                  <tr key={vendor._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3">{vendor.legalBusinessName}</td>
                    <td className="px-4 py-3">
                      {vendor.firstName} {vendor.lastName}
                    </td>
                    <td className="px-4 py-3">{vendor.businessEmail}</td>
                    <td className="px-4 py-3">{vendor.businessPhone || "—"}</td>
                    <td className="px-4 py-3">{vendor.market || "—"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No vendors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}
