"use client";
import React from "react";
import { useFilters } from "@/contexts/HotelsFilterContext";

const FilterSidebar = () => {
  const {
    filters,
    setPriceRange,
    toggleStar,
    togglePropertyType,
    togglePopularFilter,
    toggleSustainable,
    setBedrooms,
    setBathrooms,
  } = useFilters();

  return (
    <aside className="w-72 bg-transparent p-6 rounded-2xl shadow-md">
      {/* Title */}
      <h2 className="text-xl font-bold mb-6 text-text-600">Filter by:</h2>

      {/* Price Range */}
      <div className="mb-8">
        <h3 className="font-semibold mb-3 text-text-600">
          Price Range (Per Night)
        </h3>
        <input
          type="range"
          min={1000}
          max={50000}
          step={100}
          value={filters.priceRange[0]}
          onChange={(e) =>
            setPriceRange([+e.target.value, filters.priceRange[1]])
          }
          className="w-full accent-green-500"
        />
        <input
          type="range"
          min={1000}
          max={50000}
          step={100}
          value={filters.priceRange[1]}
          onChange={(e) =>
            setPriceRange([filters.priceRange[0], +e.target.value])
          }
          className="w-full accent-green-500 mt-2"
        />
        <p className="mt-2 text-sm text-text-600">
          {filters.priceRange[0]} EGP – {filters.priceRange[1]} EGP
        </p>
      </div>

      {/* Popular Filters */}
      <div className="mb-8">
        <h3 className="font-semibold mb-3 text-text-600">Popular Filters</h3>
        {["Twin Beds", "No Prepayment", "3 Stars", "Self Catering"].map(
          (item, idx) => (
            <label key={idx} className="flex items-center mb-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.popularFilters.includes(item)}
                onChange={() => togglePopularFilter(item)}
                className="accent-green-500"
              />
              <span className="ml-2 text-sm text-text-600">{item}</span>
            </label>
          )
        )}
      </div>

      {/* Travel Sustainable */}
      {/* <div className="mb-8">
        <h3 className="font-semibold mb-3 text-text-600">Travel Sustainable</h3>
        {["Level 3+", "Level 3 and Higher", "Level 2 and Higher", "Level 1 and Higher"].map(
          (item, idx) => (
            <label key={idx} className="flex items-center mb-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.sustainableLevels.includes(item)}
                onChange={() => toggleSustainable(item)}
                className="accent-green-500"
              />
              <span className="ml-2 text-sm text-text-600">{item}</span>
            </label>
          )
        )}
      </div> */}

      {/* Property Rating */}
      <div className="mb-8">
        <h3 className="font-semibold mb-3 text-text-600">Property Rating</h3>
        {[1, 2, 3, 4, 5].map((star) => (
          <label key={star} className="flex items-center mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.stars.includes(star)}
              onChange={() => toggleStar(star)}
              className="accent-green-500"
            />
            <span className="ml-2 text-sm text-text-600">{star} Star</span>
          </label>
        ))}
        <label className="flex items-center mb-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.stars.includes(0)}
            onChange={() => toggleStar(0)}
            className="accent-green-500"
          />
          <span className="ml-2 text-sm text-text-600">Unrated</span>
        </label>
      </div>

      {/* Property Type */}
      <div className="mb-8">
        <h3 className="font-semibold mb-3 text-text-600">Property Type</h3>
        {["Holiday Rentals", "Apartments", "Hotels", "Hostels", "Villas"].map(
          (type, idx) => (
            <label key={idx} className="flex items-center mb-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.propertyType.includes(type)}
                onChange={() => togglePropertyType(type)}
                className="accent-green-500"
              />
              <span className="ml-2 text-sm text-text-600">{type}</span>
            </label>
          )
        )}
      </div>

      {/* Bedrooms */}
      <div className="mb-8">
        <h3 className="font-semibold mb-3 text-text-600">Number of Bedrooms</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setBedrooms(filters.bedrooms - 1)}
            className="px-2 py-1 border rounded-md text-green-500"
          >
            -
          </button>
          <span className="w-6 text-center text-text-600">
            {filters.bedrooms}
          </span>
          <button
            onClick={() => setBedrooms(filters.bedrooms + 1)}
            className="px-2 py-1 border rounded-md text-green-500"
          >
            +
          </button>
        </div>
      </div>

      {/* Bathrooms */}
      <div className="mb-4">
        <h3 className="font-semibold mb-3 text-text-600">
          Number of Bathrooms
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setBathrooms(filters.bathrooms - 1)}
            className="px-2 py-1 border rounded-md text-green-500"
          >
            -
          </button>
          <span className="w-6 text-center text-text-600">
            {filters.bathrooms}
          </span>
          <button
            onClick={() => setBathrooms(filters.bathrooms + 1)}
            className="px-2 py-1 border rounded-md text-green-500"
          >
            +
          </button>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
