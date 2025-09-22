'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';
import TourCard from '@/components/ui/TourCard';
import TestimonialCard from '@/components/ui/TestimonialCard';
import DestinationCard from '@/components/ui/DestinationCard';
import StatsCard from '@/components/ui/StatsCard';
import Newsletter from '@/components/ui/Newsletter';
import apiClient from '@/lib/apiClient';
import { FiArrowRight, FiShield, FiZap, FiGlobe, FiCreditCard, FiUsers, FiMapPin, FiAward, FiHeart } from 'react-icons/fi';
import { FiCheck, FiPhone } from 'react-icons/fi';
import HeroSlider from '../ui/Hero';
import WhyChoose from '../ui/whyChoose';
import { title } from 'process';
import Start from '../ui/Start';

const HomePage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { user } = useAuth();
  const [tours, setTours] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev === Math.ceil(testimonials.length / getTestimonialsPerSlide()) - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? Math.ceil(testimonials.length / getTestimonialsPerSlide()) - 1 : prev - 1
    );
  };

  // Get testimonials per slide based on screen size
  const getTestimonialsPerSlide = () => {
    if (typeof window === 'undefined') return 2;
    if (window.innerWidth < 768) return 1;
    return 2;
  };

  // Auto-play functionality
  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length, currentSlide]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setCurrentSlide(0); // Reset to first slide on resize
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const staticTestimonials = [
    {
      _id: 'static-1',
      name: 'Sarah Johnson',
      location: 'New York',
      country: 'USA',
      rating: 5,
      title: 'Absolutely Incredible Experience!',
      content: 'The tour exceeded all our expectations. Our guide was knowledgeable and the itinerary was perfectly planned. We will definitely be booking again for our next vacation.',
      tourName: 'Classic Europe Tour',
      avatar: '',
      isVerified: true,
      createdAt: '2024-01-15T00:00:00.000Z'
    },
    {
      _id: 'static-2',
      name: 'Marcus Chen',
      location: 'Toronto',
      country: 'Canada',
      rating: 5,
      title: 'Best Vacation Ever!',
      content: 'Every detail was taken care of. The accommodations were excellent and the local experiences were authentic. Highly recommended for travelers seeking adventure.',
      tourName: 'Asian Adventure Package',
      avatar: '',
      isVerified: true,
      createdAt: '2024-01-10T00:00:00.000Z'
    },
    {
      _id: 'static-3',
      name: 'Elena Rodriguez',
      location: 'Madrid',
      country: 'Spain',
      rating: 4,
      title: 'Wonderful Cultural Experience',
      content: 'Loved the cultural immersion and the friendly guides. The food experiences were particularly memorable. Would love to do another tour with this company.',
      tourName: 'Mediterranean Discovery',
      avatar: '',
      isVerified: true,
      createdAt: '2024-01-08T00:00:00.000Z'
    },
    {
      _id: 'static-4',
      name: 'David Thompson',
      location: 'London',
      country: 'UK',
      rating: 5,
      title: 'Professional and Well-Organized',
      content: 'From booking to the actual tour, everything was seamless. The communication was excellent and the tour guides were professional. Great value for money.',
      tourName: 'UK Countryside Tour',
      avatar: '',
      isVerified: true,
      createdAt: '2024-01-05T00:00:00.000Z'
    },
    {
      _id: 'static-5',
      name: 'Aisha Mohammed',
      location: 'Dubai',
      country: 'UAE',
      rating: 5,
      title: 'Memorable Family Vacation',
      content: 'Perfect for families! Our kids had a blast and we felt safe throughout the entire journey. The team went above and beyond to make our trip special.',
      tourName: 'Family Fun Package',
      avatar: '',
      isVerified: true,
      createdAt: '2024-01-03T00:00:00.000Z'
    },
    {
      _id: 'static-6',
      name: 'James Wilson',
      location: 'Sydney',
      country: 'Australia',
      rating: 4,
      title: 'Great Adventure, Amazing Scenery',
      content: 'The landscapes were breathtaking and the activities were well-chosen. Good balance between guided tours and free time. Would recommend to adventure seekers.',
      tourName: 'Ocean Adventure Tour',
      avatar: '',
      isVerified: true,
      createdAt: '2024-01-01T00:00:00.000Z'
    }
  ];

  // Sample data for destinations
  const sampleDestinations = [
    {
      id: '1',
      name: 'Paris',
      country: 'France',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tourCount: 25,
      description: 'The City of Light, famous for its art, fashion, and cuisine',
      slug: 'paris-france'
    },
    {
      id: '2',
      name: 'Tokyo',
      country: 'Japan',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop&crop=center',
      tourCount: 18,
      description: 'A vibrant metropolis blending traditional culture with modern innovation',
      slug: 'tokyo-japan'
    },
    {
      id: '3',
      name: 'Santorini',
      country: 'Greece',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop&crop=center',
      tourCount: 12,
      description: 'Breathtaking sunsets and stunning white-washed buildings',
      slug: 'santorini-greece'
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch tours
        const toursData = await apiClient.get('/api/tours?featured=true&limit=6');
        if (toursData.success) {
          setTours(toursData.data.tours);
        }

        // Fetch testimonials
        const testimonialsData = await apiClient.get('/api/testimonials?limit=6');
        if (testimonialsData.success && testimonialsData.data.testimonials.length > 0) {
          setTestimonials(testimonialsData.data.testimonials);
        } else {
          setTestimonials(staticTestimonials);
        }

        // Set sample destinations
        setDestinations(sampleDestinations);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setTours([]);
        setTestimonials([]);
        setDestinations(sampleDestinations);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const slides = [
    {
      backgroundImage: '/images/hero1.png',
      title: 'Welcome to Our Platform',
      subtitle: 'Discover amazing features that will transform your workflow',
      user: false,
      registerText: 'Get Started',
      loginText: 'Sign In',
      registerLink: '/register',
      loginLink: '/login',
      dashboardText: 'Go to Dashboard',
      dashboardLink: '/dashboard',
      titleColor:'text-text-950'
    },
    {
      backgroundImage: '/images/hero2.png',
      title: 'Advanced Solutions',
      subtitle: 'Our cutting-edge technology will help you achieve your goals',
      user: false,
      registerText: 'Start Free Trial',
      loginText: 'Login to Account',
      registerLink: '/trial',
      loginLink: '/login',
      titleColor:'text-white'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSlider
        slides={slides} 
        autoPlay={true}
        interval={6000}
        showNavigation={true}
        showIndicators={true}
      />

      {/* Stats Section */}
      <section className="py-16 md:py-32 bg-white bg-[url(/images/bg%20our%20service.png)] bg-cover bg-center">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-primary-700 font-marck bg-primary-100 rounded-full px-4 py-2 inline-block mb-3 md:mb-4">
              {t('home.stats_title')}
            </h4>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-text-500 mb-3 md:mb-4 px-4">
              {t('home.stats_subtitle')}
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
            <StatsCard
              number="01.Visa"
              label="home.stats_description_1"
              icon={<img src="/images/Ellipse 12.png" alt="Visa" className="w-12 h-12 md:w-16 md:h-16 text-primary-600" />}
              buttonText={t('home.stats_button_1')}
            />
            <StatsCard
              number="02.Flights"
              label="home.stats_description_2"
              icon={<img src="/images/Ellipse 12 (1).png" alt="Flights" className="w-12 h-12 md:w-16 md:h-16 text-primary-600" />}
              buttonText={t('home.stats_button_2')}
            />
            <StatsCard
              number="03.Umrah"
              label="home.stats_description_3"
              icon={<img src="/images/Ellipse 12 (2).png" alt="Umrah" className="w-12 h-12 md:w-16 md:h-16 text-primary-600" />}
              buttonText={t('home.stats_button_3')}
            />
            <StatsCard
              number="04.Hotel"
              label="home.stats_description_4"
              icon={<img src="/images/Ellipse 11.png" alt="Hotel" className="w-12 h-12 md:w-16 md:h-16 text-primary-600" />}
              buttonText={t('home.stats_button_4')}
            />
          </div>
        </div>
      </section>

      {/* Get to know us section */}
      <WhyChoose />
                
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
      <Start />

      {/* Popular Destinations Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-sm md:text-base lg:text-lg font-marck font-bold inline-block mb-2 md:mb-4 text-primary-700 bg-primary-100 rounded-full px-3 py-1 md:px-4 md:py-2">
              {t('home.destinations')}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              {t('home.destinationsSubtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-24 bg-[url(/images/testmonialsbg.png)] bg-cover bg-center bg-white min-h-[50vh] md:min-h-[100vh] bg-no-repeat flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-center lg:items-start gap-8 md:gap-12">
            {/* Text Content Side */}
            <div className="lg:w-1/3 text-center lg:text-left">
              <div className="lg:sticky lg:top-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                  {t('home.testimonials')}
                </h2>
                <p className="text-sm md:text-base lg:text-lg text-gray-600 mb-6 md:mb-8">
                  {t('home.testimonialsSubtitle')}
                </p>
                
                {/* Carousel Indicators */}
                <div className="flex justify-center lg:justify-start space-x-2 mb-4">
                  {Array.from({ length: Math.ceil(testimonials.length / getTestimonialsPerSlide()) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                        currentSlide === index ? 'bg-blue-600 scale-110' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                {/* Navigation Arrows */}
                <div className="flex justify-center lg:justify-start space-x-3 md:space-x-4">
                  <button
                    onClick={prevSlide}
                    className="p-1 md:p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextSlide}
                    className="p-1 md:p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    aria-label="Next testimonial"
                  >
                    <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Cards Carousel Side */}
            <div className="lg:w-2/3 w-full">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-4 md:p-6 animate-pulse">
                      <div className="flex items-center mb-3 md:mb-4">
                        <div className="w-8 h-8 md:w-12 md:h-12 bg-gray-200 rounded-full mr-2 md:mr-3"></div>
                        <div className="flex-1">
                          <div className="h-3 md:h-4 bg-gray-200 rounded mb-1 md:mb-2"></div>
                          <div className="h-2 md:h-3 bg-gray-200 rounded w-2/3"></div>
                        </div>
                      </div>
                      <div className="h-3 md:h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 md:h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 md:h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              ) : testimonials.length > 0 ? (
                <div className="relative overflow-hidden">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {Array.from({ length: Math.ceil(testimonials.length / getTestimonialsPerSlide()) }).map((_, slideIndex) => (
                      <div key={slideIndex} className="w-full flex-shrink-0 px-2">
                        <div className={`grid gap-4 md:gap-6 ${getTestimonialsPerSlide() === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                          {testimonials
                            .slice(slideIndex * getTestimonialsPerSlide(), slideIndex * getTestimonialsPerSlide() + getTestimonialsPerSlide())
                            .map((testimonial) => (
                              <TestimonialCard key={testimonial._id} testimonial={testimonial} />
                            ))
                          }
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 md:py-12">
                  <p className="text-gray-500 text-sm md:text-base">No testimonials available at the moment.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;