import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const vendorId = localStorage.getItem("vendorId");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`/api/inventory?vendor=${vendorId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [vendorId, token]);

  const handleDelete = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await fetch(`/api/inventory/${itemId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(items.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (items.length === 0) return <p>No items found.</p>;

  return (
    <table border="1" cellPadding="8" cellSpacing="0">
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Category</th>
          <th>Quantity</th>
          <th>Unit</th>
          <th>Price/Unit</th>
          <th>Expiry</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item._id}>
            <td>{item.itemName}</td>
            <td>{item.category || item.customCategory}</td>
            <td>{item.quantity}</td>
            <td>{item.unit || item.customUnit}</td>
            <td>{item.pricePerUnit}</td>
            <td>
              {item.expiryDate
                ? new Date(item.expiryDate).toLocaleDateString()
                : "—"}
            </td>
            <td>
              <Link to={`/edit-item/${item._id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
