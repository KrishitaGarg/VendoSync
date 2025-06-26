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

  const handleAudioInput = async () => {
    if (!vendorId || !token) return alert("Authentication info missing.");

    setLoading(true);

    try {
      // Request mic access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks, { type: "audio/wav" });
        const formData = new FormData();
        formData.append("audio", blob, "input.wav");
        formData.append("language", "1"); // 1 = English

        // Send to Whisper backend
        const response = await fetch("/transcribe", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Transcription failed");

        const transcription = data.transcription;
        console.log("Transcription:", transcription);

        // Parse the transcription
        const parsed = parseTranscription(transcription);
        setForm((prev) => ({ ...prev, ...parsed }));
      };

      mediaRecorder.start();

      // Stop recording after 5 seconds
      setTimeout(() => {
        mediaRecorder.stop();
        stream.getTracks().forEach((track) => track.stop());
      }, 5000);
    } catch (err) {
      alert("Error during recording: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const parseTranscription = (text) => {
    // Simple regex-based parsing for demonstration
    const output = {};

    const matchItem = text.match(
      /(?:add\s)?(\d+)\s*(kg|g|liters|units)?\s+of\s+(\w+)/i
    );
    if (matchItem) {
      output.quantity = matchItem[1];
      output.unit = matchItem[2] || "";
      output.itemName = matchItem[3];
    }

    const categoryMatch = text.match(/category\s*(\w+)/i);
    if (categoryMatch) output.category = categoryMatch[1];

    const priceMatch = text.match(/price\s*(\d+)/i);
    if (priceMatch) output.pricePerUnit = priceMatch[1];

    return output;
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
      <button type="button" onClick={handleAudioInput}>
        {loading ? "Processing..." : "Add by Voice"}
      </button>
      <p>Or fill out the form below:</p>
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
