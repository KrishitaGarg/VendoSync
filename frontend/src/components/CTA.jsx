import React from "react";
import { Link } from "react-router-dom";
import guideImage from "../assets/guideImage.png";

export default function GetStartedCTA() {
  return (
    <section id="about" className="w-full bg-[rgb(141,181,249)] py-5">
      <div className="flex justify-center items-center">
        <div className="bg-blue-800 rounded-2xl flex flex-col md:flex-row items-center max-w-6xl w-full overflow-hidden relative m-4 p-8 shadow-lg">
          {/* Abstracts */}
          <div className="absolute bottom-0 right-10 w-48 h-48 bg-yellow-400 rounded-full transform translate-x-1/3 translate-y-1/3"></div>
          <div className="absolute top-0 left-0 w-48 h-48 bg-blue-600 rounded-full transform -translate-x-1/3 -translate-y-1/3"></div>

          {/* Left Image */}
          <div className="flex-shrink-0">
            <img
              src={guideImage}
              alt="Vendor using laptop"
              className="h-80 w-auto object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="p-8 text-center md:text-left flex-1 z-10">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              Learn how you can get started
            </h2>
            <p className="text-white text-lg mb-6 max-w-xl">
              This guide covers everything you need to know to kickstart your
              business with W-Setu — from registration to voice inventory and
              cooperative ordering.
            </p>
            <Link
              to="/get-started"
              className="inline-block border-2 border-white text-white px-6 py-2 rounded-full text-lg font-medium hover:bg-white hover:text-blue-800 transition"
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
