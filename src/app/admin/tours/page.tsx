'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Button from '@/components/ui/Button';
import apiClient from '@/lib/apiClient';
import { FiPlus, FiEdit, FiTrash2, FiEye, FiSearch, FiFilter } from 'react-icons/fi';

interface Tour {
  _id: string;
  title: string;
  price: number;
  location: string;
  country: string;
  category: string;
  difficulty: string;
  rating: number;
  reviewCount: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
}

const ToursManagement: React.FC = () => {
  const { user, token, loading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [tours, setTours] = useState<Tour[]>([]);
  const [loadingTours, setLoadingTours] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoadingTours(true);
        const data = await apiClient.get('/api/admin/tours', {
          requireAuth: true,
          token,
        });
        if (data.success) {
          setTours(data.data.tours);
        }
      } catch (error) {
        console.error('Error fetching tours:', error);
      } finally {
        setLoadingTours(false);
      }
    };

    if (user && user.role === 'admin') {
      fetchTours();
    }
  }, [user]);

  const handleDelete = async (tourId: string) => {
    if (!confirm('Are you sure you want to delete this tour?')) return;

    try {
      await apiClient.delete(`/api/admin/tours/${tourId}`, {
        requireAuth: true,
        token,
      });
      setTours(tours.filter(tour => tour._id !== tourId));
    } catch (error) {
      console.error('Error deleting tour:', error);
    }
  };

  const handleToggleStatus = async (tourId: string, currentStatus: boolean) => {
    try {
      await apiClient.patch(`/api/admin/tours/${tourId}`, { isActive: !currentStatus }, {
        requireAuth: true,
        token,
      });
      setTours(tours.map(tour => 
        tour._id === tourId ? { ...tour, isActive: !currentStatus } : tour
      ));
    } catch (error) {
      console.error('Error updating tour status:', error);
    }
  };

  const filteredTours = tours.filter(tour => {
    // Handle multilingual content
    const title = typeof tour.title === 'string' ? tour.title : (tour.title?.en || tour.title?.ar || '');
    const location = tour.city || tour.country || '';
    
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || tour.category === filterCategory;
    const matchesStatus = !filterStatus || 
                         (filterStatus === 'active' && tour.isActive) ||
                         (filterStatus === 'inactive' && !tour.isActive);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tours Management</h1>
              <p className="mt-2 text-gray-600">
                Manage your travel tours and packages
              </p>
            </div>
            <Button
              onClick={() => router.push('/admin/tours/new')}
              className="flex items-center"
            >
              <FiPlus className="w-4 h-4 mr-2" />
              Add New Tour
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search tours..."
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Categories</option>
                <option value="adventure">Adventure</option>
                <option value="cultural">Cultural</option>
                <option value="beach">Beach</option>
                <option value="mountain">Mountain</option>
                <option value="city">City</option>
                <option value="wildlife">Wildlife</option>
                <option value="luxury">Luxury</option>
                <option value="budget">Budget</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tours Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loadingTours ? (
            <div className="p-8 text-center">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tour
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTours.map((tour) => (
                    <tr key={tour._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {typeof tour.title === 'string' ? tour.title : (tour.title?.en || tour.title?.ar || 'No title')}
                          </div>
                          <div className="text-sm text-gray-500">
                            {tour.difficulty || 'N/A'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {tour.city || 'N/A'}, {tour.country || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {tour.category || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${tour.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-900">
                            {(tour.ratings?.average || 0).toFixed(1)}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">
                            ({tour.ratings?.count || 0})
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          tour.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {tour.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => router.push(`/admin/tours/${tour._id}`)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <FiEye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => router.push(`/admin/tours/${tour._id}/edit`)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <FiEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleToggleStatus(tour._id, tour.isActive)}
                            className={`${
                              tour.isActive 
                                ? 'text-red-600 hover:text-red-900' 
                                : 'text-green-600 hover:text-green-900'
                            }`}
                          >
                            {tour.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                          <button
                            onClick={() => handleDelete(tour._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {!loadingTours && filteredTours.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No tours found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToursManagement;
