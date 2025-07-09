import React from "react";

const features = [
  {
    title: "Voice-First Inventory",
    description:
      "Manage stock using simple voice commands in local languages, with no app dependency.",
  },
  {
    title: "Ultra-Local Forecasting",
    description:
      "Get festival and weather-based demand insights tailored to your village or micro-market.",
  },
  {
    title: "Cooperative Ordering",
    description:
      "Pool orders with nearby kiranas to reduce costs and access bulk pricing.",
  },
  {
    title: "Overstock Redistribution",
    description:
      "Easily transfer excess stock to nearby shops and minimize waste.",
  },
  {
    title: "Micro-Credit Access",
    description:
      "Build trust through cooperative performance and unlock micro-loans for your business.",
  },
  {
    title: "Hyperlocal Delivery",
    description:
      "Delivery routes optimized for 2-wheelers, carts, and footpaths, considering local traffic and weather.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-black bg-opacity-90 text-white">
      <h2 className="text-4xl font-bold text-center mb-6">
        Discover our solutions designed to empower kiranas and micro-vendors.
      </h2>
      <p className="text-xl text-center max-w-3xl mx-auto mb-12 text-gray-300">
        Seamlessly manage inventory, forecast local demand, pool orders,
        streamline deliveries, and unlock financial growth — all through a
        simple, voice-first, low-tech platform.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 border border-yellow-400 rounded-2xl shadow-lg hover:scale-105 transition"
          >
            <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
            <p className="text-lg">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
