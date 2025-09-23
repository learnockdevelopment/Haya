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
      adults: 1,
      children: 0,
      refundable: false,
      reviews: 10,
      rating: 4,
      price: 7200,
      currency: "EGP",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      popular: true,
    },
    {
      id: 2,
      name: "Palmera Azur Resort",
      location: "Hurghada, Egypt",
      description: "Explore ancient wonders with our all-inclusive 3-day package.",
      nights: 7,
      adults: 1,
      children: 0,
      refundable: false,
      reviews: 10,
      rating: 4,
      price: 7200,
      currency: "EGP",
      image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb2100d",
      popular: true,
    },
    {
      id: 3,
      name: "Grand City Hotel",
      location: "Cairo, Egypt",
      description: "Explore ancient wonders with our all-inclusive 3-day package.",
      nights: 7,
      adults: 1,
      children: 0,
      refundable: false,
      reviews: 10,
      rating: 4,
      price: 7200,
      currency: "EGP",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      popular: true,
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
