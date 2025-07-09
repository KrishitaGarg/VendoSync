import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./AdminSidebar";

export default function Inventory() {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      const adminToken = localStorage.getItem("adminToken");

      if (!adminToken) {
        console.warn("No adminToken found in localStorage");
        return;
      }

      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/admin/inventories`,
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );
        setInventory(res.data.inventories || []);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
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
          <h1 className="text-2xl font-bold">Inventory</h1>
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
                <th className="px-4 py-3 text-left border border-gray-300">
                  Product Name
                </th>
                <th className="px-4 py-3 text-left border border-gray-300">
                  Category
                </th>
                <th className="px-4 py-3 text-left border border-gray-300">
                  Quantity
                </th>
                <th className="px-4 py-3 text-left border border-gray-300">
                  Price/Unit
                </th>
                <th className="px-4 py-3 text-left border border-gray-300">
                  Source
                </th>
              </tr>
            </thead>
            <tbody>
              {inventory.length > 0 ? (
                inventory.map((item, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 border border-gray-300">
                      {item.itemName}
                    </td>
                    <td className="px-4 py-3 border border-gray-300">
                      {item.customCategory || item.category}
                    </td>
                    <td className="px-4 py-3 border border-gray-300">
                      {item.quantity} {item.unit}
                    </td>
                    <td className="px-4 py-3 border border-gray-300">
                      ₹{item.pricePerUnit}
                    </td>
                    <td className="px-4 py-3 border border-gray-300">
                      {item.source || "—"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-6 text-center text-gray-500 border border-gray-300"
                  >
                    No inventory items found.
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
