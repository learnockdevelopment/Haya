"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/ui/Button";
import TourCard from "@/components/ui/TourCard";
import TestimonialCard from "@/components/ui/TestimonialCard";
import DestinationCard from "@/components/ui/DestinationCard";
import StatsCard from "@/components/ui/StatsCard";
import Newsletter from "@/components/ui/Newsletter";
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
import {
  FaPlane,
  FaClock,
  FaBolt,
  FaLanguage,
  FaFileAlt,
} from "react-icons/fa";

import FAQSection from "@/components/ui/FAQS";
import HowItWorks from "@/components/ui/HowItWorks";
import VisaTypeSection from "@/components/ui/VisaTypeSection";

const page: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { user } = useAuth();
  const [tours, setTours] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentSlide, setCurrentSlide] = useState(0);

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
        setDestinations(sampleDestinations);
      } catch (error) {
        console.error("Error fetching data:", error);
        setTours([]);
        setDestinations(sampleDestinations);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const slides = [
    {
      backgroundImage: "/images/hero1.png",
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
      backgroundImage: "/images/hero2.png",
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

  return (
    <div className="min-h-screen">
      <section className="bg-white min-h-[80vh] pt-24 flex flex-col items-center bg-[url(/images/visaHero.svg)] bg-contain bg-center">
        <div className="flex justify-center flex-col w-full py-20 pt-0 gap-8 md:gap-20 items-center pl-24 ">
          {/* <p className="text-lg sm:text-xl md:text-2xl font-medium text-primary-700 font-marck bg-primary-100 rounded-full px-4 py-2 inline-block mb-3 md:mb-4">
              {t("service.title_hero_hotel")}
            </p> */}
          <h1 className="text-text-900  xl:text-6xl lg:text-4xl text-2xl my-3 font-semibold max-w-5xl text-center lg:leading-[80px]">
            {t("service.title_hero_visa")}
          </h1>
          <p className="text-text-500 lg:text-lg text-sm max-w-4xl text-center">
            {t("service.main_title_hero_visa")}
          </p>
        </div>
        <div className="flex gap-6 mt-6 w-full max-w-4xl">
            <input placeholder="Search for country (e.g, Egypt,Turkey....)" className="w-full bg-[#F7F7F7] px-4 rounded-xl"/> <button className="rounded-2xl bg-[#17973F] py-3 px-4 text-lg text-nowrap">Search Visas</button>
        </div>
      </section>



{/*visa type section */}
            <section className="bg-white">
            <VisaTypeSection />
            </section>



      <section className="bg-white shadow p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-start gap-3">
            <div className="bg-green-100 p-3 rounded-xl">
              <FaPlane className="text-green-600 text-xl -rotate-45" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-text-600">Tourist Visa</h2>
              <p className="text-gray-600">
                Perfect for leisure travel, sightseeing, and visiting friends &
                family
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-8 mt-6">
            {/* Required Documents */}
            <div>
              <h3 className="font-semibold text-lg mb-3">
                Required Documents:
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Valid passport (6+ months)</li>
                <li>• Completed application form</li>
                <li>• Recent passport photos</li>
                <li>• Proof of accommodation</li>
              </ul>
            </div>

            {/* Processing Info */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Processing Info:</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <FaClock className="text-green-500" /> Processing time: 5-7
                  business days
                </li>
                <li className="flex items-center gap-2">
                  <FaBolt className="text-green-500" /> Express service
                  available
                </li>
                <li className="flex items-center gap-2">
                  <FaLanguage className="text-green-500" /> Arabic-speaking
                  support included
                </li>
                <li className="flex items-center gap-2">
                  <FaFileAlt className="text-green-500" /> Document review &
                  guidance
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* Popular Tours Section */}
      <section className="py-12 md:py-20 bg-gray-50">
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
      </section>

      {/*how it works */}
      <section className=" bg-white">
        <HowItWorks />
      </section>
      {/* faqs section */}
      <section className="bg-white">
        <FAQSection />
      </section>
    </div>
  );
};

export default page;
