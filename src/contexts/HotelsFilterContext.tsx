"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

export type Filters = {
  priceRange: [number, number];
  stars: number[];
  propertyType: string[];
};

type FilterContextType = {
  filters: Filters;
  setPriceRange: (range: [number, number]) => void;
  toggleStar: (star: number) => void;
  togglePropertyType: (type: string) => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<Filters>({
    priceRange: [1000, 50000],
    stars: [],
    propertyType: [],
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

  return (
    <FilterContext.Provider
      value={{ filters, setPriceRange, toggleStar, togglePropertyType }}
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
