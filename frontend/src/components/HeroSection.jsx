import React from "react";
import mainVideo from "../assets/main_video.mp4";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center text-left overflow-hidden">
      {/* Background Video with Blur */}
      <video
        src={mainVideo}
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover filter blur-sm"
      />

      {/* Custom Blue Overlay */}
      <div
        className="absolute w-full h-full"
        style={{ backgroundColor: "#0071DC", opacity: 0.5 }}
      />

      {/* Overlay Content */}
      <div
        className="relative z-10 p-4 text-white flex flex-col items-start"
        style={{ marginLeft: "50px", marginTop: "100px" }}
      >
        <h1
          className="text-8xl mb-6 font-light"
          style={{
            color: "#FFC220",
            fontFamily: "Antique Olive, sans-serif",
            width: "70%",
          }}
        >
          Empowering Kiranas with Voice-First AI
        </h1>
        <p className="text-3xl mb-6 font-normal " style={{ width: "70%" }}>
          W-Setu India: Hyperlocal, Inclusive, Voice-Powered Supply Chain for
          Small Vendors.
        </p>
        <a
          href="#features"
          className="bg-white text-black px-6 py-3 text-lg font-semibold hover:bg-yellow-500 transition"
          style={{ padding: "10px 25px", borderRadius: "50em" }}
        >
          Explore Features
        </a>
      </div>
    </section>
  );
}
