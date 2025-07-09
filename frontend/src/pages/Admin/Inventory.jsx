import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./AdminSidebar";

export default function Inventory() {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    itemName: "",
    firstName: "",
    businessEmail: "",
    lowStock: false,
    expired: false,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    itemName: true,
    category: true,
    quantity: true,
    pricePerUnit: true,
    source: true,
    vendorName: true,
    businessEmail: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const fetchInventory = async () => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      console.warn("No adminToken found in localStorage");
      return;
    }

    setIsLoading(true);
    try {
      const params = new URLSearchParams();

      if (filters.itemName) params.append("search", filters.itemName);
      if (filters.firstName) params.append("firstName", filters.firstName);
      if (filters.businessEmail)
        params.append("businessEmail", filters.businessEmail);
      if (filters.lowStock) params.append("lowStock", "true");
      if (filters.expired) params.append("expired", "true");

      const res = await axios.get(
        `${
          process.env.REACT_APP_BACKEND_URL
        }/api/admin/inventories?${params.toString()}`,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );

      setInventory(res.data.inventories || []);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/signin");
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchInventory();
  };

  const toggleColumnVisibility = (column) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
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
          <div className="flex flex-wrap gap-4 mb-4">
            <button
              onClick={() => setShowFilters((prev) => !prev)}
              className="bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-2 rounded"
            >
              {showFilters ? "Hide Filters" : "Apply Filters"}
            </button>

            {/* Column Toggle */}
            <div className="flex flex-wrap gap-4 items-center bg-white p-4 shadow rounded">
              {Object.entries(visibleColumns).map(([column, isVisible]) => (
                <label key={column} className="flex items-center gap-1 text-sm">
                  <input
                    type="checkbox"
                    checked={isVisible}
                    onChange={() => toggleColumnVisibility(column)}
                  />
                  {column
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </label>
              ))}
            </div>
          </div>

          {/* Filter Form */}
          {showFilters && (
            <form
              onSubmit={handleFilterSubmit}
              className="mb-6 space-y-4 bg-white p-4 shadow rounded"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="itemName"
                  value={filters.itemName}
                  onChange={handleChange}
                  placeholder="Search by Item Name"
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="firstName"
                  value={filters.firstName}
                  onChange={handleChange}
                  placeholder="Search by Vendor First Name"
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="businessEmail"
                  value={filters.businessEmail}
                  onChange={handleChange}
                  placeholder="Search by Business Email"
                  className="p-2 border rounded"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="lowStock"
                    checked={filters.lowStock}
                    onChange={handleChange}
                  />
                  Low Stock
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="expired"
                    checked={filters.expired}
                    onChange={handleChange}
                  />
                  Expired Items
                </label>
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{ backgroundColor: "#4F46E5" }}
                    className="text-white px-4 py-2 rounded w-full disabled:opacity-50"
                  >
                    {isLoading ? "Loading..." : "Apply Filters"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFilters({
                        itemName: "",
                        firstName: "",
                        businessEmail: "",
                        lowStock: false,
                        expired: false,
                      });
                      fetchInventory();
                    }}
                    className="bg-indigo-700 text-white px-4 py-2 rounded w-full"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Inventory Table */}
          <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
            <thead className="bg-indigo-700 text-white">
              <tr>
                {visibleColumns.itemName && (
                  <th className="px-4 py-3 text-left border border-gray-300">
                    Product Name
                  </th>
                )}
                {visibleColumns.category && (
                  <th className="px-4 py-3 text-left border border-gray-300">
                    Category
                  </th>
                )}
                {visibleColumns.quantity && (
                  <th className="px-4 py-3 text-left border border-gray-300">
                    Quantity
                  </th>
                )}
                {visibleColumns.pricePerUnit && (
                  <th className="px-4 py-3 text-left border border-gray-300">
                    Price/Unit
                  </th>
                )}
                {visibleColumns.source && (
                  <th className="px-4 py-3 text-left border border-gray-300">
                    Source
                  </th>
                )}
                {visibleColumns.vendorName && (
                  <th className="px-4 py-3 text-left border border-gray-300">
                    Vendor Name
                  </th>
                )}
                {visibleColumns.businessEmail && (
                  <th className="px-4 py-3 text-left border border-gray-300">
                    Business Email
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {inventory.length > 0 ? (
                inventory.map((item, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    {visibleColumns.itemName && (
                      <td className="px-4 py-3 border border-gray-300">
                        {item.itemName}
                      </td>
                    )}
                    {visibleColumns.category && (
                      <td className="px-4 py-3 border border-gray-300">
                        {item.customCategory || item.category}
                      </td>
                    )}
                    {visibleColumns.quantity && (
                      <td className="px-4 py-3 border border-gray-300">
                        {item.quantity} {item.unit}
                      </td>
                    )}
                    {visibleColumns.pricePerUnit && (
                      <td className="px-4 py-3 border border-gray-300">
                        ₹{item.pricePerUnit}
                      </td>
                    )}
                    {visibleColumns.source && (
                      <td className="px-4 py-3 border border-gray-300">
                        {item.source || "—"}
                      </td>
                    )}
                    {visibleColumns.vendorName && (
                      <td className="px-4 py-3 border border-gray-300">
                        {item.vendor?.firstName} {item.vendor?.lastName}
                      </td>
                    )}
                    {visibleColumns.businessEmail && (
                      <td className="px-4 py-3 border border-gray-300">
                        {item.vendor?.businessEmail}
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={
                      Object.values(visibleColumns).filter(Boolean).length
                    }
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
