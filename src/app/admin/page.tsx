'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Button from '@/components/ui/Button';
import apiClient from '@/lib/apiClient';
import { FiUsers, FiMapPin, FiMessageSquare, FiSettings, FiTrendingUp, FiPlus, FiNavigation, FiHome as FiBuilding, FiKey } from 'react-icons/fi';

const AdminDashboard: React.FC = () => {
  const { token } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTours: 0,
    totalFlights: 0,
    totalHotels: 0,
    totalVisas: 0,
    totalReviews: 0,
    totalBookings: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch statistics from APIs
        const [usersData, toursData, flightsData, hotelsData, visasData, reviewsData] = await Promise.all([
          apiClient.get('/api/admin/users/stats', { requireAuth: true, token }),
          apiClient.get('/api/admin/tours/stats', { requireAuth: true, token }),
          apiClient.get('/api/admin/flights/stats', { requireAuth: true, token }),
          apiClient.get('/api/admin/hotels/stats', { requireAuth: true, token }),
          apiClient.get('/api/admin/visas/stats', { requireAuth: true, token }),
          apiClient.get('/api/admin/reviews/stats', { requireAuth: true, token }),
        ]);

        setStats({
          totalUsers: usersData.data?.total || 0,
          totalTours: toursData.data?.total || 0,
          totalFlights: flightsData.data?.total || 0,
          totalHotels: hotelsData.data?.total || 0,
          totalVisas: visasData.data?.total || 0,
          totalReviews: reviewsData.data?.total || 0,
          totalBookings: 0, // Will be implemented later
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    if (token) {
      fetchStats();
    }
  }, [token]);

  const adminSections = [
    {
      title: 'Users',
      description: 'Manage user accounts and permissions',
      icon: <FiUsers className="w-8 h-8" />,
      href: '/admin/users',
      count: stats.totalUsers,
      color: 'bg-blue-500',
    },
    {
      title: 'Tours',
      description: 'Manage tours and travel packages',
      icon: <FiMapPin className="w-8 h-8" />,
      href: '/admin/tours',
      count: stats.totalTours,
      color: 'bg-green-500',
    },
    {
      title: 'Flights',
      description: 'Manage flight bookings and schedules',
      icon: <FiNavigation className="w-8 h-8" />,
      href: '/admin/flights',
      count: stats.totalFlights,
      color: 'bg-sky-500',
    },
    {
      title: 'Hotels',
      description: 'Manage hotel listings and rooms',
      icon: <FiBuilding className="w-8 h-8" />,
      href: '/admin/hotels',
      count: stats.totalHotels,
      color: 'bg-amber-500',
    },
    {
      title: 'Visas',
      description: 'Manage visa services and applications',
      icon: <FiKey className="w-8 h-8" />,
      href: '/admin/visas',
      count: stats.totalVisas,
      color: 'bg-indigo-500',
    },
    {
      title: 'Reviews',
      description: 'Manage customer reviews and testimonials',
      icon: <FiMessageSquare className="w-8 h-8" />,
      href: '/admin/reviews',
      count: stats.totalReviews,
      color: 'bg-purple-500',
    },
    {
      title: 'Bookings',
      description: 'Manage tour bookings and reservations',
      icon: <FiTrendingUp className="w-8 h-8" />,
      href: '/admin/bookings',
      count: stats.totalBookings,
      color: 'bg-orange-500',
    },
    {
      title: 'Settings',
      description: 'Configure site settings and preferences',
      icon: <FiSettings className="w-8 h-8" />,
      href: '/admin/settings',
      count: null,
      color: 'bg-gray-500',
    },
  ];

  return (
    <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Manage your Haya Travel platform
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiUsers className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Users
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.totalUsers}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiMapPin className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Tours
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.totalTours}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiMessageSquare className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Testimonials
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.totalTestimonials}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiTrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Bookings
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.totalBookings}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminSections.map((section) => (
            <div
              key={section.title}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${section.color} text-white`}>
                  {section.icon}
                </div>
                {section.count !== null && (
                  <span className="text-2xl font-bold text-gray-900">
                    {section.count}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {section.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {section.description}
              </p>
              <Button
                onClick={() => router.push(section.href)}
                className="w-full"
                variant="outline"
              >
                Manage {section.title}
              </Button>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={() => router.push('/admin/tours/new')}
              className="flex items-center"
            >
              <FiPlus className="w-4 h-4 mr-2" />
              Add New Tour
            </Button>
            <Button
              onClick={() => router.push('/admin/testimonials/new')}
              variant="outline"
              className="flex items-center"
            >
              <FiPlus className="w-4 h-4 mr-2" />
              Add Testimonial
            </Button>
            <Button
              onClick={() => router.push('/admin/users/new')}
              variant="outline"
              className="flex items-center"
            >
              <FiPlus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>
    </div>
  );
};

export default AdminDashboard;
