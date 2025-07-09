import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./AdminSidebar";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const adminToken = localStorage.getItem("adminToken");
  const role = localStorage.getItem("role");

  React.useEffect(() => {
    if (!adminToken || role !== "admin") {
      navigate("/admin/signin");
    }
  }, [adminToken, role, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminId");
    localStorage.removeItem("role");
    navigate("/admin/signin");
  };

  const cards = [
    {
      title: "Inventory",
      path: "/admin/inventory",
      bg: "bg-blue-100",
      icon: "📦",
    },
    {
      title: "Analytics",
      path: "/admin/analytics",
      bg: "bg-green-100",
      icon: "📊",
    },
    {
      title: "Vendors",
      path: "/admin/vendors",
      bg: "bg-yellow-100",
      icon: "🏢",
    },
  ];

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

        <main className="flex-1 p-6 flex flex-col items-center">
          <h2 className="text-3xl font-semibold text-gray-700 mb-8">
            Welcome to the Admin Dashboard
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
            {cards.map((card, idx) => (
              <div
                key={idx}
                onClick={() => navigate(card.path)}
                className={`cursor-pointer ${card.bg} p-6 h-48 rounded-xl shadow hover:shadow-md transition flex flex-col items-center justify-center text-center`}
              >
                <div className="text-5xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {card.title}
                </h3>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
