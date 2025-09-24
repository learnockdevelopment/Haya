import React, { useState } from "react";

export default function VisaTypeSection() {
  const [activeRegion, setActiveRegion] = useState("All Regions");
  const [activeVisa, setActiveVisa] = useState("Tourist");

  const regions = [
    "All Regions",
    "Middle East",
    "Africa",
    "Europe",
    "Asia",
    "America",
  ];
  const visaTypes = [
    "Tourist",
    "Business",
    "Student",
    "Work",
    "Religious",
    "America",
  ];

  return (
    <section className="pb-12 bg-white text-center">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        Choose Your Visa Type
      </h2>
      <p className="text-gray-600 mb-8">
        Select the type of visa you need and explore destinations by region
      </p>

      {/* Regions Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {regions.map((region) => (
          <button
            key={region}
            onClick={() => setActiveRegion(region)}
            className={`px-4 py-2 rounded-md font-medium text-sm md:text-base transition-all
              ${
                activeRegion === region
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            {region}
          </button>
        ))}
      </div>

      {/* Visa Types Tabs */}
      <div className="flex flex-wrap justify-between bg-gray-100 rounded-full overflow-hidden max-w-4xl mx-auto">
        {visaTypes.map((type) => (
          <button
            key={type}
            onClick={() => setActiveVisa(type)}
            className={`px-6 py-2 font-medium text-sm md:text-base transition-all
              ${
                activeVisa === type
                  ? "bg-green-600 text-white rounded-full"
                  : "text-gray-800 hover:bg-gray-200"
              }`}
          >
            {type}
          </button>
        ))}
      </div>
    </section>
  );
}
