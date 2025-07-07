import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./AdminSidebar";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  React.useEffect(() => {
    if (!token || role !== "admin") {
      navigate("/admin/signin");
    }
  }, [token, role, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminId");
    localStorage.removeItem("role");
    navigate("/admin/signin");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </header>

        <main className="flex-1 p-6 flex justify-center items-center">
          <h2 className="text-3xl font-semibold text-gray-700">
            Welcome to the Admin Dashboard
          </h2>
        </main>
      </div>
    </div>
  );
}
