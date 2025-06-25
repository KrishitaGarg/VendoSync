import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    expiryDate: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vendorId || !token) return alert("Authentication info missing.");

    setLoading(true);
    try {
      const response = await fetch("/api/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ vendor: vendorId, ...form }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to add item");

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
        expiryDate: "",
        source: "",
        notes: "",
      });
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inventory-management">
      <h2>Add Inventory Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="itemName"
          value={form.itemName}
          onChange={handleChange}
          placeholder="Item Name"
          required
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        {form.category.toLowerCase() === "other" && (
          <input
            name="customCategory"
            value={form.customCategory}
            onChange={handleChange}
            placeholder="Custom Category"
          />
        )}
        <input
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          required
        />
        <input
          name="unit"
          value={form.unit}
          onChange={handleChange}
          placeholder="Unit"
          required
        />
        {form.unit.toLowerCase() === "other" && (
          <input
            name="customUnit"
            value={form.customUnit}
            onChange={handleChange}
            placeholder="Custom Unit"
          />
        )}
        <input
          name="pricePerUnit"
          value={form.pricePerUnit}
          onChange={handleChange}
          placeholder="Price Per Unit"
          required
        />
        <input
          name="expiryInDays"
          value={form.expiryInDays}
          onChange={handleChange}
          placeholder="Expiry in Days"
        />
        <input
          type="date"
          name="expiryDate"
          value={form.expiryDate}
          onChange={handleChange}
        />
        <input
          name="source"
          value={form.source}
          onChange={handleChange}
          placeholder="Source"
        />
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Notes"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Item"}
        </button>
      </form>
    </div>
  );
}
