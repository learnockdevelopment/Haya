"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/ui/Button";
import TourCard from "@/components/ui/TourCard";
import DestinationCard from "@/components/ui/DestinationCard";

import apiClient from "@/lib/apiClient";
import {
  FiArrowRight,
  FiShield,
  FiZap,
  FiGlobe,
  FiCreditCard,
  FiUsers,
  FiMapPin,
  FiAward,
  FiHeart,
} from "react-icons/fi";
import { FiCheck, FiPhone } from "react-icons/fi";

import FlightSearch from "@/components/ui/FlightSearch";
import Image from "next/image";
import FlightsFilter from "@/components/ui/FlightsFilter";

const page: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { user } = useAuth();
  const [tours, setTours] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);


  // Get testimonials per slide based on screen size
  const getTestimonialsPerSlide = () => {
    if (typeof window === "undefined") return 2;
    if (window.innerWidth < 768) return 1;
    return 2;
  };

  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setCurrentSlide(0); // Reset to first slide on resize
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sample data for destinations
  const sampleDestinations = [
    {
      id: "1",
      name: "Paris",
      country: "France",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tourCount: 25,
      description:
        "The City of Light, famous for its art, fashion, and cuisine",
      slug: "paris-france",
    },
    {
      id: "2",
      name: "Tokyo",
      country: "Japan",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop&crop=center",
      tourCount: 18,
      description:
        "A vibrant metropolis blending traditional culture with modern innovation",
      slug: "tokyo-japan",
    },
    {
      id: "3",
      name: "Santorini",
      country: "Greece",
      image:
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop&crop=center",
      tourCount: 12,
      description: "Breathtaking sunsets and stunning white-washed buildings",
      slug: "santorini-greece",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch tours
        const toursData = await apiClient.get(
          "/api/tours?featured=true&limit=6"
        );
        if (toursData.success) {
          setTours(toursData.data.tours);
        }

        

        // Set sample destinations
      } catch (error) {
        console.error("Error fetching data:", error);
        setTours([]);
       
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const slides = [
    {
      backgroundImage: "/images/flight1.svg",
      title: "Welcome to Our Platform",
      subtitle: "Discover amazing features that will transform your workflow",
      user: false,
      registerText: "Get Started",
      loginText: "Sign In",
      registerLink: "/register",
      loginLink: "/login",
      dashboardText: "Go to Dashboard",
      dashboardLink: "/dashboard",
      titleColor: "text-text-950",
    },
    {
      backgroundImage: "/images/flight2.svg",
      title: "Advanced Solutions",
      subtitle: "Our cutting-edge technology will help you achieve your goals",
      user: false,
      registerText: "Start Free Trial",
      loginText: "Login to Account",
      registerLink: "/trial",
      loginLink: "/login",
      titleColor: "text-white",
    },
  ];
 const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    "/images/flight1.svg",
    "/images/flight2.svg" // Make sure you have this image
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

 console.log(tours)
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {/* <FlightHero
        slides={slides} 
        autoPlay={true}
        interval={6000}
        showNavigation={true}
        showIndicators={true}
      /> */}

      <section className="min-h-screen w-full flex items-center justify-center py-8 lg:py-0 px-4 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center w-full max-w-7xl mx-auto">
    {/* Text Content */}
    <div className="order-2 lg:order-1 text-center lg:text-left">
      <h1 className="text-text-600 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] leading-tight sm:leading-tight md:leading-tight lg:leading-tight xl:leading-tight mb-4 sm:mb-6 font-semibold font-manrope">
        Book Your Dream Flights Now
        <span className="text-secondary-400">!</span>
      </h1>
      <p className="text-text-600 text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo iure tenetur eos molestiae distinctio? Cupiditate.
      </p>
    </div>

    {/* Image Slider */}
    <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
      <div className="relative w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] overflow-hidden">
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={src}
              alt={`Flight ${index + 1}`}
              width={600}
              height={600}
              className="object-contain w-full h-full"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* search Section */}
      <FlightSearch />
      {/* Get to know us section */}

      {/* Popular Tours Section */}
      {/* <section className="py-12 md:py-20 bg-gray-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-8 md:mb-12 gap-4 md:gap-6">
            <div className="text-center lg:text-left">
              <h2 className="text-sm md:text-base lg:text-lg font-marck font-bold inline-block mb-2 md:mb-4 text-primary-700 bg-primary-100 rounded-full px-3 py-1 md:px-4 md:py-2">
                {t("home.popularTours")}
              </h2>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-text-950 max-w-2xl">
                {t("home.popularToursSubtitle")}
              </p>
            </div>
            <div className="mt-4 lg:mt-0">
              <Link href="/tours">
                <Button
                  size="lg"
                  className="bg-transparent text-primary-500 font-marck hover:bg-transparent hover:scale-105 transition-transform duration-200 text-sm md:text-base"
                >
                  {t("home.viewAllTours")}
                </Button>
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-3 md:p-4 animate-pulse"
                >
                  <div className="h-40 md:h-48 bg-gray-200 rounded-lg mb-3 md:mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-3 md:mb-4 w-1/2"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-200 rounded w-16 md:w-20"></div>
                    <div className="h-8 bg-gray-200 rounded w-20 md:w-24"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : tours.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {tours.map((tour) => (
                <TourCard key={tour._id} tour={tour} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 md:py-12">
              <p className="text-gray-500 text-sm md:text-base">
                No tours available at the moment.
              </p>
            </div>
          )}
        </div>
      </section> */}



 {/* Popular Tours Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-8 md:mb-12 gap-4 md:gap-6">
            <div className="text-center lg:text-left">
              <h2 className="text-sm md:text-base lg:text-lg font-marck font-bold inline-block mb-2 md:mb-4 text-primary-700 bg-primary-100 rounded-full px-3 py-1 md:px-4 md:py-2">
                {t('home.popularTours')}
              </h2>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-text-950 max-w-2xl">
                {t('home.popularToursSubtitle')}
              </p>
            </div>
            <div className="mt-4 lg:mt-0">
              <Link href="/tours">
                <Button size="lg" className='bg-transparent text-primary-500 font-marck hover:bg-transparent hover:scale-105 transition-transform duration-200 text-sm md:text-base'>
                  {t('home.viewAllTours')}
                </Button>
              </Link>
            </div>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-3 md:p-4 animate-pulse">
                  <div className="h-40 md:h-48 bg-gray-200 rounded-lg mb-3 md:mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-3 md:mb-4 w-1/2"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-200 rounded w-16 md:w-20"></div>
                    <div className="h-8 bg-gray-200 rounded w-20 md:w-24"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : tours.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {tours.map((tour) => (
                <TourCard key={tour._id} tour={tour} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 md:py-12">
              <p className="text-gray-500 text-sm md:text-base">No tours available at the moment.</p>
            </div>
          )}
        </div>
      </section>





      {/* Start section */}

      {/* Popular Destinations Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-sm md:text-base lg:text-lg font-marck font-bold inline-block mb-2 md:mb-4 text-primary-700 bg-primary-100 rounded-full px-3 py-1 md:px-4 md:py-2">
              {t("home.top_destinations")}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              {t("home.destinationsSubtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      {/* flights Section */}
      <div className="py-12 md:py-20 bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FlightsFilter />
      </div>
      </div>
  );
};

export default page;
