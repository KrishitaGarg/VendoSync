import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.css";
import registerImage from "../../assets/registerPage.png";
import mainVideo from "../../assets/main_video.mp4";

const Signin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminId", data._id);
      localStorage.setItem("role", data.role);
      alert("Admin login successful!");

      // Redirect based on role
      if (data.role === "superadmin") {
        navigate("/superadmin-dashboard");
      } else {
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center text-left overflow-hidden"
      style={{ backgroundColor: "#6696fd" }}
    >
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 z-10 bg-white text-blue-600 font-semibold py-2 px-4 rounded hover:bg-gray-200 transition"
      >
        ← Back to Home
      </button>

      {/* Background Video */}
      <video
        src={mainVideo}
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover filter blur-sm"
        style={{ zIndex: 1 }}
      />
      {/* Overlay */}
      <div
        className="absolute w-full h-full"
        style={{ backgroundColor: "#0071DC", opacity: 0.5, zIndex: 2 }}
      />
      <div className="signin-container" style={{ zIndex: 3 }}>
        <img
          src={registerImage}
          alt="Register"
          className="signin-register-image"
          style={{ width: "100%", margin: "0 auto", display: "block" }}
        />
        <div className="signin-content">
          <h2>Admin Sign In</h2>
          <p className="welcome-text">
            Sign in to access your admin dashboard.
          </p>

          <form className="signin-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="username"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit">Sign In</button>
          </form>

          <div className="signin-footer">
            <span>
              Don't have an account?{" "}
              <a href="/admin-signup">Register as Admin</a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
