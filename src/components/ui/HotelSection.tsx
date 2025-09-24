"use client";
import React, { useState } from "react";
import { useHotels } from "@/contexts/Hotelscontext";
import { useFilters } from "@/contexts/HotelsFilterContext";
import { FiStar } from "react-icons/fi";
import FilterSidebar from "./FilterSidebar";

const HotelsSection: React.FC = () => {
  const { hotels } = useHotels();
  const { filters, setPriceRange, toggleStar } = useFilters();
  const [min, max] = filters.priceRange;
  const filteredHotels = hotels.filter((hotel) => {
    // 1. Price filter
    if (
      hotel.price < filters.priceRange[0] ||
      hotel.price > filters.priceRange[1]
    ) {
      return false;
    }

    // 2. Stars filter
    if (filters.stars.length > 0 && !filters.stars.includes(hotel.rating)) {
      return false;
    }

    // 3. Property type filter
    if (
      filters.propertyType.length > 0 &&
      !filters.propertyType.includes(hotel.popular ? "Hotels" : "Other")
    ) {
      return false;
    }

    // 4. Popular filters (example: "3 Stars", "Self Catering")
    if (
      filters.popularFilters.includes("3 Stars") &&
      hotel.rating !== 3
    ) {
      return false;
    }
    if (
      filters.popularFilters.includes("Self Catering") &&
      hotel.refundable !== true // adjust based on your data fields
    ) {
      return false;
    }

    // 5. Sustainable levels (if you later add a field like hotel.sustainableLevel)
    // if (
    //   filters.sustainableLevels.length > 0 &&
    //   !filters.sustainableLevels.includes(hotel.sustainableLevel)
    // ) {
    //   return false;
    // }

    // 6. Bedrooms filter
    if (filters.bedrooms > 0 && hotel.adults < filters.bedrooms) {
      return false;
    }

    // 7. Bathrooms filter (placeholder — adjust when your hotel model has bathrooms)
    if (filters.bathrooms > 0 && hotel.children < filters.bathrooms) {
      return false;
    }

    return true;
  });
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <FilterSidebar />
        {/* Hotels list */}
        <div className="lg:col-span-3 space-y-6">
          {filteredHotels.length > 0 ? (
            filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
              >
                {/* Hotel Image */}
                <div className="relative md:w-1/3">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-56 md:h-full object-cover"
                  />
                  {hotel.popular && (
                    <span className="absolute top-3 left-3 bg-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                </div>

                {/* Hotel Content */}
                <div className="flex flex-col justify-between p-4 md:w-2/3">
                  <div>
                    <h3 className="text-lg font-bold">{hotel.name}</h3>
                    <p className="text-gray-600 text-sm">{hotel.description}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {hotel.nights} Night, {hotel.adults} adults -{" "}
                      {hotel.children} childs
                    </p>
                    <p className="text-xs text-gray-400">
                      {hotel.refundable ? "Refundable" : "non refundable reservation"}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <span className="text-sm text-gray-600">
                        ({hotel.reviews} Review)
                      </span>
                      <div className="flex text-yellow-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FiStar
                            key={i}
                            className={
                              i < hotel.rating ? "fill-yellow-400" : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <p className="text-lg font-bold text-green-600">
                      {hotel.price.toLocaleString()} {hotel.currency}
                    </p>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition">
                      Book Now →
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No hotels match your filters.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotelsSection;
