import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const vendorId = localStorage.getItem("vendorId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/inventory/${vendorId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
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
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/inventory/${itemId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setItems(items.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  if (loading) return <p style={styles.message}>Loading...</p>;
  if (items.length === 0) return <p style={styles.message}>No items found.</p>;

  return (
    <div style={styles.container}>
      {/* Back to Dashboard Button */}
      <button onClick={() => navigate("/dashboard")} style={styles.backButton}>
        ← Back to Dashboard
      </button>

      <h1 style={styles.heading}>Inventory List</h1>

      {/* Inventory Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.cell}>Item Name</th>
              <th style={styles.cell}>Category</th>
              <th style={styles.cell}>Quantity</th>
              <th style={styles.cell}>Unit</th>
              <th style={styles.cell}>Price/Unit</th>
              <th style={styles.cell}>Expiry</th>
              <th style={styles.cell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item._id} style={index % 2 ? styles.rowAlt : {}}>
                <td style={styles.cell}>{item.itemName}</td>
                <td style={styles.cell}>
                  {item.category || item.customCategory}
                </td>
                <td style={styles.cell}>{item.quantity}</td>
                <td style={styles.cell}>{item.unit || item.customUnit}</td>
                <td style={styles.cell}>{item.pricePerUnit}</td>
                <td style={styles.cell}>
                  {item.expiryDate
                    ? new Date(item.expiryDate).toLocaleDateString()
                    : "—"}
                </td>
                <td style={styles.cell}>
                  <Link to={`/edit-item/${item._id}`}>
                    <button style={styles.editButton}>Edit</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 🎨 Styles
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "2rem",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    margin: "2rem 0 1rem",
    fontSize: "2rem",
    color: "#333",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    border: "1px solid black",
  },
  cell: {
    border: "1px solid black",
    padding: "10px",
    textAlign: "center",
  },

  rowAlt: {
    backgroundColor: "#f2f2f2",
  },
  backButton: {
    position: "absolute",
    top: "1rem",
    left: "1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  editButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    marginRight: "0.5rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  message: {
    textAlign: "center",
    marginTop: "3rem",
    fontSize: "1.2rem",
    color: "#555",
  },
};
