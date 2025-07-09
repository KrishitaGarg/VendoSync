import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "./AdminSidebar";
import { useNavigate } from "react-router-dom";

const AdminAnalytics = () => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const adminToken = localStorage.getItem("adminToken");
  const role = localStorage.getItem("role");

  React.useEffect(() => {
    if (!adminToken || role !== "admin") {
      navigate("/admin/signin");
    }
  }, [adminToken, role, navigate]);

  const [inputData, setInputData] = useState({
    total_stock: 100,
    avg_discount: 0.1,
    store_traffic: 250,
    prev_week_sales: 50,
    prev_year_sales: 2000,
    temperature: 25,
    class_encoded: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: parseFloat(value) });
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminId");
    localStorage.removeItem("role");
    navigate("/admin/signin");
  };

  const fetchPrediction = async () => {
    setLoading(true);
    setError(null);
    setPrediction(null);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PREDICTION_URL}`,
        {
          features: inputData,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setPrediction(response.data);
    } catch (err) {
      console.error("Prediction error:", err);
      setError("Failed to fetch prediction.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrediction();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4 flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </header>

        {/* Input Form */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Prediction Inputs
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(inputData).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-600 capitalize">
                  {key.replace(/_/g, " ")}
                </label>
                <input
                  type="number"
                  name={key}
                  value={value}
                  step="any"
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ))}
          </div>
          <button
            onClick={fetchPrediction}
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Predict Again
          </button>
        </div>

        {/* Output Display */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Prediction Output
          </h2>

          {loading && <p className="text-gray-600">Loading prediction...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {prediction && (
            <div className="text-gray-800 space-y-4">
              <div className="border rounded-lg p-4 bg-blue-50">
                <h3 className="text-lg font-bold text-blue-800">
                  Predicted Class
                </h3>
                <p className="text-md">{prediction.class_name}</p>
              </div>

              <div className="border rounded-lg p-4 bg-green-50">
                <h3 className="text-lg font-bold text-green-800">
                  Demand Increase Probability
                </h3>
                <p className="text-md">
                  {(prediction.demand_increase_probability * 100).toFixed(2)}%
                </p>
              </div>

              <div className="border rounded-lg p-4 bg-yellow-50">
                <h3 className="text-lg font-bold text-yellow-800">
                  Model Note
                </h3>
                <p className="text-md italic">{prediction.note}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
