"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

export type Hotel = {
  id: number;
  name: string;
  location: string;
  description: string;
  nights: number;
  adults: number;
  children: number;
  refundable: boolean;
  reviews: number;
  rating: number;
  price: number;
  currency: string;
  image: string;
  popular: boolean;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  sustainableLevel: string;
};

type HotelsContextType = {
  hotels: Hotel[];
};

const HotelsContext = createContext<HotelsContextType | undefined>(undefined);

export const HotelsProvider = ({ children }: { children: ReactNode }) => {
  const [hotels] = useState<Hotel[]>([
  {
    id: 1,
    name: "Amount Hotel Alexandria",
    location: "Alexandria, Egypt",
    description: "Explore ancient wonders with our all-inclusive 3-day package.",
    nights: 7,
    adults: 2,
    children: 1,
    refundable: true,
    reviews: 120,
    rating: 4,
    price: 7200,
    currency: "EGP",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    popular: true,
    propertyType: "Hotel",
    bedrooms: 2,
    bathrooms: 1,
    sustainableLevel: "Level 2 and Higher",
  },
  {
    id: 2,
    name: "Palmera Azur Resort",
    location: "Hurghada, Egypt",
    description: "Beachfront resort with luxury pools and family activities.",
    nights: 5,
    adults: 2,
    children: 2,
    refundable: false,
    reviews: 85,
    rating: 5,
    price: 15000,
    currency: "EGP",
    image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb2100d",
    popular: true,
    propertyType: "Resort",
    bedrooms: 3,
    bathrooms: 2,
    sustainableLevel: "Level 3+",
  },
  {
    id: 3,
    name: "Grand City Hotel",
    location: "Cairo, Egypt",
    description: "Modern hotel in the heart of Cairo with city views.",
    nights: 3,
    adults: 1,
    children: 0,
    refundable: true,
    reviews: 40,
    rating: 3,
    price: 4000,
    currency: "EGP",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    popular: false,
    propertyType: "Hotel",
    bedrooms: 1,
    bathrooms: 1,
    sustainableLevel: "Level 1 and Higher",
  },
  {
    id: 4,
    name: "Nile View Apartments",
    location: "Cairo, Egypt",
    description: "Spacious apartments overlooking the Nile.",
    nights: 7,
    adults: 4,
    children: 0,
    refundable: false,
    reviews: 65,
    rating: 4,
    price: 9500,
    currency: "EGP",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    popular: false,
    propertyType: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    sustainableLevel: "Level 2 and Higher",
  },
  {
    id: 5,
    name: "Sinai Eco Lodge",
    location: "South Sinai, Egypt",
    description: "Eco-friendly lodge surrounded by desert landscapes.",
    nights: 4,
    adults: 2,
    children: 1,
    refundable: true,
    reviews: 22,
    rating: 2,
    price: 2500,
    currency: "EGP",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    popular: false,
    propertyType: "Holiday Rentals",
    bedrooms: 1,
    bathrooms: 1,
    sustainableLevel: "Level 3 and Higher",
  },
  {
    id: 6,
    name: "Red Sea Villas",
    location: "Sharm El Sheikh, Egypt",
    description: "Luxury private villas with pools and sea views.",
    nights: 6,
    adults: 6,
    children: 2,
    refundable: false,
    reviews: 15,
    rating: 5,
    price: 30000,
    currency: "EGP",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    popular: true,
    propertyType: "Villas",
    bedrooms: 4,
    bathrooms: 3,
    sustainableLevel: "Level 3+",
  },
  {
    id: 7,
    name: "Backpackers Hostel",
    location: "Dahab, Egypt",
    description: "Affordable hostel for young travelers and backpackers.",
    nights: 2,
    adults: 1,
    children: 0,
    refundable: true,
    reviews: 300,
    rating: 1,
    price: 800,
    currency: "EGP",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786",
    popular: false,
    propertyType: "Hostels",
    bedrooms: 1,
    bathrooms: 1,
    sustainableLevel: "Level 1 and Higher",
  },
]);


  return (
    <HotelsContext.Provider value={{ hotels }}>
      {children}
    </HotelsContext.Provider>
  );
};

export const useHotels = () => {
  const context = useContext(HotelsContext);
  if (!context) throw new Error("useHotels must be used within HotelsProvider");
  return context;
};
