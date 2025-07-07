import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <div className="text-xl font-bold mb-2">W-Setu India</div>
          <p className="text-sm text-gray-400">
            &copy; 2025 W-Setu India. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-2 text-sm">
          <a href="#" className="hover:text-blue-400 transition">
            Home
          </a>
          <a href="#features" className="hover:text-blue-400 transition">
            Features
          </a>
          <a href="#about" className="hover:text-blue-400 transition">
            About
          </a>
          <a href="#contact" className="hover:text-blue-400 transition">
            Contact
          </a>
        </div>

        <Link
          to="/admin-signup"
          className="bg-white hover:bg-black text-black hover:text-white border border-transparent hover:border-white text-m px-6 py-2 rounded-full transition duration-300"
        >
          Admin Sign Up
        </Link>
      </div>
    </footer>
  );
}
