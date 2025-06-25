import React, { useState } from "react";
import "./JoinMarketplace.css";
import { useNavigate } from "react-router-dom";

export default function JoinMarketplace() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    legalBusinessName: "",
    countryOfIncorporation: "",
    market: "India",
    taxId: "",
    businessEmail: "",
    businessPhone: "",
    password: "",
    confirmPassword: "",
    agree: false,
  }); 

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.agree) {
      alert("Please agree to the terms and conditions.");
      return;
    }
    setLoading(true);
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      setLoading(false);
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
        alert("Failed to create account.");
      } else {
        alert("Account created successfully!");
        setForm({
          firstName: "",
          lastName: "",
          legalBusinessName: "",
          countryOfIncorporation: "",
          market: "India",
          taxId: "",
          businessEmail: "",
          businessPhone: "",
          password: "",
          confirmPassword: "",
          agree: false,
        });
        navigate("/signin");
      }
    } catch (error) {
      alert(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg max-w-6xl w-full p-8 flex flex-col md:flex-row gap-6">
        {/* Left side with form */}
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-bold text-center">
            Start selling with W-Setu
          </h2>
          <p className="text-center mb-6 text-gray-600">
            Create your account to reach millions of customers around the world.
          </p>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label>First name</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                className="input-style"
              />
            </div>
            <div>
              <label>Last name</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                className="input-style"
              />
            </div>
            <div>
              <label>Legal business name</label>
              <input
                type="text"
                name="legalBusinessName"
                value={form.legalBusinessName}
                onChange={handleChange}
                required
                className="input-style"
              />
            </div>
            <div>
              <label>Select your market</label>
              <input
                type="text"
                name="market"
                value={form.market}
                onChange={handleChange}
                required
                className="input-style"
              />
            </div>
            <div>
              <label>Country/Region of incorporation</label>
              <select
                name="countryOfIncorporation"
                value={form.countryOfIncorporation}
                onChange={handleChange}
                required
                className="input-style"
              >
                <option value="">Select</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
              </select>
            </div>
            <div>
              <label>Tax ID</label>
              <input
                type="text"
                name="taxId"
                value={form.taxId}
                onChange={handleChange}
                required
                className="input-style"
              />
            </div>
            <div>
              <label>Business email address</label>
              <input
                type="email"
                name="businessEmail"
                value={form.businessEmail}
                onChange={handleChange}
                required
                className="input-style"
              />
            </div>
            <div>
              <label>Business phone number</label>
              <input
                type="text"
                name="businessPhone"
                value={form.businessPhone}
                onChange={handleChange}
                required
                className="input-style"
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="input-style"
              />
            </div>
            <div>
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="input-style"
              />
            </div>
            <div className="md:col-span-2 flex items-start mt-4">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                className="mr-2 mt-1"
              />
              <p className="text-sm">
                I’ve read and agree to the Terms for W-Setu Marketplace. I am
                authorized to act on behalf of a seller whose information I
                provide.
              </p>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={!form.agree || loading}
                className={`w-full py-2 rounded text-white ${
                  form.agree
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </div>
          </form>
          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <a href="/Signin" className="text-blue-600 hover:underline">
              Sign in
            </a>
          </p>
        </div>
        {/* Right side with business benefits */}
        <div className="w-full md:w-1/3 bg-gray-50 rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">
            Your business, powered by W-Setu
          </h3>
          <ul className="list-disc list-inside text-sm space-y-3">
            <li>
              <strong>Voice-First Inventory.</strong> Manage stock using simple
              voice commands in local languages, with no app dependency.
            </li>
            <li>
              <strong>Ultra-Local Forecasting.</strong> Get festival and
              weather-based demand insights tailored to your village or
              micro-market.
            </li>
            <li>
              <strong>Cooperative Ordering.</strong> Pool orders with nearby
              kiranas to reduce costs and access bulk pricing.
            </li>
            <li>
              <strong>Overstock Redistribution.</strong> Easily transfer excess
              stock to nearby shops and minimize waste.
            </li>
            <li>
              <strong>Micro-Credit Access.</strong> Build trust through
              cooperative performance and unlock micro-loans for your business.
            </li>
            <li>
              <strong>Hyperlocal Delivery.</strong> Delivery routes optimized
              for 2-wheelers, carts, and footpaths, considering local traffic
              and weather.
            </li>
          </ul>
          <a
            href="/get-started"
            className="inline-block mt-4 text-blue-600 hover:underline text-sm"
          >
            Learn how to get started
          </a>
        </div>
      </div>
    </div>
  );
}
