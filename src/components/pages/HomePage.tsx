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

const HomePage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { user } = useAuth();
  const [tours, setTours] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample data for destinations (in real app, this would come from API)
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
    {
      id: '4',
      name: 'Bali',
      country: 'Indonesia',
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop&crop=center',
      tourCount: 30,
      description: 'Tropical paradise with beautiful beaches and rich culture',
      slug: 'bali-indonesia'
    }
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
        if (testimonialsData.success) {
          setTestimonials(testimonialsData.data.testimonials);
        }

        // Set sample destinations
        setDestinations(sampleDestinations);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        // Set sample data on error
        setTours([]);
        setTestimonials([]);
        setDestinations(sampleDestinations);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('home.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
              {t('home.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link href="/dashboard">
                  <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                    {t('home.goToDashboard')}
                    <FiArrowRight className="ml-2" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/register">
                    <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                      {t('home.startJourney')}
                      <FiArrowRight className="ml-2" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                      {t('home.signIn')}
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatsCard
              number="10+"
              label="home.experience"
              icon={<FiAward className="w-8 h-8 text-primary-600" />}
            />
            <StatsCard
              number="50K+"
              label="home.happyTravelers"
              icon={<FiUsers className="w-8 h-8 text-primary-600" />}
            />
            <StatsCard
              number="1000+"
              label="home.toursCompleted"
              icon={<FiMapPin className="w-8 h-8 text-primary-600" />}
            />
            <StatsCard
              number="50+"
              label="home.countries"
              icon={<FiGlobe className="w-8 h-8 text-primary-600" />}
            />
          </div>
        </div>
      </section>

      {/* Popular Tours Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.popularTours')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('home.popularToursSubtitle')}
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                    <div className="h-8 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : tours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.map((tour) => (
                <TourCard key={tour._id} tour={tour} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No tours available at the moment.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/tours">
              <Button size="lg" variant="outline">
                {t('home.viewAllTours')}
                <FiArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.destinations')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('home.destinationsSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.whyChooseUs')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('home.whyChooseUsSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiZap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('home.feature1.title')}</h3>
              <p className="text-gray-600">
                {t('home.feature1.desc')}
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCreditCard className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('home.feature2.title')}</h3>
              <p className="text-gray-600">
                {t('home.feature2.desc')}
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiGlobe className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('home.feature3.title')}</h3>
              <p className="text-gray-600">
                {t('home.feature3.desc')}
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiShield className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('home.feature4.title')}</h3>
              <p className="text-gray-600">
                {t('home.feature4.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.testimonials')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('home.testimonialsSubtitle')}
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-3"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : testimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial._id} testimonial={testimonial} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No testimonials available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Newsletter />
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600 mb-8">{t('home.trustedBy')}</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {/* Add partner logos here */}
              <div className="text-2xl font-bold text-gray-400">Partner 1</div>
              <div className="text-2xl font-bold text-gray-400">Partner 2</div>
              <div className="text-2xl font-bold text-gray-400">Partner 3</div>
              <div className="text-2xl font-bold text-gray-400">Partner 4</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
