import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddItemByVoice from "./AddItemByVoice";

export default function AddItem() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    itemName: "",
    category: "",
    customCategory: "",
    quantity: "",
    unit: "",
    customUnit: "",
    pricePerUnit: "",
    expiryInDays: "",
    source: "",
    notes: "",
  });
  const [vendorId, setVendorId] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedVendorId = localStorage.getItem("vendorId");
    if (!savedToken || !savedVendorId) {
      navigate("/signin");
    } else {
      setToken(savedToken);
      setVendorId(savedVendorId);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleVoiceResult = (parsed) => {
    console.log("Voice Result Parsed:", parsed);
    setForm((prev) => ({ ...prev, ...parsed }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vendorId || !token) return alert("Authentication info missing.");
    setLoading(true);

    const payload = {
      vendor: vendorId,
      itemName: form.itemName,
      category: form.category,
      customCategory:
        form.category === "other" ? form.customCategory : undefined,
      quantity: parseFloat(form.quantity),
      unit: form.unit,
      customUnit: form.unit === "other" ? form.customUnit : undefined,
      pricePerUnit: parseFloat(form.pricePerUnit),
      expiryInDays: form.expiryInDays ? parseInt(form.expiryInDays) : null,
      source: form.source,
      notes: form.notes,
    };

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/inventory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add item");
      alert("Inventory item added!");
      setForm({
        itemName: "",
        category: "",
        customCategory: "",
        quantity: "",
        unit: "",
        customUnit: "",
        pricePerUnit: "",
        expiryInDays: "",
        source: "",
        notes: "",
      });
    } catch (err) {
      alert("Submission Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center mb-6">
          Add Inventory Item
        </h2>
        <div className="flex justify-center mb-4">
          <button
            type="button"
            onClick={() =>
              AddItemByVoice({
                token,
                vendorId,
                setLoading,
                onResult: handleVoiceResult,
              })
            }
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Processing..." : "Add by Voice"}
          </button>
        </div>
        <p className="text-center text-gray-600 mb-6">
          Or fill out the form below:
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="itemName"
              value={form.itemName}
              onChange={handleChange}
              placeholder="Item Name"
              required
              className="p-2 border rounded w-full"
            />

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="p-2 border rounded w-full"
            >
              <option value="">Category</option>
              {[
                "vegetables",
                "vegetable",
                "fruits",
                "grains",
                "snacks",
                "beverages",
                "household",
                "other",
              ].map((c) => (
                <option key={c} value={c}>
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </option>
              ))}
            </select>

            {form.category === "other" && (
              <input
                name="customCategory"
                value={form.customCategory}
                onChange={handleChange}
                placeholder="Custom Category"
                required
                className="p-2 border rounded w-full"
              />
            )}

            <input
              name="quantity"
              type="number"
              min="0"
              step="any"
              value={form.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              required
              className="p-2 border rounded w-full"
            />

            <select
              name="unit"
              value={form.unit}
              onChange={handleChange}
              required
              className="p-2 border rounded w-full"
            >
              <option value="">Unit</option>
              {["kg", "kilo", "litre", "dozen", "packet", "piece", "other"].map(
                (u) => (
                  <option key={u} value={u}>
                    {u.charAt(0).toUpperCase() + u.slice(1)}
                  </option>
                )
              )}
            </select>

            {form.unit === "other" && (
              <input
                name="customUnit"
                value={form.customUnit}
                onChange={handleChange}
                placeholder="Custom Unit"
                required
                className="p-2 border rounded w-full"
              />
            )}

            <input
              name="pricePerUnit"
              type="number"
              min="0"
              step="any"
              value={form.pricePerUnit}
              onChange={handleChange}
              placeholder="Price Per Unit"
              required
              className="p-2 border rounded w-full"
            />

            <input
              name="expiryInDays"
              type="number"
              min="0"
              value={form.expiryInDays}
              onChange={handleChange}
              placeholder="Expiry in Days"
              className="p-2 border rounded w-full"
            />

            <select
              name="source"
              value={form.source}
              onChange={handleChange}
              className="p-2 border rounded w-full"
            >
              <option value="">Source</option>
              {["local", "Walmart", "cooperative", "other"].map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Notes"
            rows="4"
            className="p-2 border rounded w-full resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            {loading ? "Adding..." : "Add Item"}
          </button>
        </form>
      </div>
    </div>
  );
}
