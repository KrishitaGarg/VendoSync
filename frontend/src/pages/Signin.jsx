import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.css";
import registerImage from "../assets/registerPage.png";
import mainVideo from "../assets/main_video.mp4";

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
      const response = await fetch("/api/vendors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to sign in");
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("vendorId", data.vendorId);
      alert("Sign in successful!");
      navigate("/dashboard");

    } catch (err) {
      setError("Invalid credentials.");
    }
  };
  

  return (
    <section className="relative min-h-screen flex items-center text-left overflow-hidden">
      {/* Background Video with Blur */}
      <video
        src={mainVideo}
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover filter blur-sm"
        style={{ zIndex: 1 }}
      />
      {/* Custom Blue Overlay */}
      <div
        className="absolute w-full h-full"
        style={{ backgroundColor: "#0071DC", opacity: 0.5, zIndex: 2 }}
      />

      <div className="signin-container" style={{ zIndex: 3 }}>
        <img
          src={registerImage}
          alt="Register"
          className="signin-register-image"
          style={{
            width: "100%",
            margin: "0 auto",
            display: "block",
          }}
        />
        <div className="signin-content">
          <h2>Welcome Back</h2>
          <p className="welcome-text">
            Sign in to continue managing your business and orders on W-Setu.
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
              <a href="/join-marketplace">Join Marketplace</a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
