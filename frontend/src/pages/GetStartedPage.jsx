import React, { useState } from "react";
import {
  FaWhatsapp,
  FaLanguage,
  FaMicrophone,
  FaChartLine,
  FaPeopleCarry,
  FaExchangeAlt,
  FaMoneyCheckAlt,
} from "react-icons/fa";

const steps = [
  {
    title: { en: "Register", hi: "पंजीकरण करें" },
    description: {
      en: "Register via WhatsApp or online.",
      hi: "व्हाट्सएप या ऑनलाइन के माध्यम से पंजीकरण करें।",
    },
    icon: <FaWhatsapp />,
    color: "#34D399",
  },
  {
    title: { en: "Language Setup", hi: "भाषा सेटअप" },
    description: {
      en: "Choose language & voice entry.",
      hi: "भाषा और वॉइस एंट्री चुनें।",
    },
    icon: <FaLanguage />,
    color: "#3B82F6",
  },
  {
    title: { en: "Add Inventory", hi: "इन्वेंटरी जोड़ें" },
    description: {
      en: "Use voice commands to add items.",
      hi: "आइटम जोड़ने के लिए वॉइस कमांड का उपयोग करें।",
    },
    icon: <FaMicrophone />,
    color: "#10B981",
  },
  {
    title: { en: "Forecasting", hi: "पूर्वानुमान" },
    description: {
      en: "View demand & pricing insights.",
      hi: "मांग और मूल्य अंतर्दृष्टि देखें।",
    },
    icon: <FaChartLine />,
    color: "#8B5CF6",
  },
  {
    title: { en: "Co-op Orders", hi: "सहकारी आदेश" },
    description: {
      en: "Join pooled orders to save costs.",
      hi: "लागत बचाने के लिए समूह आदेशों में शामिल हों।",
    },
    icon: <FaPeopleCarry />,
    color: "#F59E0B",
  },
  {
    title: { en: "Redistribute", hi: "पुनः वितरण करें" },
    description: {
      en: "Share overstock with nearby shops.",
      hi: "अधिशेष स्टॉक को पास की दुकानों के साथ साझा करें।",
    },
    icon: <FaExchangeAlt />,
    color: "#EC4899",
  },
  {
    title: { en: "Micro-Credit", hi: "माइक्रो-क्रेडिट" },
    description: {
      en: "Unlock loans with trust scores.",
      hi: "विश्वास स्कोर के साथ ऋण खोलें।",
    },
    icon: <FaMoneyCheckAlt />,
    color: "#EF4444",
  },
];

export default function VerticalFlow() {
  const [language, setLanguage] = useState("en");

  return (
    <section className="py-20 min-h-screen relative bg-[#EFF6FF] overflow-hidden">
      {/* Top Left Blob */}
      <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-blue-600 rounded-full opacity-30 -translate-x-1/2 -translate-y-1/2"></div>

      {/* Bottom Right Blob */}
      <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-yellow-400 rounded-full opacity-30 translate-x-1/2 translate-y-1/2"></div>

      {/* Language Switcher */}
      <div className="flex justify-center mb-8 relative z-10">
        <button
          onClick={() => setLanguage("en")}
          className={`px-4 py-2 border min-w-[120px] text-center rounded-l-xl ${
            language === "en" ? "bg-yellow-400" : "bg-gray-200"
          }`}
        >
          English
        </button>
        <button
          onClick={() => setLanguage("hi")}
          className={`px-4 py-2 border min-w-[120px] text-center rounded-r-xl ${
            language === "hi" ? "bg-yellow-400" : "bg-gray-200"
          }`}
        >
          हिंदी
        </button>
      </div>

      {/* Heading */}
      <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 relative z-10">
        {language === "en"
          ? "Quick Start: Join, Manage, Grow"
          : "तेज़ शुरुआत: जुड़ें, संभालें, बढ़ें"}
      </h2>

      {/* Steps */}
      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative w-full flex flex-col items-center"
          >
            {/* Connector */}
            {index !== 0 && (
              <div className="w-1 h-8 bg-gray-400 border-dashed border-2 border-gray-400"></div>
            )}

            {/* Step Box */}
            <div className="flex items-center gap-4 p-4 border-2 border-gray-300 rounded-xl w-4/5 bg-white shadow-lg">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl text-white"
                style={{ backgroundColor: step.color }}
              >
                {step.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-2">
                  {step.title[language]}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {step.description[language]}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Join Now Button */}
      <div className="flex justify-center mt-16 relative z-10">
        <a
          href="/join-marketplace"
          className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          Join Now
        </a>
      </div>
    </section>
  );
}
