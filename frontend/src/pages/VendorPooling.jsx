import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

export default function VendorPooling() {
  const [pools, setPools] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [creating, setCreating] = useState(false);
  const [items, setItems] = useState([
    { itemName: "", unit: "", quantity: "", pricePerUnit: "" },
  ]);
  const [refresh, setRefresh] = useState(false);

  const vendorId = localStorage.getItem("vendorId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    const fetchPools = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/pools`,
          { headers }
        );
        setPools(res.data || []);
      } catch (err) {
        setError("Failed to fetch pools.");
      }
    };

    fetchPools();
  }, [refresh]);

  const handleJoinPool = async (poolId) => {
    try {
      if (!vendorId) {
        setError("Vendor ID is missing");
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/pools/${poolId}/join`,
        {
          vendorId: vendorId,
        },
        { headers }
      );

      setSuccess(response.data.message);
      setError("");
      setRefresh((prev) => !prev);
    } catch (error) {
      const msg =
        error.response?.data?.message || "An unexpected error occurred";
      setError(msg);
      setSuccess("");
    }
  };

  const handleCreatePool = async () => {
    if (items.length === 0 || !vendorId) return;

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/pools/create`,
        {
          createdBy: vendorId,
          items,
        },
        { headers }
      );
      alert("Pool created successfully!");
      setItems([{ itemName: "", unit: "", quantity: "", pricePerUnit: "" }]);
      setCreating(false);
      setRefresh(!refresh);
    } catch (err) {
      alert("Failed to create a pool.");
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItemField = () => {
    setItems([
      ...items,
      { itemName: "", unit: "", quantity: "", pricePerUnit: "" },
    ]);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-semibold">Vendor Pooling</h2>
          <button
            onClick={() => setCreating(!creating)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {creating ? "Cancel" : "Create Pool"}
          </button>
        </div>

        {creating && (
          <div className="mb-6 bg-white p-6 shadow rounded">
            <h3 className="text-lg font-semibold mb-4">New Pool - Add Items</h3>
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Item Name"
                  value={item.itemName}
                  onChange={(e) =>
                    handleItemChange(index, "itemName", e.target.value)
                  }
                  className="border px-3 py-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Unit"
                  value={item.unit}
                  onChange={(e) =>
                    handleItemChange(index, "unit", e.target.value)
                  }
                  className="border px-3 py-2 rounded"
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                  className="border px-3 py-2 rounded"
                />
                <input
                  type="number"
                  placeholder="Price Per Unit"
                  value={item.pricePerUnit}
                  onChange={(e) =>
                    handleItemChange(index, "pricePerUnit", e.target.value)
                  }
                  className="border px-3 py-2 rounded"
                />
              </div>
            ))}
            <button
              onClick={addItemField}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-3"
            >
              + Add Item
            </button>
            <button
              onClick={handleCreatePool}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Submit Pool
            </button>
          </div>
        )}

        {success && <p className="text-green-600 mb-4">{success}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Vendors
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pools.length === 0 ? (
                <tr>
                  <td className="px-6 py-4" colSpan="4">
                    No pooling requests available.
                  </td>
                </tr>
              ) : (
                pools.map((pool) => (
                  <tr key={pool._id}>
                    <td className="px-6 py-4">
                      <ul className="list-disc list-inside">
                        {pool.items?.map((item, idx) => (
                          <li key={idx}>
                            {item.itemName} ({item.quantity} {item.unit})
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-4">
                      {pool.vendorsInvolved?.length || 0}
                    </td>
                    <td className="px-6 py-4">
                      {pool.location?.coordinates?.join(", ") || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleJoinPool(pool._id)}
                        className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                        disabled={pool.vendorsInvolved?.includes(vendorId)}
                      >
                        Join
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
