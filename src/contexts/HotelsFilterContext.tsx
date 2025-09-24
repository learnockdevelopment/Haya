"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Filters {
  priceRange: [number, number];
  stars: number[];
  propertyType: string[];
  popularFilters: string[];
  sustainableLevels: string[];
  bedrooms: number;
  bathrooms: number;
}

interface FilterContextType {
  filters: Filters;
  setPriceRange: (range: [number, number]) => void;
  toggleStar: (star: number) => void;
  togglePropertyType: (type: string) => void;
  togglePopularFilter: (filter: string) => void;
  toggleSustainable: (level: string) => void;
  setBedrooms: (count: number) => void;
  setBathrooms: (count: number) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<Filters>({
    priceRange: [1000, 50000],
    stars: [],
    propertyType: [],
    popularFilters: [],
    sustainableLevels: [],
    bedrooms: 0,
    bathrooms: 0,
  });

  const setPriceRange = (range: [number, number]) => {
    setFilters((prev) => ({ ...prev, priceRange: range }));
  };

  const toggleStar = (star: number) => {
    setFilters((prev) => ({
      ...prev,
      stars: prev.stars.includes(star)
        ? prev.stars.filter((s) => s !== star)
        : [...prev.stars, star],
    }));
  };

  const togglePropertyType = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      propertyType: prev.propertyType.includes(type)
        ? prev.propertyType.filter((t) => t !== type)
        : [...prev.propertyType, type],
    }));
  };

  const togglePopularFilter = (filter: string) => {
    setFilters((prev) => ({
      ...prev,
      popularFilters: prev.popularFilters.includes(filter)
        ? prev.popularFilters.filter((f) => f !== filter)
        : [...prev.popularFilters, filter],
    }));
  };

  const toggleSustainable = (level: string) => {
    setFilters((prev) => ({
      ...prev,
      sustainableLevels: prev.sustainableLevels.includes(level)
        ? prev.sustainableLevels.filter((l) => l !== level)
        : [...prev.sustainableLevels, level],
    }));
  };

  const setBedrooms = (count: number) => {
    setFilters((prev) => ({ ...prev, bedrooms: Math.max(0, count) }));
  };

  const setBathrooms = (count: number) => {
    setFilters((prev) => ({ ...prev, bathrooms: Math.max(0, count) }));
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        setPriceRange,
        toggleStar,
        togglePropertyType,
        togglePopularFilter,
        toggleSustainable,
        setBedrooms,
        setBathrooms,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) throw new Error("useFilters must be used within FilterProvider");
  return context;
};
