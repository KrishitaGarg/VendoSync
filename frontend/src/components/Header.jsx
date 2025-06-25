import React from "react";

export default function Header() {
  return (
    <header
      className="flex justify-between items-center p-4 fixed top-0 w-full z-20"
      style={{ backgroundColor: "rgba(255, 255, 255)" }}
    >
      <a
        href="#"
        className="text-2xl font-bold text-black"
        style={{ color: "#00569C" }}
      >
        W-Setu India
      </a>
      <nav className="space-x-14">
        <a
          href="#"
          className="text-black hover:text-blue-400 transition"
        >
          Home
        </a>
        <a
          href="#features"
          className="text-black hover:text-blue-400 transition"
        >
          Features
        </a>
        <a href="#about" className="text-black hover:text-blue-400 transition">
          About
        </a>
        <a
          href="#contact"
          className="text-black hover:text-blue-400 transition"
        >
          Contact
        </a>
        <a
          href="/join-marketplace"
          className="text-black hover:text-yellow-400 transition"
          style={{
            transition: "color 0.3s",
            padding: "10px 16px",
            borderRadius: "50em",
            color: "#FFFFFF",
            backgroundColor: "#2F8AE1",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#00569C")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#2F8AE1")}
        >
          Join Marketplace
        </a>
      </nav>
    </header>
  );
}
