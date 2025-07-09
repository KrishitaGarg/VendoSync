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
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/inventory/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      alert("Item updated");
      navigate("/item-list");
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Edit Item</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Item Name</label>
        <input
          name="itemName"
          value={form.itemName || ""}
          onChange={handleChange}
          placeholder="Item Name"
          style={styles.input}
          required
        />

        <label style={styles.label}>Quantity</label>
        <input
          name="quantity"
          value={form.quantity || ""}
          onChange={handleChange}
          placeholder="Quantity"
          style={styles.input}
          required
        />

        {/* Add more fields as needed, styled the same way */}

        <button type="submit" style={styles.button}>
          Update Item
        </button>
        <button
          type="button"
          style={styles.backButton}
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "40px auto",
    padding: "30px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "5px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  backButton: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#888",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
};
