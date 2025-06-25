import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchItem = async () => {
      const res = await fetch(`/api/inventory/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setForm(data);
    };
    fetchItem();
  }, [id, token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`/api/inventory/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      alert("Item updated");
      navigate("/dashboard");
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="itemName"
        value={form.itemName || ""}
        onChange={handleChange}
        placeholder="Item Name"
      />
      <input
        name="quantity"
        value={form.quantity || ""}
        onChange={handleChange}
        placeholder="Quantity"
      />
      {/* Add other fields as needed */}
      <button type="submit">Update</button>
    </form>
  );
}
