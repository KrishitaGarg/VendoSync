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
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    todayOrders: 0,
    monthlyOrders: 0,
    totalInventory: 0,
    vendorsJoined: 0,
  });

  const vendorId = localStorage.getItem("vendorId");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        };

        const [inventoryRes, nearbyRes] = await Promise.all([
          axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/dashboard/total-inventory?vendorId=${vendorId}`,
            { headers }
          ),
          axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/dashboard/nearby?vendorId=${vendorId}&radius=21`,
            { headers }
          ),
        ]);
        setStats((prevStats) => ({
          ...prevStats,
          totalInventory: inventoryRes.data.totalInventory || 0,
          vendorsJoined: nearbyRes.data.totalNearbyVendors || 0,
        }));
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchStats();
  }, [vendorId]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("vendorId");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </header>

        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Today's Orders" value={stats.todayOrders} />
            <StatCard title="Monthly Orders" value={stats.monthlyOrders} />
            <StatCard title="Total Inventory" value={stats.totalInventory} />
            <StatCard title="Nearby Vendors" value={stats.vendorsJoined} />
          </div>
        </main>
      </div>
    </div>
  );
}

// Card Component
function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded shadow text-center hover:scale-105 transition-transform">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
