"use client";
import React, { useState } from "react";
import FlightCard from "./FlightCard";

const categories = ["All", "Beach", "Nature", "City", "Luxury", "Family"];

const flightsData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    title: "Japan",
    packages: 10,
    category: "City",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    title: "Maldives",
    packages: 10,
    category: "Beach",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    title: "Turkey",
    packages: 10,
    category: "Nature",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1505731132164-cca79d6b9c33",
    title: "Greece",
    packages: 10,
    category: "Luxury",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1544986581-efac024faf62",
    title: "Egypt",
    packages: 10,
    category: "Family",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    title: "Bali",
    packages: 10,
    category: "Beach",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    title: "France",
    packages: 10,
    category: "City",
  },
];

const FlightsFilter: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const cardsPerPage = 6;

  const filteredData =
    selectedCategory === "All"
      ? flightsData
      : flightsData.filter((f) => f.category === selectedCategory);

  const totalPages = Math.ceil(filteredData.length / cardsPerPage);

  const currentData = filteredData.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  return (
    <div className="space-y-8">
      {/* Filter */}
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
            className={`px-5 py-2 rounded-full font-medium transition ${
              selectedCategory === cat
                ? "bg-orange-500 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentData.map((flight) => (
          <FlightCard
            key={flight.id}
            image={flight.image}
            title={flight.title}
            packages={flight.packages}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-4 py-2 rounded-lg bg-gray-200 disabled:opacity-50 hover:bg-gray-300 transition"
        >
          Prev
        </button>
        <span className="font-medium">
          {currentPage} / {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-4 py-2 rounded-lg bg-gray-200 disabled:opacity-50 hover:bg-gray-300 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FlightsFilter;
